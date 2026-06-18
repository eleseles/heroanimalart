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
  const product = products.find((p: Product) => p.slug === id);

  if (!product) return { title: 'Product Not Found' };

  return {
    title: `${product.name} | HeroAnimalArt`,
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
  const product = products.find((p: Product) => p.slug === id);

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
      name: 'HeroAnimalArt',
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

          {/* Premium Price Block */}
          <div style={{ marginBottom: '2rem' }}>
            {product.originalPrice ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span style={{ 
                    fontSize: '2.2rem', 
                    fontWeight: 700, 
                    color: '#16a34a',
                    letterSpacing: '-0.03em',
                    lineHeight: 1
                  }}>
                    ${product.price.toFixed(2)}
                  </span>
                  <span style={{
                    fontSize: '1.2rem',
                    fontWeight: 400,
                    color: '#9ca3af',
                    textDecoration: 'line-through',
                    textDecorationColor: '#ef4444',
                    textDecorationThickness: '2px',
                    lineHeight: 1
                  }}>
                    ${product.originalPrice.toFixed(2)}
                  </span>
                </div>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  background: 'linear-gradient(135deg, #fef2f2 0%, #fff1f2 100%)',
                  border: '1px solid #fecdd3',
                  borderRadius: '8px',
                  padding: '0.5rem 0.85rem',
                  width: 'fit-content'
                }}>
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: '#ef4444',
                    color: '#fff',
                    fontSize: '0.65rem',
                    fontWeight: 800,
                    padding: '0.2rem 0.5rem',
                    borderRadius: '4px',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase' as const
                  }}>
                    −20%
                  </span>
                  <span style={{
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    color: '#be123c',
                    letterSpacing: '0.01em'
                  }}>
                    You save ${(product.originalPrice - product.price).toFixed(2)} on this poster
                  </span>
                </div>
              </div>
            ) : (
              <span className="product-detail-price">${product.price.toFixed(2)}</span>
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
