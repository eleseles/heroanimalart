import React from 'react';
import { Metadata } from 'next';
import { Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact | HeroAnimalArt',
  description: 'Get in touch with HeroAnimalArt for support, licensing questions, or any inquiries.',
};

export default function ContactPage() {
  return (
    <div className="container legal-page">
      <h1>Contact</h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', marginTop: '4rem' }}>
        <div>
          <p>
            We are here to help. Whether you have a question about a download, need a custom size,
            or have a licensing inquiry — reach out and we will get back to you within 2 business days.
          </p>

          <div style={{ marginTop: '3rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <Mail size={18} strokeWidth={1} />
              <span style={{ fontSize: '0.875rem' }}>emrecansari@hotmail.com</span>
            </div>
          </div>

          <p style={{ marginTop: '2rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            <strong>Download issues?</strong> Check your spam folder first — delivery emails
            sometimes land there. If the problem persists, email us with your order number.
          </p>
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
              <label style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Order Number (optional)</label>
              <input type="text" style={{ padding: '0.75rem 0', border: 'none', borderBottom: '1px solid var(--border-color)', outline: 'none', background: 'transparent' }} />
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
