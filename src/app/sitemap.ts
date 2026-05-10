import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.robotronix.in";

const staticRoutes = [
  "",
  "/about",
  "/careers",
  "/case-studies",
  "/contact",
  "/demo",
  "/news",
  "/patents",
  "/platform",
  "/privacy",
  "/solutions/confined-spaces",
  "/solutions/hazmat",
  "/solutions/heat-exchanger",
  "/solutions/height-inspection",
  "/solutions/ndt-inspection",
  "/terms",
];

const dynamicRoutes = [
  "/case-studies/refinery-tank-inspection",
  "/case-studies/power-plant-boiler",
  "/case-studies/chemical-reactor-assessment",
  "/case-studies/bridge-structural-inspection",
  "/industries/oil-gas",
  "/industries/power",
  "/industries/petrochemical",
  "/industries/infrastructure",
  "/industries/defence",
  "/industries/manufacturing",
  "/news/third-patent",
  "/news/refinery-case-study",
  "/news/future-of-ndt",
  "/news/payg-launch",
  "/news/power-sector-expansion",
  "/news/second-patent",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [...staticRoutes, ...dynamicRoutes].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
