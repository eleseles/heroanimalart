'use client';

import React, { useState, useMemo } from 'react';
import ProductCard from '@/components/ProductCard';
import { products } from '@/data/products';
import { 
  ArrowRight, 
  Download, 
  ShieldCheck, 
  Star, 
  HelpCircle, 
  ChevronDown,
  Printer,
  Image as ImageIcon
} from 'lucide-react';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'ALL' | 'NEW' | 'BEST' | 'SALE'>('ALL');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const filteredProducts = useMemo(() => {
    if (activeTab === 'ALL') return products.slice(0, 8);
    if (activeTab === 'NEW') return products.slice(8, 16);
    if (activeTab === 'BEST') return [...products].sort((a,b) => b.price - a.price).slice(0, 8);
    if (activeTab === 'SALE') return products.filter(p => p.originalPrice && p.originalPrice > p.price).slice(0, 8);
    return products.slice(0, 8);
  }, [activeTab]);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <>
      <section className="hero container">
        <div className="hero-content animate-fade-in">
          <div className="hero-badge">NEW ARRIVALS — POSTER DESIGNS</div>
          <h1 className="hero-title">
            Transform Your Space<br />With Unique Art
          </h1>
          <p className="hero-desc">
            Download high-resolution digital poster designs instantly. From quirky animal portraits to modern coastal prints, find the perfect artwork for your home.
          </p>
          <div className="hero-actions">
            <a href="/products" className="btn btn-primary">
              SHOP ALL POSTERS
            </a>
            <a href="#testimonials" className="btn btn-secondary">
              READ REVIEWS
            </a>
          </div>
        </div>
        <div className="hero-image-wrapper" style={{ borderRadius: '8px', overflow: 'hidden' }}>
          <img 
            src={products[0]?.image || "/hero.png"} 
            alt="HeroAnimalArt Posters" 
            className="hero-image"
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
          />
        </div>
      </section>

      <section className="section container" style={{ paddingTop: '6rem', marginTop: '3rem' }}>
        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 3rem auto' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 500, marginBottom: '1rem', letterSpacing: '-0.02em' }}>Discover Unique Art</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem' }}>
            Select a category below to discover premium poster designs ready for instant download.
          </p>
        </div>

        <div className="showcase-tabs">
          <button className={`showcase-tab ${activeTab === 'ALL' ? 'active' : ''}`} onClick={() => setActiveTab('ALL')}>All Prints</button>
          <button className={`showcase-tab ${activeTab === 'NEW' ? 'active' : ''}`} onClick={() => setActiveTab('NEW')}>New Arrivals</button>
          <button className={`showcase-tab ${activeTab === 'BEST' ? 'active' : ''}`} onClick={() => setActiveTab('BEST')}>Best Sellers</button>
          <button className={`showcase-tab ${activeTab === 'SALE' ? 'active' : ''}`} onClick={() => setActiveTab('SALE')}>On Sale</button>
        </div>
        
        <div className="products-grid-container fade-in-scale" key={activeTab}>
          <div className="products-grid">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
        
        <div style={{ textAlign: 'center', marginTop: '4rem' }}>
          <a href="/products" className="btn btn-secondary" style={{ padding: '0.75rem 3rem' }}>
            View Full Catalog ({products.length} Posters)
          </a>
        </div>
      </section>

      <section className="section container" style={{ borderTop: '1px solid var(--border-color)', paddingTop: '5rem', paddingBottom: '5rem' }}>
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 4rem auto' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 500, marginBottom: '1rem', letterSpacing: '-0.02em' }}>Easy 3-Step Process</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem' }}>
            From high-resolution digital download to beautifully framed wall art in minutes.
          </p>
        </div>
        
        <div className="steps-grid">
          <div className="step-card">
            <div className="step-number">01</div>
            <h3 className="step-title">Select Your Art</h3>
            <p className="step-desc">Browse our catalog of unique, hand-crafted poster designs to find the perfect match for your space.</p>
          </div>
          <div className="step-card">
            <div className="step-number">02</div>
            <h3 className="step-title">Instant Download</h3>
            <p className="step-desc">Get immediate access to high-resolution JPG files in multiple size ratios right after checkout.</p>
          </div>
          <div className="step-card">
            <div className="step-number">03</div>
            <h3 className="step-title">Print &amp; Frame</h3>
            <p className="step-desc">Print at home, your local print shop, or use an online service. Frame it and enjoy your new look!</p>
          </div>
        </div>
      </section>

      <section className="spotlight-section">
        <div className="container">
          <div className="spotlight-grid">
            <div className="spotlight-blueprint-wrapper">
              <img src={products[1]?.image || ""} alt="Featured Poster Mockup" className="spotlight-blueprint-img" style={{ objectFit: 'cover' }} />
            </div>
            <div className="spotlight-info">
              <div className="spotlight-badge">🏆 Bestseller Print</div>
              <h2 className="spotlight-title">{products[1]?.name || "Featured Art Print"}</h2>
              <p className="spotlight-description">Our #1 ranked digital poster. Bring vibrant colors and modern aesthetics into your living space. This high-resolution download is guaranteed to look crisp and stunning in any frame size.</p>

              <div className="spotlight-features">
                <div className="spotlight-feature-item">
                  <Download className="spotlight-feature-icon" size={18} />
                  <div className="spotlight-feature-text">
                    <h4>Instant Delivery</h4>
                    <p>Get high-resolution files in your inbox instantly.</p>
                  </div>
                </div>
                <div className="spotlight-feature-item">
                  <ImageIcon className="spotlight-feature-icon" size={18} />
                  <div className="spotlight-feature-text">
                    <h4>Multiple Sizes</h4>
                    <p>Includes 5 different size ratios to fit any standard frame.</p>
                  </div>
                </div>
                <div className="spotlight-feature-item">
                  <Printer className="spotlight-feature-icon" size={18} />
                  <div className="spotlight-feature-text">
                    <h4>Print Ready</h4>
                    <p>300 DPI high-quality files ensure a perfect print every time.</p>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginTop: '1.5rem' }}>
                <a href={`/products/${products[1]?.id || '1'}`} className="btn btn-primary" style={{ padding: '0.85rem 2.5rem' }}>
                  SHOP THIS PRINT
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section container" id="testimonials" style={{ borderTop: '1px solid var(--border-color)', paddingTop: '5rem' }}>
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 4rem auto' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 500, marginBottom: '1rem', letterSpacing: '-0.02em' }}>Happy Customers</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem' }}>
            See what art lovers are saying about our digital prints.
          </p>
        </div>

        <div className="testimonials-grid">
          <div className="testimonial-card">
            <div>
              <div className="testimonial-stars">
                {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="var(--text-primary)" stroke="none" />)}
              </div>
              <p className="testimonial-text">"The print quality is absolutely stunning. I printed this at my local shop and it looks like a high-end gallery piece."</p>
            </div>
            <div className="testimonial-author"><span className="author-name">Emily R.</span><span className="author-role">Verified Buyer</span></div>
          </div>
          <div className="testimonial-card">
            <div>
              <div className="testimonial-stars">
                {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="var(--text-primary)" stroke="none" />)}
              </div>
              <p className="testimonial-text">"So easy to use! The different size ratios included made it super simple to find a frame that works for my living room."</p>
            </div>
            <div className="testimonial-author"><span className="author-name">James T.</span><span className="author-role">Verified Buyer</span></div>
          </div>
          <div className="testimonial-card">
            <div>
              <div className="testimonial-stars">
                {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="var(--text-primary)" stroke="none" />)}
              </div>
              <p className="testimonial-text">"Gorgeous design and instant delivery. Transformed my bathroom decor instantly with the funny ghost print!"</p>
            </div>
            <div className="testimonial-author"><span className="author-name">Sarah M.</span><span className="author-role">Verified Buyer</span></div>
          </div>
        </div>
      </section>

      <section className="section container" style={{ borderTop: '1px solid var(--border-color)', paddingTop: '5rem' }}>
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 2rem auto' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 500, marginBottom: '1rem', letterSpacing: '-0.02em' }}>Common Questions</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem' }}>Everything you need to know about our digital art prints.</p>
        </div>

        <div className="faq-accordion-container">
          {[
            {
              question: "What is a digital download?",
              answer: "A digital download means you receive a file containing the artwork instantly after purchase. No physical item is shipped to you. You can print it yourself at home or take it to a professional print shop."
            },
            {
              question: "What sizes are included?",
              answer: "Each purchase includes 5 high-resolution (300 DPI) JPG files in different ratios: 2x3, 3x4, 4x5, 22x28, and ISO (International Standard Size like A1, A2, A3, etc.). These ratios cover almost any standard frame size."
            },
            {
              question: "Where can I print my art?",
              answer: "You can print the files on your home printer, at a local print shop (like Staples or FedEx), or via online printing services that will mail the physical prints directly to your door."
            },
            {
              question: "Can I get a custom size or color?",
              answer: "Absolutely! If you need a specific size or minor color adjustment to match your decor, just send us a message after your purchase and we'll be happy to accommodate."
            }
          ].map((item, index) => (
            <div key={index} className={`faq-item ${openFaqIndex === index ? 'open' : ''}`}>
              <button className="faq-trigger" onClick={() => toggleFaq(index)}>
                <span>{item.question}</span><ChevronDown className="faq-trigger-icon" size={18} />
              </button>
              <div className="faq-content"><p>{item.answer}</p></div>
            </div>
          ))}
        </div>
      </section>

      <section className="trust-banner">
        <div className="container">
          <div className="trust-grid">
            <div className="trust-item">
              <Download size={24} strokeWidth={1} />
              <h3 className="trust-title">Instant Access</h3>
              <p className="trust-desc">Get your digital art files directly in your inbox immediately after payment.</p>
            </div>
            <div className="trust-item">
              <ImageIcon size={24} strokeWidth={1} />
              <h3 className="trust-title">5 Size Ratios</h3>
              <p className="trust-desc">Every purchase includes 5 different aspect ratios to fit over 20 frame sizes.</p>
            </div>
            <div className="trust-item">
              <Printer size={24} strokeWidth={1} />
              <h3 className="trust-title">300 DPI Quality</h3>
              <p className="trust-desc">High-resolution files guarantee crisp, gallery-quality prints.</p>
            </div>
            <div className="trust-item">
              <HelpCircle size={24} strokeWidth={1} />
              <h3 className="trust-title">24/7 Support</h3>
              <p className="trust-desc">Need help resizing or printing? Our team is always here to assist.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
