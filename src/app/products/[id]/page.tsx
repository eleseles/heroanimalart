import React from 'react';
import { products, Product } from '@/data/products';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ShieldCheck, Truck, RefreshCw, Info, FileText, Tag as TagIcon, ArrowRight } from 'lucide-react';
import { Metadata } from 'next';
import ProductGallery from '@/components/ProductGallery';
import ProductCard from '@/components/ProductCard';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = products.find((p: Product) => p.id === id);

  if (!product) return { title: 'Product Not Found' };

  return {
    title: `${product.name} | Bizilla Studio`,
    description: product.description,
    alternates: {
      canonical: `/products/${id}`,
    },
    openGraph: {
      title: product.name,
      description: product.description,
      images: product.images,
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const product = products.find((p: Product) => p.id === id);

  if (!product) {
    notFound();
  }

  // Get related products (same category, excluding current)
  const relatedProducts = products
    .filter((p: Product) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);
  
  // If not enough related products, fill with others
  if (relatedProducts.length < 4) {
    const others = products
      .filter((p: Product) => p.id !== product.id && !relatedProducts.find(rp => rp.id === p.id))
      .slice(0, 4 - relatedProducts.length);
    relatedProducts.push(...others);
  }

  // Structured Data for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.images,
    description: product.description,
    brand: {
      '@type': 'Brand',
      name: 'Bizilla',
    },
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: product.currency,
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
        <ProductGallery images={product.images} name={product.name} />

        <div className="product-detail-info">
          <div className="product-detail-category">{product.category}</div>
          <h1 className="product-detail-title">{product.name}</h1>
          <div className="product-detail-price">{product.currency === 'USD' ? '$' : product.currency}{product.price.toFixed(2)}</div>
          
          <div className="product-detail-section">
            <h2 className="section-small-title"><Info size={14} /> DESCRIPTION</h2>
            <p className="product-detail-description">
              {product.description}
            </p>
          </div>

          {product.tags && product.tags.length > 0 && (
            <div className="product-detail-section">
              <h2 className="section-small-title"><TagIcon size={14} /> TAGS</h2>
              <div className="product-tags">
                {product.tags.map((tag, idx) => (
                  <span key={idx} className="tag-badge">{tag}</span>
                ))}
              </div>
            </div>
          )}

          <div className="product-detail-actions">
            <button className="btn btn-primary w-full">
              ADD TO BAG
            </button>
          </div>

          <div className="product-detail-section">
            <h2 className="section-small-title"><FileText size={14} /> SPECIFICATIONS</h2>
            <ul className="product-specs">
              <li><span>Material</span> <span>Sustainable Wood / Digital PDF</span></li>
              <li><span>Format</span> <span>Instant Download</span></li>
              <li><span>Support</span> <span>24/7 Builder Support</span></li>
            </ul>
          </div>

          <div className="product-detail-meta">
            <div className="meta-item">
              <Truck size={18} strokeWidth={1} />
              <span>Instant Digital Delivery</span>
            </div>
            <div className="meta-item">
              <ShieldCheck size={18} strokeWidth={1} />
              <span>Verified DIY Plans</span>
            </div>
            <div className="meta-item">
              <RefreshCw size={18} strokeWidth={1} />
              <span>Happiness Guarantee</span>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      <section className="related-products-section">
        <div className="section-header">
          <h2 className="section-title">You Might Also Like</h2>
          <Link href="/products" className="section-link">View All <ArrowRight size={16} /></Link>
        </div>
        <div className="products-grid">
          {relatedProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}

export async function generateStaticParams() {
  return products.map((product: Product) => ({
    id: product.id,
  }));
}
