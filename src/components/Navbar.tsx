'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingBag, Search, User, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'glass' : ''}`}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link href="/" className="logo">
          GREAT WOODEN
        </Link>

        <div className={`nav-links ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          <Link href="/products" className="nav-link">SHOP</Link>
          <Link href="/collections" className="nav-link">COLLECTIONS</Link>
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
  );
}
