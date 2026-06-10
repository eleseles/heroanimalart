import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Curated Collections | HeroAnimalArt',
  description: 'Explore our curated series of premium woodworking plans and detailed digital blueprints.',
};

const collections = [
  {
    id: 'food-cart',
    name: 'Coffee Carts & Mobile Bars',
    description: 'Commercial-grade collapsible espresso bars, event beverage stations, folding charcuterie carts, and lemonade stands designed for peak vendor workflow.',
    image: 'https://i.etsystatic.com/62574134/r/il/320885/7929536095/il_fullxfull.7929536095_fq7w.jpg'
  },
  {
    id: 'farmstand',
    name: 'Roadside Farmstands',
    description: 'Secure, enclosed sourdough bakery displays, driveway egg stands, fresh flower stalls, and heavy-duty produce racks engineered for maximum capacity and weather resistance.',
    image: 'https://i.etsystatic.com/62574134/r/il/3ca954/7902221795/il_fullxfull.7902221795_oq01.jpg'
  },
  {
    id: 'garden',
    name: 'Outdoor & Garden projects',
    description: 'Lumber-optimized backyard builds, carpenter bee traps, mason jar bee catchers, and beautiful home workshop objects tailored for beginner woodworkers.',
    image: 'https://i.etsystatic.com/62574134/r/il/7f2880/7941130888/il_fullxfull.7941130888_dqn4.jpg'
  }
];

export default function CollectionsPage() {
  return (
    <div className="container" style={{ paddingTop: '100px', paddingBottom: '8rem' }}>
      <div className="section-header">
        <h1 className="section-title">Curated Build Series</h1>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6rem' }}>
        {collections.map((collection) => (
          <div key={collection.id} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
            <div className="product-image-container" style={{ height: '450px', margin: 0, borderRadius: '8px', overflow: 'hidden' }}>
              <img 
                src={collection.image} 
                alt={collection.name} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', letterSpacing: '0.1em', color: 'var(--text-secondary)', marginBottom: '1rem', textTransform: 'uppercase' }}>CURATED SERIES</div>
              <h2 style={{ fontSize: '2.25rem', marginBottom: '1.5rem', fontWeight: 500, letterSpacing: '-0.02em' }}>{collection.name}</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: '1.6', marginBottom: '2.5rem', maxWidth: '460px' }}>{collection.description}</p>
              <Link href={`/products?category=${collection.id === 'garden' ? 'bee-trap' : collection.id}`} className="btn btn-secondary" style={{ padding: '0.75rem 2rem' }}>
                EXPLORE PLANS <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
