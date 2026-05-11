import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL('https://freediyplans.com'),
  title: {
    default: "Bizilla Creative | Premium DIY Woodworking Plans",
    template: "%s | Bizilla Creative"
  },
  description: "Download premium DIY woodworking plans and blueprints. Build your own furniture, outdoor projects, and more with our detailed guides.",
  alternates: {
    canonical: '/',
  },
  verification: {
    other: {
      'p:domain_verify': '6c8d3c84aaedf525f44f8032be6db0cb',
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
    name: 'Bizilla Creative',
    url: 'https://freediyplans.com',
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
