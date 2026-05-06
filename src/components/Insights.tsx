import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const insightItems = [
  {
    id: 1,
    category: "Design",
    title: "The Art of Minimal Woodworking",
    date: "May 12, 2026",
    image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80&w=1000",
  },
  {
    id: 2,
    category: "Tutorial",
    title: "Building Your First Mobile Display Cart",
    date: "April 28, 2026",
    image: "https://images.unsplash.com/photo-1581421046325-59322c3fd1d3?auto=format&fit=crop&q=80&w=1000",
  },
  {
    id: 3,
    category: "Business",
    title: "How to Start a Pop-up Event Business",
    date: "April 15, 2026",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1000",
  }
];

export default function Insights() {
  return (
    <section className="section container">
      <div className="section-header">
        <h2 className="section-title">Insights</h2>
        <Link href="#" className="section-link">View All Journal <ArrowRight size={16} /></Link>
      </div>
      
      <div className="insights-grid">
        {insightItems.map((item) => (
          <div key={item.id} className="insight-card">
            <div className="insight-image-container">
              <img src={item.image} alt={item.title} className="insight-image" />
            </div>
            <div className="insight-content">
              <div className="insight-meta">
                <span>{item.category}</span>
                <span className="dot"></span>
                <span>{item.date}</span>
              </div>
              <h3 className="insight-title">{item.title}</h3>
              <Link href="#" className="insight-link">Read More</Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
