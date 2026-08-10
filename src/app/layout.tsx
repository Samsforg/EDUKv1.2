import type { Metadata, Viewport } from "next";
import { Hanken_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import RegisterSW from "@/components/RegisterSW";
import MaterialSymbols from "@/components/MaterialSymbols";
import VercelAnalytics from "@/components/VercelAnalytics";
import ConsentBanner from "@/components/ConsentBanner";

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-hanken",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://edukora.net"),
  title: {
    default: "Edukora - Réussir son BAC & BEPC",
    template: "%s | Edukora",
  },
  description:
    "L'allié n°1 pour réussir le BAC et le BEPC en Côte d'Ivoire. Fiches certifiées, tuteur IA et simulateur d'examen.",
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
      "L'allié n°1 pour réussir le BAC et le BEPC en Côte d'Ivoire. Fiches certifiées, tuteur IA et simulateur d'examen.",
    images: [
      {
        url: "/images/og-cover.png",
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
      "L'allié n°1 pour réussir le BAC et le BEPC en Côte d'Ivoire. Fiches certifiées, tuteur IA et simulateur d'examen.",
    images: ["/images/og-cover.png"],
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`light ${hanken.variable} ${inter.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('edukora-theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.remove('light');document.documentElement.classList.add('dark');}}catch(e){}})();`,
          }}
        />
        {process.env.GSC_VERIFICATION ? (
          <meta
            name="google-site-verification"
            content={process.env.GSC_VERIFICATION}
          />
        ) : null}
      </head>
      <body className="bg-background text-on-background">
        {children}
        <MaterialSymbols />
        <RegisterSW />
        <VercelAnalytics />
        <ConsentBanner />
      </body>
    </html>
  );
}
