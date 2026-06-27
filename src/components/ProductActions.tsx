'use client';

import React, { useState } from 'react';
import { Product } from '@/data/products';

const POLAR_CHECKOUT_URL = 'https://buy.polar.sh/polar_cl_McF3ssXEvy0Fc2XvufxDCCwWJl174WjLaTKxW4fEE1r';

interface ProductActionsProps {
  product: Product;
}

export default function ProductActions({ product }: ProductActionsProps) {
  const [isRedirecting, setIsRedirecting] = useState(false);

  const handleBuyNow = () => {
    setIsRedirecting(true);
    window.location.href = POLAR_CHECKOUT_URL;
  };

  return (
    <div className="product-detail-actions" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2.5rem' }}>
      {/* Direct Checkout Buy Now Button */}
      <button 
        onClick={handleBuyNow}
        disabled={isRedirecting}
        className="btn btn-primary w-full text-center"
        style={{ 
          padding: '1.1rem 2rem', 
          fontSize: '1rem', 
          letterSpacing: '0.05em',
          fontWeight: 700,
          background: isRedirecting ? '#555' : 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)',
          color: '#ffffff',
          border: 'none',
          borderRadius: '10px',
          opacity: isRedirecting ? 0.7 : 1,
          cursor: isRedirecting ? 'not-allowed' : 'pointer',
          boxShadow: isRedirecting ? 'none' : '0 4px 14px rgba(22,163,74,0.35)',
          transition: 'all 0.2s ease'
        }}
      >
        {isRedirecting ? 'SECURE REDIRECTING...' : (
          product.originalPrice 
            ? <>BUY NOW — ${product.price.toFixed(2)} <span style={{ textDecoration: 'line-through', opacity: 0.6, marginLeft: '0.4rem', fontWeight: 400, fontSize: '0.85rem' }}>${product.originalPrice.toFixed(2)}</span></>
            : `BUY NOW — $${product.price.toFixed(2)}`
        )}
      </button>

      {/* Purchase on Etsy Button */}
      <a 
        href={`https://www.etsy.com/shop/HeroAnimalArt?search_query=${encodeURIComponent(product.name.split(' ').slice(0, 2).join(' '))}`}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-secondary w-full text-center"
        style={{ 
          padding: '1.1rem 2rem', 
          fontSize: '1.05rem', 
          letterSpacing: '0.05em',
          border: '1px solid var(--border-color)',
          color: 'var(--text-primary)'
        }}
      >
        PURCHASE ON ETSY
      </a>
    </div>
  );
}
