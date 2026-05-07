import Image from 'next/image';
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
      </div>
      <div className="product-category mt-3 text-xs uppercase tracking-wider text-gray-500">{product.category}</div>
      <h3 className="product-title mt-1 text-sm font-medium line-clamp-2" title={product.name}>{product.name}</h3>
      <div className="product-price mt-2 flex items-center justify-between">
        <span className="font-semibold text-gray-900">${product.price.toFixed(2)}</span>
        <div className="add-to-cart-dummy text-xs font-medium text-black underline underline-offset-4 opacity-0 transition-opacity group-hover:opacity-100">
          View Details
        </div>
      </div>
    </Link>
  );
}
