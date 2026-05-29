import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQ | Great Wooden',
  description: 'Frequently asked questions about Great Wooden products, orders, and services.',
};

export default function FAQPage() {
  return (
    <div className="container legal-page">
      <h1>FAQ</h1>
      
      <h2>Orders</h2>
      <div style={{ marginBottom: '3rem' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 500, marginBottom: '0.5rem' }}>How can I track my order?</h3>
        <p>Once your order has shipped, you will receive an email with a tracking link to follow your shipment.</p>
        
        <h3 style={{ fontSize: '1rem', fontWeight: 500, marginBottom: '0.5rem', marginTop: '1.5rem' }}>Can I cancel or modify my order?</h3>
        <p>We process orders quickly, but if you contact us within 2 hours of placing your order, we may be able to make changes.</p>
      </div>

      <h2>Products</h2>
      <div style={{ marginBottom: '3rem' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 500, marginBottom: '0.5rem' }}>Where are your products made?</h3>
        <p>All Great Wooden products are designed in our workshop and manufactured by artisan partners who share our commitment to quality and sustainability.</p>
        
        <h3 style={{ fontSize: '1rem', fontWeight: 500, marginBottom: '0.5rem', marginTop: '1.5rem' }}>Do you offer a warranty?</h3>
        <p>Yes, all Great Wooden products come with a 2-year extended warranty covering manufacturing defects.</p>
      </div>

      <h2>Shipping & Returns</h2>
      <div style={{ marginBottom: '3rem' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 500, marginBottom: '0.5rem' }}>Do you ship internationally?</h3>
        <p>Yes, we ship to over 50 countries worldwide via our premium courier partners.</p>
        
        <h3 style={{ fontSize: '1rem', fontWeight: 500, marginBottom: '0.5rem', marginTop: '1.5rem' }}>How long do returns take to process?</h3>
        <p>Once we receive your return, it typically takes 5-10 business days for the refund to appear in your account.</p>
      </div>
    </div>
  );
}
