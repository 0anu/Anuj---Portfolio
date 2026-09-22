#!/usr/bin/env node
/**
 * Verifies WCAG contrast numerically from the *compiled* CSS (web/.next),
 * resolving var() chains rather than re-testing the authored OKLCH literals.
 * Run after `next build` (or `npm run verify`, which builds first).
 */

import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const staticDir = join(__dirname, "..", "web", ".next", "static");

if (!existsSync(staticDir)) {
  console.error(
    `No compiled output found at ${staticDir}.\nRun "npm run build" in web/ first — contrast is checked against build output, not source.`,
  );
  process.exit(1);
}

// Turbopack emits CSS under static/chunks/*.css with a hashed filename
// (webpack used static/css/*.css) — walk the tree rather than assume either.
function findCssFiles(dir) {
  const found = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) found.push(...findCssFiles(full));
    else if (entry.endsWith(".css")) found.push(full);
  }
  return found;
}

const cssFiles = findCssFiles(staticDir);
if (cssFiles.length === 0) {
  console.error(`No .css files found under ${staticDir}. Run "npm run build" in web/ first.`);
  process.exit(1);
}

const css = cssFiles.map((f) => readFileSync(f, "utf8")).join("\n");

// ---- extract custom-property declarations from a given selector's blocks --
function extractDeclarations(selectorRegex) {
  const declarations = {};
  const blockRe = new RegExp(`${selectorRegex}\\{([^}]*)\\}`, "g");
  let match;
  while ((match = blockRe.exec(css))) {
    const body = match[1];
    const declRe = /(--[a-zA-Z0-9-]+)\s*:\s*([^;]+);?/g;
    let decl;
    while ((decl = declRe.exec(body))) {
      declarations[decl[1]] = decl[2].trim();
    }
  }
  return declarations;
}

const rootVars = extractDeclarations(":root");
const panelVars = { ...rootVars, ...extractDeclarations("\\.panel-inverse") };

if (Object.keys(rootVars).length === 0) {
  console.error("Found compiled CSS but no :root custom properties in it. Selector may have changed.");
  process.exit(1);
}

// ---------------------------- var() chain resolution -----------------------
function resolve(map, raw, depth = 0) {
  if (depth > 12) throw new Error(`var() cycle resolving "${raw}"`);
  const trimmed = raw.trim();
  const varMatch = trimmed.match(/^var\(\s*(--[a-zA-Z0-9-]+)\s*(?:,\s*(.*))?\)$/);
  if (!varMatch) return trimmed;
  const [, name, fallback] = varMatch;
  if (name in map) return resolve(map, map[name], depth + 1);
  if (fallback !== undefined) return resolve(map, fallback, depth + 1);
  throw new Error(`Unresolved custom property ${name}`);
}

// --------------------- color parsing -> linear sRGB {r,g,b} -----------------
// lightningcss (Tailwind v4 / Next's CSS pipeline) downlevels our authored
// oklch() to lab() in the compiled output for broader browser support, so
// both need to resolve to the same linear-light sRGB representation the
// browser will actually paint.

function oklchToLinearSrgb(L, C, H) {
  const hRad = (H * Math.PI) / 180;
  const a = C * Math.cos(hRad);
  const b = C * Math.sin(hRad);

  const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a - 1.291485548 * b;

  const l = l_ ** 3;
  const m = m_ ** 3;
  const s = s_ ** 3;

  return {
    r: 4.0767416621 * l - 3.3077115913 * m + 0.230969929 * s,
    g: -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    b: -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  };
}

// CIE Lab (D50, as emitted by lightningcss per CSS Color 4) -> linear sRGB.
// Matrix combines Bradford D50->D65 adaptation with XYZ->linear-sRGB, as
// published in the CSS Color 4 spec's sample conversion code.
function labToLinearSrgb(L, a, b) {
  const kappa = 24389 / 27;
  const epsilon = 216 / 24389;

  const f1 = (L + 16) / 116;
  const f0 = a / 500 + f1;
  const f2 = f1 - b / 200;

  const x = f0 ** 3 > epsilon ? f0 ** 3 : (116 * f0 - 16) / kappa;
  const y = L > kappa * epsilon ? ((L + 16) / 116) ** 3 : L / kappa;
  const z = f2 ** 3 > epsilon ? f2 ** 3 : (116 * f2 - 16) / kappa;

  const D50 = [0.3457 / 0.3585, 1.0, (1.0 - 0.3457 - 0.3585) / 0.3585];
  const [X, Y, Z] = [x * D50[0], y * D50[1], z * D50[2]];

  const M = [
    [3.1341359569958707, -1.6172691247681177, -0.4906619460366207],
    [-0.9787684958565162, 1.9161415212379085, 0.0334540122448232],
    [0.0719453439540644, -0.2289914070529935, 1.4052427378608006],
  ];

  return {
    r: M[0][0] * X + M[0][1] * Y + M[0][2] * Z,
    g: M[1][0] * X + M[1][1] * Y + M[1][2] * Z,
    b: M[2][0] * X + M[2][1] * Y + M[2][2] * Z,
  };
}

