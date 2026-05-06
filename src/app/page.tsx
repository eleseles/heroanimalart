import React from 'react';
import ProductCard from '@/components/ProductCard';
import { products } from '@/data/products';
import { ArrowRight } from 'lucide-react';
import Insights from '@/components/Insights';

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="hero container">
        <div className="hero-content animate-fade-in">
          <div className="hero-badge">ESSENTIALS — COLLECTION 01</div>
          <h1 className="hero-title">
            Redefining<br />Everyday Objects
          </h1>
          <p className="hero-desc">
            A curated selection of minimalist tools for the modern individual. Designed with purpose, crafted to last.
          </p>
          <div className="hero-actions">
            <button className="btn btn-primary">
              EXPLORE COLLECTION
            </button>
            <button className="btn btn-secondary">
              ABOUT US
            </button>
          </div>
        </div>
        <div className="hero-image-wrapper">
          <img 
            src="https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&q=80&w=1000" 
            alt="Minimal object" 
            className="hero-image"
          />
        </div>
      </section>

      {/* Featured Products */}
      <section className="section container">
        <div className="section-header">
          <h2 className="section-title">New Arrivals</h2>
          <a href="#" className="section-link">View All <ArrowRight size={16} /></a>
        </div>
        
        <div className="products-grid">
          {products.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Editorial Section */}
      <section style={{ borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)', padding: '0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '600px' }}>
          <div style={{ padding: '6rem 4rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>Design Principles</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '1.125rem' }}>
              We believe in removing the unnecessary so the essential may speak. Every product is a result of rigorous reduction.
            </p>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem', fontSize: '1.125rem' }}>
              Form follows function, but elegance is never compromised.
            </p>
            <div>
              <button className="btn btn-secondary">
                READ THE MANIFESTO
              </button>
            </div>
          </div>
          <div style={{ borderLeft: '1px solid var(--border-color)', position: 'relative' }}>
            <img 
              src="https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?auto=format&fit=crop&q=80&w=1000" 
              alt="Editorial" 
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(100%)' }}
            />
          </div>
        </div>
      </section>

      {/* Insights Section */}
      <Insights />

      {/* Newsletter Section */}
      <section className="section container">
        <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
          <h2 className="section-title" style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>Join the Journal</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
            Sign up to receive notes on design, exclusive releases, and editorial content.
          </p>
          <div style={{ display: 'flex', gap: '0', borderBottom: '1px solid var(--text-primary)', paddingBottom: '0.5rem' }}>
            <input 
              type="email" 
              placeholder="Email address" 
              style={{ flex: 1, padding: '0.5rem 0', background: 'transparent', border: 'none', outline: 'none', color: 'var(--text-primary)' }}
            />
            <button style={{ textTransform: 'uppercase', fontSize: '0.75rem', fontWeight: 500, letterSpacing: '0.05em' }}>
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
