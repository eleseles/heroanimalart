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
            Build Your Own<br />Masterpieces
          </h1>
          <p className="hero-desc">
            Download highly detailed blueprints and step-by-step guides. Build custom furniture, outdoor structures, and beautiful home decor with ease.
          </p>
          <div className="hero-actions">
            <button className="btn btn-primary">
              BROWSE PLANS
            </button>
            <button className="btn btn-secondary">
              READ REVIEWS
            </button>
          </div>
        </div>
        <div className="hero-image-wrapper">
          <img 
            src="/hero.png" 
            alt="Great Wooden DIY Plans" 
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
          {products.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Editorial Section */}
      <section style={{ borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)', padding: '0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '650px' }}>
          <div style={{ padding: '6rem 4rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '2.5rem', fontWeight: 500 }}>Why Builders Choose Us</h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginBottom: '3rem' }}>
              <div>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 500, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>📏 Imperial &amp; Metric Formats</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem', lineHeight: '1.6' }}>
                  No more conversion headaches. Every project guide includes complete dimensions in both inches and millimeters.
                </p>
              </div>
              
              <div>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 500, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>🪵 Material &amp; Cut Optimization</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem', lineHeight: '1.6' }}>
                  Save money at the lumber yard. Our detailed blueprints provide exact shopping lists and optimized cut plans to prevent wood waste.
                </p>
              </div>

              <div>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 500, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>📐 Clear 3D Visual Assembly</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem', lineHeight: '1.6' }}>
                  Highly detailed CAD drawings and exploded views guide you step-by-step from base construction to final finishing details.
                </p>
              </div>
            </div>
            
            <div>
              <a href="/products" className="btn btn-primary">
                START BUILDING NOW
              </a>
            </div>
          </div>
          <div style={{ borderLeft: '1px solid var(--border-color)', position: 'relative' }}>
            <img 
              src="https://images.unsplash.com/photo-1455729552865-3ef58a362917?auto=format&fit=crop&q=80&w=1000" 
              alt="Hand-crafted wood sanding details" 
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
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
