import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Collections | Bizilla Studio',
  description: 'Explore our curated series of design-focused objects and technology.',
};

const collections = [
  {
    id: 'quantum',
    name: 'Quantum Series',
    description: 'A study in light and precision. High-performance audio and wearables.',
    image: 'https://images.unsplash.com/photo-1546435770-a3e426fa99f5?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: 'essentials',
    name: 'The Essentials',
    description: 'Foundational objects for the modern workspace and home.',
    image: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: 'archive',
    name: 'The Archive',
    description: 'Limited releases and historical pieces from the Bizilla design vault.',
    image: 'https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?auto=format&fit=crop&q=80&w=1000'
  }
];

export default function CollectionsPage() {
  return (
    <div className="container" style={{ paddingTop: '120px', paddingBottom: '8rem' }}>
      <div className="section-header">
        <h1 className="section-title">Collections</h1>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8rem' }}>
        {collections.map((collection) => (
          <div key={collection.id} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
            <div className="product-image-container" style={{ height: '500px', margin: 0 }}>
              <img 
                src={collection.image} 
                alt={collection.name} 
                style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(100%)' }} 
              />
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', letterSpacing: '0.1em', color: 'var(--text-secondary)', marginBottom: '1rem', textTransform: 'uppercase' }}>CURATED SERIES</div>
              <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>{collection.name}</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.125rem', marginBottom: '2.5rem', maxWidth: '400px' }}>{collection.description}</p>
              <Link href="/products" className="btn btn-secondary">
                EXPLORE <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
