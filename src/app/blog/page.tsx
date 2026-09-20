import Link from "next/link";
import MarketingHeader from "@/components/MarketingHeader";
import MarketingFooter from "@/components/MarketingFooter";
import NewsletterSection from "@/components/NewsletterSection";
import { getAllPosts, formatPostDate } from "@/lib/blog";
import JsonLd from "@/components/JsonLd";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Conseils, méthodes et guides pour réussir le BAC et le BEPC en Côte d'Ivoire : plans de révision, gestion du stress, annales et astuces d'élèves.",
  alternates: {
    canonical: "/blog",
    types: {
      "application/rss+xml": `${process.env.NEXT_PUBLIC_APP_URL || "https://edukora.net"}/feed.xml`,
    },
  },
  openGraph: {
    title: "Blog Edukora",
    description: "Conseils, méthodes et guides pour réussir le BAC et le BEPC en Côte d'Ivoire.",
    url: "https://edukora.net/blog",
    siteName: "Edukora",
    type: "website",
  },
};

export default function Page() {
  const posts = getAllPosts();

  return (
    <div className="bg-background text-on-background min-h-screen font-body">
      <MarketingHeader />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Blog",
          name: "Blog Edukora",
          url: "https://edukora.net/blog",
          description:
            "Conseils, méthodes et guides pour réussir le BAC et le BEPC en Côte d'Ivoire.",
          publisher: {
            "@type": "Organization",
            name: "Edukora",
            logo: { "@type": "ImageObject", url: "https://edukora.net/images/og-cover.png" },
          },
          blogPost: posts.map((p) => ({
            "@type": "BlogPosting",
            headline: p.title,
            url: `https://edukora.net/blog/${p.slug}`,
            datePublished: p.publishedAt,
            dateModified: p.updatedAt ?? p.publishedAt,
          })),
        }}
      />

      <section className="relative overflow-hidden pt-16 pb-12 px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-label-sm uppercase tracking-widest text-primary font-bold mb-3">
            Le blog Edukora
          </p>
          <h1 className="text-[40px] md:text-[56px] leading-[1.08] font-extrabold text-primary mb-6">
            Réussir son BAC et son BEPC
          </h1>
          <div className="flex items-center justify-center gap-3">
            <a
              href="/feed.xml"
              aria-label="Flux RSS du blog"
              className="inline-flex items-center gap-2 text-label-sm font-semibold text-primary bg-primary/10 hover:bg-primary/20 rounded-full px-4 py-2 transition-colors"
            >
              <span className="material-symbols-outlined text-lg">rss_feed</span>
              S'abonner au flux RSS
            </a>
          </div>
          <p className="text-body-lg text-on-surface-variant max-w-2xl mx-auto">
            Méthodes de révision, plans jour par jour, gestion du stress et
            astuces d'élèves : tout pour aborder les examens en Côte d'Ivoire
            avec confiance.
          </p>
        </div>
      </section>

      <section className="pb-24 px-4 md:px-8 pt-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group bg-surface rounded-2xl border border-outline-variant p-6 md:p-8 transition-all duration-300 hover:shadow-lg hover:border-primary/40 flex flex-col"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 bg-primary-container text-primary text-label-sm font-bold rounded-full">
                    {post.category}
                  </span>
                  <span className="text-label-sm text-on-surface-variant">
                    {formatPostDate(post.publishedAt)} · {post.readingMinutes} min
                  </span>
                </div>
                <h2 className="text-headline-md font-bold text-on-surface mb-3 group-hover:text-primary transition-colors">
                  {post.title}
                </h2>
                <p className="text-body-md text-on-surface-variant leading-relaxed flex-1">
                  {post.description}
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-primary font-bold text-body-md">
                  Lire l'article
                  <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <NewsletterSection source="blog" />

      <MarketingFooter />
    </div>
  );
}
