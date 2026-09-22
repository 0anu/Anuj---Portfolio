import type { MetadataRoute } from "next";
import { getAllProjects } from "@/lib/projects";
import { siteUrl } from "@/lib/site";

export const dynamic = "force-static";

const staticRoutes = [
  "",
  "/about",
  "/experience",
  "/projects",
  "/blog",
  "/tutorials",
  "/labs",
  "/contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const projectRoutes = getAllProjects().map((project) => `/projects/${project.slug}`);

  return [...staticRoutes, ...projectRoutes].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
  }));
}
