import { getAllPosts } from "@/lib/blog";

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://edukora.net";

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function formatRfc2822(iso: string): string {
  const d = new Date(iso + "T00:00:00Z");
  return d.toUTCString();
}

export function GET() {
  const posts = getAllPosts();
  const lastBuild = posts.length
    ? formatRfc2822(posts.reduce((a, p) => (p.updatedAt ?? p.publishedAt) > a ? p.updatedAt ?? p.publishedAt : a, ""))
    : formatRfc2822(new Date().toISOString().slice(0, 10));

  const items = posts
    .map((post) => {
      const url = `${BASE_URL}/blog/${post.slug}`;
      const image = post.heroImage
        ? `<enclosure url="${BASE_URL}${post.heroImage}" type="image/webp" />`
        : "";
      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escapeXml(post.description)}</description>
      <category>${escapeXml(post.category)}</category>
      <pubDate>${formatRfc2822(post.publishedAt)}</pubDate>
      ${image}    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/feed.xsl"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>Edukora - Blog et conseils</title>
    <link>${BASE_URL}/blog</link>
    <description>Conseils pour réussir le BAC et le BEPC en Côte d'Ivoire : méthodes de révision, guides d'épreuves et astuces d'apprentissage.</description>
    <language>fr-fr</language>
    <lastBuildDate>${lastBuild}</lastBuildDate>
    <atom:link href="${BASE_URL}/feed.xml" rel="self" type="application/xml" />
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
