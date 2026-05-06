import React from 'react';
import Link from 'next/link';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    category: string;
    price: number;
    image: string;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/products/${product.id}`} className="product-card">
      <div className="product-image-container">
        <img src={product.image} alt={product.name} className="product-image" />
      </div>
      <div className="product-category">{product.category}</div>
      <h3 className="product-title" title={product.name}>{product.name}</h3>
      <div className="product-price">
        <span>${product.price.toFixed(2)}</span>
        <button className="add-to-cart" aria-label={`Add ${product.name} to cart`}>
          Add to Cart
        </button>
      </div>
    </Link>
  );
}
