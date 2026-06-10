import React from 'react';
import { Metadata } from 'next';
import { Mail, Phone, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact | HeroAnimalArt',
  description: 'Get in touch with the HeroAnimalArt team for support and inquiries.',
};

export default function ContactPage() {
  return (
    <div className="container legal-page">
      <h1>Contact</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', marginTop: '4rem' }}>
        <div>
          <p>We are here to help. Whether you have a question about our collection or need assistance with an order, our team is at your disposal.</p>
          
          <div style={{ marginTop: '3rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <Mail size={18} strokeWidth={1} />
              <span style={{ fontSize: '0.875rem' }}>support@luminastudio.com</span>
            </div>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <Phone size={18} strokeWidth={1} />
              <span style={{ fontSize: '0.875rem' }}>+49 (0) 30 123 456 78</span>
            </div>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <MapPin size={18} strokeWidth={1} />
              <span style={{ fontSize: '0.875rem' }}>Minimalstrasse 12, 10115 Berlin</span>
            </div>
          </div>
        </div>

        <div>
          <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Name</label>
              <input type="text" style={{ padding: '0.75rem 0', border: 'none', borderBottom: '1px solid var(--border-color)', outline: 'none', background: 'transparent' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Email</label>
              <input type="email" style={{ padding: '0.75rem 0', border: 'none', borderBottom: '1px solid var(--border-color)', outline: 'none', background: 'transparent' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Message</label>
              <textarea rows={4} style={{ padding: '0.75rem 0', border: 'none', borderBottom: '1px solid var(--border-color)', outline: 'none', background: 'transparent', resize: 'none' }}></textarea>
            </div>
            <button className="btn btn-primary" style={{ marginTop: '1rem' }}>SEND MESSAGE</button>
          </form>
        </div>
      </div>
    </div>
  );
}
