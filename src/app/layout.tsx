import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL('https://heroanimalart.com'),
  title: {
    default: "HeroAnimalArt | Premium Digital Art Prints & Posters",
    template: "%s | HeroAnimalArt"
  },
  description: "Download high-quality digital poster designs and art prints instantly. Elevate your home decor with our unique, print-ready digital artwork in multiple sizes.",
  alternates: {
    canonical: '/',
  },
  verification: {
    other: {
      'p:domain_verify': '03477f5f861ec3ac9f934bd8d4dca27f',
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
    description: 'Premium digital art prints and posters. Instantly download high-quality digital artwork for your home decor. Shop unique designs.',
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
