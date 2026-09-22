import nextConfig from "eslint-config-next";

const eslintConfig = [
  ...nextConfig,
  {
    ignores: [".next/**", "dist/**", "node_modules/**"],
  },
];

export default eslintConfig;
