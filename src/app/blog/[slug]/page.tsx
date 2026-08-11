import Link from "next/link";
import { notFound } from "next/navigation";
import MarketingHeader from "@/components/MarketingHeader";
import MarketingFooter from "@/components/MarketingFooter";
import { getAllPosts, getPostBySlug, formatPostDate, type BlogBlock } from "@/lib/blog";
import type { Metadata } from "next";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Article introuvable" };
  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: `${post.title} | Edukora`,
      description: post.description,
      url: `https://edukora.net/blog/${post.slug}`,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
    },
  };
}

export const dynamicParams = false;

function renderBlock(block: BlogBlock, index: number) {
  switch (block.type) {
    case "h2":
      return (
        <h2 key={index} className="text-headline-md font-bold text-on-surface mt-10 mb-4">
          {block.text}
        </h2>
      );
    case "p":
      return (
        <p key={index} className="text-body-lg text-on-surface-variant leading-relaxed mb-5">
          {block.text}
        </p>
      );
    case "ul":
      return (
        <ul key={index} className="mb-5 space-y-2">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-3 text-body-md text-on-surface-variant leading-relaxed">
              <span className="material-symbols-outlined text-primary text-lg mt-0.5 shrink-0">check_circle</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol key={index} className="mb-5 space-y-2 list-decimal pl-6">
          {block.items.map((item, i) => (
            <li key={i} className="text-body-md text-on-surface-variant leading-relaxed">
              {item}
            </li>
          ))}
        </ol>
      );
    case "callout":
      return (
        <div key={index} className="bg-primary-container/40 border border-primary/30 rounded-2xl p-5 mb-6 flex gap-3">
          <span className="material-symbols-outlined text-primary mt-0.5 shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>
            lightbulb
          </span>
          <p className="text-body-md text-on-primary-container leading-relaxed font-medium">{block.text}</p>
        </div>
      );
  }
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    inLanguage: "fr-CI",
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    keywords: post.keywords.join(", "),
    author: {
      "@type": "Organization",
      name: "Edukora",
      url: "https://edukora.net",
    },
    publisher: {
      "@type": "Organization",
      name: "Edukora",
      url: "https://edukora.net",
      logo: { "@type": "ImageObject", url: "https://edukora.net/favicon.png" },
    },
    mainEntityOfPage: `https://edukora.net/blog/${post.slug}`,
  };

  const related = getAllPosts()
    .filter((p) => p.slug !== post.slug)
    .sort((a, b) => (a.category === post.category ? -1 : 1) - (b.category === post.category ? -1 : 1))
    .slice(0, 3);

  return (
    <div className="bg-background text-on-background min-h-screen font-body">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <MarketingHeader />

      <article className="max-w-3xl mx-auto px-4 md:px-8 pt-12 pb-20">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-primary font-semibold text-body-md mb-8 hover:underline"
        >
          <span className="material-symbols-outlined text-lg">arrow_back</span>
          Tous les articles
        </Link>

        <div className="flex items-center gap-3 mb-5">
          <span className="px-3 py-1 bg-primary-container text-primary text-label-sm font-bold rounded-full">
            {post.category}
          </span>
          <span className="text-label-sm text-on-surface-variant">
            {formatPostDate(post.publishedAt)} · {post.readingMinutes} min de lecture
          </span>
        </div>

        <h1 className="text-[32px] md:text-[44px] leading-[1.12] font-extrabold text-primary tracking-tight mb-6">
          {post.title}
        </h1>

        <p className="text-body-lg text-on-surface-variant leading-relaxed mb-10 border-l-4 border-primary pl-4">
          {post.description}
        </p>

        <div className="prose-content">{post.blocks.map(renderBlock)}</div>

        <div className="mt-12 bg-primary rounded-3xl p-8 md:p-10 text-center text-white">
          <h2 className="text-headline-md font-bold mb-3">Prêt à réussir ton examen ?</h2>
          <p className="text-body-md mb-6 opacity-90">
            Entraîne-toi avec les fiches certifiées, le simulateur d'examen et le tuteur IA Kora.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/simulateur-d-examen-bac-bepc"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 font-bold text-primary"
            >
              Essayer le simulateur
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </Link>
            <Link
              href="/tarifs"
              className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-bold text-white border border-white/50 hover:bg-white/10"
            >
              Voir les offres
            </Link>
          </div>
        </div>

        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="text-headline-md font-bold text-on-surface mb-6">À lire aussi</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/blog/${r.slug}`}
                  className="group bg-surface rounded-2xl border border-outline-variant p-5 flex flex-col transition-all duration-300 hover:shadow-lg hover:border-primary/40"
                >
                  <span className="px-3 py-1 self-start bg-primary-container text-primary text-label-sm font-bold rounded-full mb-3">
                    {r.category}
                  </span>
                  <h3 className="text-body-md font-bold text-on-surface mb-2 leading-snug group-hover:text-primary transition-colors">
                    {r.title}
                  </h3>
                  <p className="text-body-sm text-on-surface-variant leading-relaxed flex-1 line-clamp-3">
                    {r.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 text-primary font-bold text-body-sm">
                    Lire
                    <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">
                      arrow_forward
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>

      <MarketingFooter />
    </div>
  );
}
