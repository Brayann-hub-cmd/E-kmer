import { writeFileSync } from "fs";

const baseUrl = "https://e-kmer-pink.vercel.app";

const routes = [
  "/",
  "/produits",
  "/vendre",
  "/panier",
  "/paiement",
  "/a-propos",
  "/comment-ca-marche",
  "/securite",
  "/aide",
  "/conditions",
  "/confidentialite",
  "/auth/login",
  "/auth/register",
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (route) => `
  <url>
    <loc>${baseUrl}${route}</loc>
    <changefreq>weekly</changefreq>
    <priority>${route === "/" ? "1.0" : "0.8"}</priority>
  </url>`
  )
  .join("")}
</urlset>`;

writeFileSync("./public/sitemap.xml", sitemap);

console.log("sitemap.xml généré avec succès !");