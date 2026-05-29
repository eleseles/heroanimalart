import React from 'react';
import { products, Product } from '@/data/products';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ShieldCheck, Truck, RefreshCw, Info, FileText, Tag as TagIcon, ArrowRight, Star, Calendar, Clock } from 'lucide-react';
import { Metadata } from 'next';
import ProductGallery from '@/components/ProductGallery';
import ProductCard from '@/components/ProductCard';
import ProductActions from '@/components/ProductActions';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = products.find((p: Product) => p.id === id);

  if (!product) return { title: 'Product Not Found' };

  return {
    title: `${product.name} | Great Wooden`,
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

  // Get related products
  const relatedProducts = products
    .filter((p: Product) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);
  
  if (relatedProducts.length < 4) {
    const others = products
      .filter((p: Product) => p.id !== product.id && !relatedProducts.find(rp => rp.id === p.id))
      .slice(0, 4 - relatedProducts.length);
    relatedProducts.push(...others);
  }

  // Mock Reviews
  const reviews = [
    {
      id: 1,
      author: "Julian M.",
      date: "October 12, 2025",
      rating: 5,
      comment: "The precision in these plans is unmatched. I've built several mobile carts, but this one is by far the most structurally sound and easy to follow."
    },
    {
      id: 2,
      author: "Sarah L.",
      date: "September 28, 2025",
      rating: 5,
      comment: "Perfect for my weekend DIY project. The material list saved me so much time at the hardware store. Highly recommend!"
    }
  ];

  // Structured Data for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.images,
    description: product.description,
    brand: {
      '@type': 'Brand',
      name: 'Great Wooden',
    },
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: product.currency,
      availability: 'https://schema.org/InStock',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '24'
    },
    datePublished: product.publishedAt,
    dateModified: product.modifiedAt
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
          <div className="product-detail-price" style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', flexWrap: 'wrap' }}>
            <span className="font-semibold text-gray-900">
              {product.currency === 'USD' ? '$' : product.currency}{product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <>
                <span className="text-base text-gray-400 line-through font-light">
                  {product.currency === 'USD' ? '$' : product.currency}{product.originalPrice.toFixed(2)}
                </span>
                <span className="inline-flex items-center bg-rose-50 text-rose-700 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-rose-100" style={{ transform: 'translateY(-2px)' }}>
                  Save 20% Today
                </span>
              </>
            )}
          </div>
          
          <ProductActions product={product} />

          <div className="product-detail-section">
            <h2 className="section-small-title"><FileText size={14} /> SPECIFICATIONS</h2>
            <ul className="product-specs">
              <li><span>Material</span> <span>Sustainable Wood / Digital PDF</span></li>
              <li><span>Format</span> <span>Instant Download</span></li>
              <li><span>Support</span> <span>24/7 Builder Support</span></li>
            </ul>
          </div>

          <div className="product-detail-meta" style={{ marginTop: '2.5rem' }}>
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

      {/* Full-width Product Description Section below the grid */}
      <section className="product-story-section" style={{ marginTop: '5rem', paddingTop: '4rem', borderTop: '1px solid var(--border-color)' }}>
        <div className="story-content" style={{ maxWidth: '900px' }}>
          <h2 className="story-title" style={{ fontSize: '1.75rem', fontWeight: 500, marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.6rem', letterSpacing: '-0.02em' }}>
            <Info size={20} /> Project Description &amp; Build Specifications
          </h2>
          <div style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: '1.8', whiteSpace: 'pre-line' }}>
            {product.description}
          </div>
        </div>

        {product.tags && product.tags.length > 0 && (
          <div style={{ marginTop: '4rem', paddingTop: '2.5rem', borderTop: '1px dashed var(--border-color)' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '1rem' }}>
              Project Tags
            </span>
            <div className="product-tags">
              {product.tags.map((tag, idx) => (
                <span key={idx} className="tag-badge">{tag}</span>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Reviews Section */}
      <section className="product-reviews-section">
        <div className="section-header">
          <h2 className="section-title">Verified Reviews</h2>
          <div className="rating-summary">
            <div className="stars">
              {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="var(--text-primary)" stroke="none" />)}
            </div>
            <span>4.9 (24 reviews)</span>
          </div>
        </div>
        
        <div className="reviews-list">
          {reviews.map((review) => (
            <div key={review.id} className="review-item">
              <div className="review-meta">
                <span className="review-author">{review.author}</span>
                <span className="review-date">{review.date}</span>
              </div>
              <div className="review-stars">
                {[...Array(review.rating)].map((_, i) => <Star key={i} size={12} fill="var(--text-primary)" stroke="none" />)}
              </div>
              <p className="review-comment">{review.comment}</p>
            </div>
          ))}
        </div>
      </section>

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

      {/* Bottom Meta Dates */}
      <div className="product-bottom-meta">
        <div className="meta-dates">
          <div className="date-item">
            <Calendar size={12} />
            <span>Published: {product.publishedAt}</span>
          </div>
          <div className="meta-separator">•</div>
          <div className="date-item">
            <Clock size={12} />
            <span>Modified: {product.modifiedAt}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return products.map((product: Product) => ({
    id: product.id,
  }));
}
