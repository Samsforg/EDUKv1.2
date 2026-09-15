import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import "./globals.css";
import CsrfInit from "@/components/CsrfInit";
import RegisterSW from "@/components/RegisterSW";
import VercelAnalytics from "@/components/VercelAnalytics";
import EdukoraAnalytics from "@/components/EdukoraAnalytics";
import ConsentBanner from "@/components/ConsentBanner";
import AdSenseLoader from "@/components/AdSenseLoader";
import { OrganizationJsonLd, WebSiteJsonLd } from "@/components/JsonLd";
import { Hanken_Grotesk, Inter } from "next/font/google";

const hankenGrotesk = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "sans-serif"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://edukora.net"),
  title: {
    default: "Edukora - Réussir son BAC & BEPC",
    template: "%s | Edukora",
  },
  description:
    "Fiches de révision, tuteur IA et simulateur d'examen pour réussir le BAC et le BEPC en Côte d'Ivoire.",
  manifest: "/manifest.webmanifest",
  icons: [
    { rel: "icon", url: "/favicon.png", type: "image/png" },
    { rel: "apple-touch-icon", url: "/icons/apple-touch-icon.png" },
  ],
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Edukora",
  },
  openGraph: {
    type: "website",
    locale: "fr_CI",
    url: "https://edukora.net",
    siteName: "Edukora",
    title: "Edukora - Réussir son BAC & BEPC",
    description:
      "Fiches de révision, tuteur IA et simulateur d'examen pour réussir le BAC et le BEPC en Côte d'Ivoire.",
    images: [
      {
        url: "https://edukora.net/images/og-cover.png",
        width: 1200,
        height: 630,
        alt: "Edukora - Réussir son BAC et BEPC en Côte d'Ivoire",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Edukora - Réussir son BAC & BEPC",
    description:
      "Fiches de révision, tuteur IA et simulateur d'examen pour réussir le BAC et le BEPC en Côte d'Ivoire.",
    images: ["https://edukora.net/images/og-cover.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0047ab",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const h = await headers();
  const nonce = h.get("x-nonce") ?? undefined;

  return (
    <html lang="fr" className={`${hankenGrotesk.variable} ${inter.variable} light`}>
      <head>
        <link rel="preload" as="font" type="font/woff2" href="/fonts/MaterialSymbols-subset.woff2" crossOrigin="anonymous" />
        <script nonce={nonce} src="/theme-init.js" />
        {process.env.GSC_VERIFICATION ? (
          <meta
            name="google-site-verification"
            content={process.env.GSC_VERIFICATION}
          />
        ) : null}
      </head>
      <body className="bg-background text-on-background">
        <CsrfInit />
        <OrganizationJsonLd />
        <WebSiteJsonLd />
        {children}
        <RegisterSW />
        <VercelAnalytics />
        <EdukoraAnalytics />
        <ConsentBanner />
        <AdSenseLoader />
      </body>
    </html>
  );
}