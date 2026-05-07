'use client';

import Image from 'next/image';

interface ProductGalleryProps {
  images: string[];
  name: string;
}

export default function ProductGallery({ images, name }: ProductGalleryProps) {
  const [activeImage, setActiveImage] = useState(images[0]);
  const [currentUrl, setCurrentUrl] = useState('');

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  const pinterestSaveUrl = `https://www.pinterest.com/pin/create/button/?url=${encodeURIComponent(currentUrl)}&media=${encodeURIComponent(activeImage)}&description=${encodeURIComponent(name)}`;

  return (
    <div className="product-detail-image-gallery">
      <div className="main-image relative aspect-square overflow-hidden rounded-lg">
        <Image 
          src={activeImage} 
          alt={name} 
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-all duration-500"
        />
        <a 
          href={pinterestSaveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="pinterest-save-btn"
        >
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.08 3.16 9.42 7.62 11.17-.1-.95-.19-2.4.04-3.43.21-.93 1.34-5.69 1.34-5.69s-.34-.68-.34-1.69c0-1.58.92-2.76 2.06-2.76 0.97 0 1.44.73 1.44 1.61 0 0.98-.62 2.44-.94 3.8-.27 1.13.56 2.05 1.68 2.05 2.01 0 3.56-2.12 3.56-5.18 0-2.71-1.95-4.61-4.73-4.61-3.22 0-5.11 2.41-5.11 4.9 0 0.97.37 2.01.84 2.58.09.11.1.21.07.33-.08.33-.26 1.05-.3 1.19-.05.18-.16.22-.36.13-1.3-.61-2.11-2.52-2.11-4.06 0-3.3 2.4-6.33 6.91-6.33 3.63 0 6.45 2.58 6.45 6.04 0 3.6-2.27 6.51-5.42 6.51-1.06 0-2.05-.55-2.39-1.2l-.65 2.48c-.24.91-.88 2.06-1.31 2.76 1.12.33 2.3.51 3.53.51 6.63 0 12-5.37 12-12S18.63 0 12 0z"/>
          </svg>
          <span>Save for Inspiration</span>
        </a>
      </div>
      <div className="thumbnail-grid">
        {images.map((img, idx) => (
          <div 
            key={idx} 
            className={`thumbnail-item relative aspect-square overflow-hidden rounded-md cursor-pointer transition-all ${activeImage === img ? 'active ring-2 ring-black' : 'opacity-60 hover:opacity-100'}`}
            onClick={() => setActiveImage(img)}
          >
            <Image 
              src={img} 
              alt={`${name} - view ${idx + 1}`} 
              fill
              sizes="100px"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
