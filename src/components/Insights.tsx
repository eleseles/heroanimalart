import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const insightItems = [
  {
    id: 1,
    category: "Material Guide",
    title: "Choosing the Right Wood for Outdoor Builds: Pine vs. Cedar vs. Treated Lumber",
    date: "May 28, 2026",
    image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80&w=1000",
  },
  {
    id: 2,
    category: "Homesteading",
    title: "How to Build and Secure a Roadside Farmstand for High-Profit Passive Income",
    date: "May 20, 2026",
    image: "https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&q=80&w=1000",
  },
  {
    id: 3,
    category: "Workshop & Craft",
    title: "Essential Woodworking Hand Tools for Your First DIY Home Workshop",
    date: "May 15, 2026",
    image: "https://images.unsplash.com/photo-1581421046325-59322c3fd1d3?auto=format&fit=crop&q=80&w=1000",
  }
];

export default function Insights() {
  return (
    <section className="section container">
      <div className="section-header">
        <h2 className="section-title">Workshop Guides</h2>
        <Link href="/products" className="section-link">View All Guides <ArrowRight size={16} /></Link>
      </div>
      
      <div className="insights-grid">
        {insightItems.map((item) => (
          <div key={item.id} className="insight-card">
            <div className="insight-image-container" style={{ borderRadius: '8px' }}>
              <img src={item.image} alt={item.title} className="insight-image" />
            </div>
            <div className="insight-content">
              <div className="insight-meta">
                <span>{item.category}</span>
                <span className="dot"></span>
                <span>{item.date}</span>
              </div>
              <h3 className="insight-title" style={{ fontSize: '1.1rem', lineHeight: '1.4', fontWeight: 500 }}>{item.title}</h3>
              <Link href="/products" className="insight-link" style={{ fontSize: '0.75rem', fontWeight: 500, letterSpacing: '0.05em' }}>Read Guide</Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

