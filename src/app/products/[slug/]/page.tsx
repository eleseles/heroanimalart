import React from 'react';
import { products } from '@/data/products';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck, Truck, RefreshCw, Info, FileText } from 'lucide-react';
import { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);

  if (!product) return { title: 'Product Not Found' };

  return {
    title: `${product.name} | Bizilla Studio`,
    description: product.description,
    alternates: {
      canonical: `/products/${slug}`,
    },
    openGraph: {
      title: product.name,
      description: product.description,
      images: [product.image],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  // Structured Data for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.image,
    description: product.description,
    brand: {
      '@type': 'Brand',
      name: 'Bizilla',
    },
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
  };

  return (
    <div className="container product-detail-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="breadcrumbs">
        <Link href="/">COLLECTION</Link> / <span>{product.category}</span> / <span>{product.name}</span>
      </div>

      <div className="product-detail-grid">
        <div className="product-detail-image">
          <img src={product.image} alt={`${product.name} - ${product.category} by Bizilla`} />
        </div>

        <div className="product-detail-info">
          <div className="product-detail-category">{product.category}</div>
          <h1 className="product-detail-title">{product.name}</h1>
          <div className="product-detail-price">${product.price.toFixed(2)}</div>
          
          <div className="product-detail-section">
            <h2 className="section-small-title"><Info size={14} /> DESCRIPTION</h2>
            <p className="product-detail-description">
              {product.description}
            </p>
          </div>

          <div className="product-detail-actions">
            <button className="btn btn-primary w-full">
              ADD TO BAG
            </button>
          </div>

          <div className="product-detail-section">
            <h2 className="section-small-title"><FileText size={14} /> SPECIFICATIONS</h2>
            <ul className="product-specs">
              <li><span>Material</span> <span>Sustainable Composite</span></li>
              <li><span>Origin</span> <span>Designed in Berlin</span></li>
              <li><span>Weight</span> <span>450g</span></li>
              <li><span>Dimensions</span> <span>12 x 12 x 5 cm</span></li>
            </ul>
          </div>

          <div className="product-detail-meta">
            <div className="meta-item">
              <Truck size={18} strokeWidth={1} />
              <span>Complimentary shipping on orders over $200</span>
            </div>
            <div className="meta-item">
              <ShieldCheck size={18} strokeWidth={1} />
              <span>2-year extended warranty included</span>
            </div>
            <div className="meta-item">
              <RefreshCw size={18} strokeWidth={1} />
              <span>30-day effortless returns</span>
            </div>
          </div>
        </div>
      </div>

      <div className="product-story-section">
        <div className="story-content">
          <h2 className="story-title">Behind the Design</h2>
          <p>
            Every piece in the Bizilla collection is a testament to our philosophy of reduction. 
            We spent eighteen months refining the form of the {product.name}, ensuring that 
            every curve and edge serves a functional purpose while maintaining a visual 
            silence that complements any environment.
          </p>
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}
