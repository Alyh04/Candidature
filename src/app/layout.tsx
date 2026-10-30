import type { Metadata, Viewport } from "next";
import { DM_Mono, Inter } from "next/font/google";

import { BackToTop } from "@/components/layout/BackToTop";
import { Cursor } from "@/components/layout/Cursor";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { IntroOverlay } from "@/components/providers/IntroOverlay";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { SIGNATURE, SITE } from "@/content/site";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-dm-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SIGNATURE.name} — Freelance Community Manager`,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: SIGNATURE.name }],
  creator: SIGNATURE.name,
  keywords: [
    "community manager",
    "freelance",
    "bilingue français anglais",
    "stratégie digitale",
    "création de contenu",
    "Skult",
  ],
  openGraph: {
    type: "website",
    locale: SITE.locale,
    url: SITE.url,
    siteName: SITE.name,
    title: `${SIGNATURE.name} — Freelance Community Manager`,
    description: SITE.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SIGNATURE.name} — Freelance Community Manager`,
    description: SITE.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#f2f1ed",
  colorScheme: "light",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${inter.variable} ${dmMono.variable}`}>
      <body>
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>

        <SmoothScrollProvider>
          <a className="skip-link" href="#home">
            Aller au contenu principal
          </a>

          <IntroOverlay />
          <ScrollProgress />
          <Cursor />
          <Header />

          <main>{children}</main>

          <Footer />
          <BackToTop />

          <div className="grain" aria-hidden="true" />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
