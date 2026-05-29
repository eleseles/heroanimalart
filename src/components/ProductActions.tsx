'use client';

import React, { useState } from 'react';
import { Product } from '@/data/products';

interface ProductActionsProps {
  product: Product;
}

export default function ProductActions({ product }: ProductActionsProps) {
  const [isRedirecting, setIsRedirecting] = useState(false);

  const handleBuyNow = async () => {
    if (!product.polarProductId) {
      alert("This product checkout is currently in sandbox mode. Direct payments will be active once live.");
      return;
    }

    setIsRedirecting(true);

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          polarProductId: product.polarProductId,
          productName: product.name,
        }),
      });

      if (!res.ok) {
        throw new Error('Checkout session generation failed');
      }

      const data = await res.json();
      
      if (data.url) {
        // Redirect customer to the secure checkout page
        window.location.href = data.url;
      } else {
        throw new Error('No redirection URL returned from server');
      }
    } catch (error) {
      console.error('❌ Direct checkout error:', error);
      alert('Secure payment server is currently busy. Please try again or purchase via Etsy.');
      setIsRedirecting(false);
    }
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
        href={`https://www.etsy.com/search?q=${encodeURIComponent(product.name + ' Great Wooden')}`}
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
