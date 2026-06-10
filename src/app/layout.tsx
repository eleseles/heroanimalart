import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL('https://heroanimalart.com'),
  title: {
    default: "HeroAnimalArt | Premium DIY Woodworking Plans",
    template: "%s | HeroAnimalArt"
  },
  description: "Download premium DIY woodworking plans and blueprints. Build your own furniture, outdoor projects, and more with our detailed guides.",
  alternates: {
    canonical: '/',
  },
  verification: {
    other: {
      'p:domain_verify': 'e392326cbbe308428d300aed5349f90e',
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'HeroAnimalArt',
    url: 'https://heroanimalart.com',
    description: 'Premium DIY woodworking plans. Build your dream projects at home. Shop our plans directly on Etsy.',
  };

  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Navbar />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
