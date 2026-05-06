'use client';

import React, { useState } from 'react';

interface ProductGalleryProps {
  images: string[];
  name: string;
}

export default function ProductGallery({ images, name }: ProductGalleryProps) {
  const [activeImage, setActiveImage] = useState(images[0]);

  return (
    <div className="product-detail-image-gallery">
      <div className="main-image">
        <img src={activeImage} alt={name} />
      </div>
      <div className="thumbnail-grid">
        {images.map((img, idx) => (
          <div 
            key={idx} 
            className={`thumbnail-item ${activeImage === img ? 'active' : ''}`}
            onClick={() => setActiveImage(img)}
          >
            <img src={img} alt={`${name} - view ${idx + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
}
