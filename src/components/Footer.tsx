import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col" style={{ paddingRight: '2rem' }}>
            <div className="logo" style={{ marginBottom: '2rem' }}>
              HEROANIMALART
            </div>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '0.875rem', lineHeight: '1.6' }}>
              Discover unique, high-quality digital poster designs and art prints to elevate your home decor. Instant downloads in multiple sizes for easy, affordable styling.
            </p>
          </div>
          
          <div className="footer-col">
            <h3>Shop Posters</h3>
            <ul className="footer-links">
              <li><Link href="/products">All Art Prints</Link></li>
              <li><Link href="/products?category=new">New Arrivals</Link></li>
              <li><Link href="/products?category=best-sellers">Best Sellers</Link></li>
            </ul>
          </div>
          
          <div className="footer-col">
            <h3>Assistance</h3>
            <ul className="footer-links">
              <li><Link href="/contact">Contact Support</Link></li>
              <li><Link href="/shipping">Digital Delivery</Link></li>
              <li><Link href="/returns">Refund Policy</Link></li>
              <li><Link href="/faq">Help &amp; FAQ</Link></li>
            </ul>
          </div>
          
          <div className="footer-col">
            <h3>Legal</h3>
            <ul className="footer-links">
              <li><Link href="/terms">Terms of Service</Link></li>
              <li><Link href="/privacy">Privacy Policy</Link></li>
              <li><Link href="/imprint">Imprint</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} HEROANIMALART. ALL RIGHTS RESERVED.</p>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <a href="#" style={{ transition: 'opacity 0.2s', textDecoration: 'none' }}>INSTAGRAM</a>
            <a href="#" style={{ transition: 'opacity 0.2s', textDecoration: 'none' }}>TWITTER</a>
            <a href="https://www.pinterest.com/HeroAnimalArt/" target="_blank" rel="noopener noreferrer" style={{ transition: 'opacity 0.2s', textDecoration: 'none' }}>PINTEREST</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

