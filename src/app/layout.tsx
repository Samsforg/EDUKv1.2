import type { Metadata, Viewport } from "next";
import "./globals.css";
import RegisterSW from "@/components/RegisterSW";
import Plausible from "@/components/Plausible";

export const metadata: Metadata = {
  title: "Edukora - Réussir son BAC & BEPC",
  description:
    "L'allié n°1 pour réussir le BAC et le BEPC en Côte d'Ivoire. Fiches certifiées, tuteur IA et simulateur d'examen.",
  manifest: "/manifest.webmanifest",
  icons: [{ rel: "apple-touch-icon", url: "/icons/launcher-192.png" }],
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Edukora",
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
    <html lang="fr" className="light">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('edukora-theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.remove('light');document.documentElement.classList.add('dark');}}catch(e){}})();`,
          }}
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;600;700;800&family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-background text-on-background">
        {children}
        <RegisterSW />
        <Plausible />
      </body>
    </html>
  );
}
