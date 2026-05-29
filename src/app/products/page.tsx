import React from 'react';
import { Metadata } from 'next';
import ProductCard from '@/components/ProductCard';
import { products } from '@/data/products';

export const metadata: Metadata = {
  title: 'Shop All | Great Wooden',
  description: 'Browse our complete collection of premium DIY woodworking plans.',
};

export default function ShopPage() {
  return (
    <div className="container" style={{ paddingTop: '120px', paddingBottom: '4rem' }}>
      <div className="section-header">
        <h1 className="section-title">All Products</h1>
        <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
          {products.length} Items
        </div>
      </div>
      
      <div className="products-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
