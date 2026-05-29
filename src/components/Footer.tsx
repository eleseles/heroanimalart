import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col" style={{ paddingRight: '2rem' }}>
            <div className="logo" style={{ marginBottom: '2rem' }}>
              GREAT WOODEN
            </div>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '0.875rem', lineHeight: '1.6' }}>
              Design without compromise. Essential pieces for the modern individual.
            </p>
          </div>
          
          <div className="footer-col">
            <h3>Shop</h3>
            <ul className="footer-links">
              <li><Link href="#">New Arrivals</Link></li>
              <li><Link href="#">Essentials</Link></li>
              <li><Link href="#">Objects</Link></li>
              <li><Link href="#">Archive</Link></li>
            </ul>
          </div>
          
          <div className="footer-col">
            <h3>Assistance</h3>
            <ul className="footer-links">
              <li><Link href="/contact">Contact</Link></li>
              <li><Link href="/shipping">Shipping</Link></li>
              <li><Link href="/returns">Returns</Link></li>
              <li><Link href="/faq">FAQ</Link></li>
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
          <p>&copy; {new Date().getFullYear()} GREAT WOODEN STUDIO.</p>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <a href="#" style={{ transition: 'opacity 0.2s', textDecoration: 'none' }}>INSTAGRAM</a>
            <a href="#" style={{ transition: 'opacity 0.2s', textDecoration: 'none' }}>TWITTER</a>
            <a href="https://www.pinterest.com/GreatWooden/" target="_blank" rel="noopener noreferrer" style={{ transition: 'opacity 0.2s', textDecoration: 'none' }}>PINTEREST</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
