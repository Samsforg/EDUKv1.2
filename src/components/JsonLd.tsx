interface JsonLdProps {
  data: Record<string, unknown>;
}

export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function OrganizationJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Edukora",
        url: "https://edukora.net",
        logo: "https://edukora.net/images/og-cover.png",
        description: "Plateforme éducative pour réussir le BAC et le BEPC en Côte d'Ivoire. Fiches, tuteur IA et simulateur d'examen.",
        sameAs: [],
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer service",
          availableLanguage: "French",
        },
      }}
    />
  );
}

export function WebSiteJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "Edukora",
        url: "https://edukora.net",
        potentialAction: {
          "@type": "SearchAction",
          target: "https://edukora.net/fiches?q={search_term_string}",
          "query-input": "required name=search_term_string",
        },
      }}
    />
  );
}

export function CourseJsonLd({
  name,
  description,
  subject,
  url,
}: {
  name: string;
  description: string;
  subject: string;
  url: string;
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Course",
        name,
        description,
        provider: {
          "@type": "Organization",
          name: "Edukora",
          url: "https://edukora.net",
        },
        about: {
          "@type": "Thing",
          name: subject,
        },
        url,
      }}
    />
  );
}

export function FAQJsonLd({ items }: { items: Array<{ question: string; answer: string }> }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: items.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      }}
    />
  );
}

export function BreadcrumbJsonLd({ items }: { items: Array<{ name: string; url: string }> }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: item.name,
          item: item.url,
        })),
      }}
    />
  );
}

export function ProductJsonLd({
  name,
  description,
  price,
  currency,
  url,
}: {
  name: string;
  description: string;
  price: number;
  currency: string;
  url: string;
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Product",
        name,
        description,
        url,
        offers: {
          "@type": "Offer",
          priceCurrency: currency,
          price: price === 0 ? "0" : (price / 100).toString(),
          availability: "https://schema.org/InStock",
          url,
        },
        brand: {
          "@type": "Organization",
          name: "Edukora",
        },
      }}
    />
  );
}

export function ArticleJsonLd({
  title,
  description,
  url,
  datePublished,
  dateModified,
  image,
}: {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Article",
        headline: title,
        description,
        url,
        datePublished,
        dateModified: dateModified ?? datePublished,
        image: image ?? "https://edukora.net/images/og-cover.png",
        author: {
          "@type": "Organization",
          name: "Edukora",
          url: "https://edukora.net",
        },
        publisher: {
          "@type": "Organization",
          name: "Edukora",
          logo: {
            "@type": "ImageObject",
            url: "https://edukora.net/images/og-cover.png",
          },
        },
      }}
    />
  );
}

export function SoftwareApplicationJsonLd({
  name,
  description,
  url,
  applicationCategory,
  operatingSystem,
}: {
  name: string;
  description: string;
  url: string;
  applicationCategory: string;
  operatingSystem: string;
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name,
        description,
        url,
        applicationCategory,
        operatingSystem,
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "XOF",
        },
        author: {
          "@type": "Organization",
          name: "Edukora",
          url: "https://edukora.net",
        },
      }}
    />
  );
}