function parseColor(value) {
  const oklchMatch = value.match(/oklch\(\s*([\d.]+)%\s+([\d.]+)\s+([\d.]+)/);
  if (oklchMatch) {
    return oklchToLinearSrgb(
      Number(oklchMatch[1]) / 100,
      Number(oklchMatch[2]),
      Number(oklchMatch[3]),
    );
  }

  const labMatch = value.match(/lab\(\s*([\d.+-]+)%?\s+([\d.+-]+)\s+([\d.+-]+)/);
  if (labMatch) {
    return labToLinearSrgb(Number(labMatch[1]), Number(labMatch[2]), Number(labMatch[3]));
  }

  throw new Error(`Unsupported color function: "${value}"`);
}

function srgbGamma(c) {
  const clamped = Math.min(1, Math.max(0, c));
  return clamped <= 0.0031308 ? clamped * 12.92 : 1.055 * clamped ** (1 / 2.4) - 0.055;
}

function relativeLuminance({ r, g, b }) {
  return 0.2126 * Math.max(0, r) + 0.7152 * Math.max(0, g) + 0.0722 * Math.max(0, b);
}

function toHex({ r, g, b }) {
  const toByte = (c) => Math.round(srgbGamma(c) * 255);
  return `#${[r, g, b].map((c) => toByte(c).toString(16).padStart(2, "0")).join("")}`;
}

function contrastRatio(colorA, colorB) {
  const L1 = relativeLuminance(colorA);
  const L2 = relativeLuminance(colorB);
  const [lighter, darker] = L1 > L2 ? [L1, L2] : [L2, L1];
  return (lighter + 0.05) / (darker + 0.05);
}

function resolveColor(map, tokenName) {
  const raw = map[tokenName];
  if (raw === undefined) throw new Error(`Token --${tokenName} not found`);
  return parseColor(resolve(map, raw));
}

// --------------------------------- checks -----------------------------------
const AA_TEXT = 4.5;
const AA_LARGE = 3.0;

const checks = [
  { context: "root", fg: "--fg", bg: "--bg-deep", label: "body text on bg-deep", min: AA_TEXT },
  { context: "root", fg: "--fg-strong", bg: "--bg-deep", label: "strong text on bg-deep", min: AA_TEXT },
  { context: "root", fg: "--fg", bg: "--surface", label: "body text on surface (cards)", min: AA_TEXT },
  { context: "root", fg: "--fg-strong", bg: "--surface", label: "strong text on surface", min: AA_TEXT },
  { context: "root", fg: "--fg-muted", bg: "--bg", label: "muted text on bg", min: AA_TEXT },
  { context: "root", fg: "--fg-muted", bg: "--surface", label: "muted text on surface", min: AA_TEXT },
  { context: "root", fg: "--fg-subtle", bg: "--bg-subtle", label: "subtle text/labels on bg-subtle", min: AA_LARGE },
  { context: "root", fg: "--accent-text", bg: "--bg-deep", label: "accent text on bg-deep", min: AA_TEXT },
  { context: "root", fg: "--accent-contrast", bg: "--accent", label: "button text on accent", min: AA_TEXT },
  { context: "root", fg: "--success", bg: "--bg-subtle", label: "success text on bg-subtle", min: AA_LARGE },
  { context: "root", fg: "--warning", bg: "--bg-subtle", label: "warning text on bg-subtle", min: AA_LARGE },
  { context: "root", fg: "--error", bg: "--bg-subtle", label: "error text on bg-subtle", min: AA_LARGE },

  { context: "panel-inverse", fg: "--fg", bg: "--bg", label: "[panel-inverse] body text on bg", min: AA_TEXT },
  { context: "panel-inverse", fg: "--fg-strong", bg: "--bg", label: "[panel-inverse] strong text on bg", min: AA_TEXT },
  { context: "panel-inverse", fg: "--fg-muted", bg: "--bg", label: "[panel-inverse] muted text on bg", min: AA_TEXT },
  { context: "panel-inverse", fg: "--accent-text", bg: "--bg", label: "[panel-inverse] accent text on bg", min: AA_TEXT },
  { context: "panel-inverse", fg: "--accent-contrast", bg: "--accent", label: "[panel-inverse] button text on accent", min: AA_TEXT },
  { context: "panel-inverse", fg: "--success", bg: "--bg", label: "[panel-inverse] success text on bg", min: AA_LARGE },
  { context: "panel-inverse", fg: "--warning", bg: "--bg", label: "[panel-inverse] warning text on bg", min: AA_LARGE },
  { context: "panel-inverse", fg: "--error", bg: "--bg", label: "[panel-inverse] error text on bg", min: AA_LARGE },
];

let failed = false;
const rows = [];

for (const check of checks) {
  const map = check.context === "root" ? rootVars : panelVars;
  try {
    const fgColor = resolveColor(map, check.fg);
    const bgColor = resolveColor(map, check.bg);
    const ratio = contrastRatio(fgColor, bgColor);
    const pass = ratio >= check.min;
    if (!pass) failed = true;
    rows.push({
      label: check.label,
      ratio: ratio.toFixed(2),
      min: check.min,
      pass,
      fgHex: toHex(fgColor),
      bgHex: toHex(bgColor),
    });
  } catch (err) {
    failed = true;
    rows.push({ label: check.label, error: err.message });
  }
}

const nameWidth = Math.max(...rows.map((r) => r.label.length));
for (const row of rows) {
  if (row.error) {
    console.log(`✗ ${row.label.padEnd(nameWidth)}  ERROR: ${row.error}`);
    continue;
  }
  const mark = row.pass ? "✓" : "✗";
  console.log(
    `${mark} ${row.label.padEnd(nameWidth)}  ${row.ratio}:1  (need ${row.min}:1)  ${row.fgHex} on ${row.bgHex}`,
  );
}

if (failed) {
  console.error("\nContrast check failed.");
  process.exit(1);
} else {
  console.log(`\nAll ${rows.length} contrast pairs pass.`);
}
