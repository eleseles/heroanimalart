import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/data/products';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/products/${product.id}`} className="product-card group">
      <div className="product-image-container relative aspect-square overflow-hidden rounded-md bg-gray-50">
        <Image 
          src={product.image} 
          alt={product.name} 
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="product-image object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {product.originalPrice && (
          <span style={{
            position: 'absolute',
            top: '10px',
            left: '10px',
            background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
            color: '#fff',
            fontWeight: 800,
            fontSize: '0.65rem',
            letterSpacing: '0.08em',
            padding: '0.3rem 0.6rem',
            borderRadius: '6px',
            zIndex: 10,
            boxShadow: '0 2px 8px rgba(239,68,68,0.35)',
            textTransform: 'uppercase' as const
          }}>
            −20%
          </span>
        )}
      </div>
      <div className="product-category mt-3 text-xs uppercase tracking-wider text-gray-500">{product.category}</div>
      <h3 className="product-title mt-1 text-sm font-medium line-clamp-2" title={product.name}>{product.name}</h3>
      <div className="product-price mt-2 flex items-center justify-between">
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem' }}>
          <span style={{ fontWeight: 700, color: product.originalPrice ? '#16a34a' : '#111', fontSize: '0.95rem' }}>
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span style={{ fontSize: '0.75rem', color: '#9ca3af', textDecoration: 'line-through', fontWeight: 400 }}>
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>
        <div className="add-to-cart-dummy text-xs font-medium text-black underline underline-offset-4 opacity-0 transition-opacity group-hover:opacity-100">
          View Details
        </div>
      </div>
    </Link>
  );
}
