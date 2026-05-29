'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingBag, Search, User, Menu, X } from 'lucide-react';

const announcements = [
  "📏 Dual Imperial & Metric Measurements Included",
  "📩 Instant PDF Downloads Right After Checkout",
  "⚡ Optimized Cut Lists Save 30% on Wood Costs"
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [announcementIndex, setAnnouncementIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setAnnouncementIndex((prev) => (prev + 1) % announcements.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="navbar-wrapper">
      <div className="announcement-bar">
        <span className="announcement-text animate-fade-in" key={announcementIndex} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
          {announcements[announcementIndex]}
        </span>
      </div>

      <nav className={`navbar ${scrolled ? 'glass' : ''}`}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link href="/" className="logo">
            GREAT WOODEN
          </Link>

          <div className={`nav-links ${mobileMenuOpen ? 'mobile-open' : ''}`}>
            <Link href="/products" className="nav-link">ALL PLANS</Link>
            <Link href="/products?category=food-cart" className="nav-link">COFFEE CARTS &amp; BARS</Link>
            <Link href="/products?category=farmstand" className="nav-link">FARMSTANDS</Link>
            <Link href="/collections" className="nav-link">CURATED SERIES</Link>
          </div>

          <div className="nav-actions">
            <button className="icon-btn" aria-label="Search">
              <Search size={16} strokeWidth={1} />
            </button>
            <button className="icon-btn" aria-label="Account">
              <User size={16} strokeWidth={1} />
            </button>
            <button className="icon-btn" aria-label="Cart" style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <ShoppingBag size={16} strokeWidth={1} />
              <span style={{ fontSize: '0.65rem', fontWeight: 400 }}>(0)</span>
            </button>
            <button 
              className="icon-btn mobile-only" 
              style={{ display: 'none' }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={20} strokeWidth={1} /> : <Menu size={20} strokeWidth={1} />}
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}

