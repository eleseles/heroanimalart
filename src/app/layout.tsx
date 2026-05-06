import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL('https://freediyplans.com'),
  title: {
    default: "Bizilla | Premium Minimal Objects",
    template: "%s | Bizilla"
  },
  description: "Discover the future with Bizilla's premium selection of tech gadgets, wearables, and minimal objects.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Bizilla',
    url: 'https://freediyplans.com',
    description: 'Premium selection of tech gadgets and minimal objects.',
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
