'use client';

import React, { useState } from 'react';
import { Product } from '@/data/products';
import { ShieldCheck, Lock, Mail, CreditCard, Check, X, Download } from 'lucide-react';

interface ProductActionsProps {
  product: Product;
}

export default function ProductActions({ product }: ProductActionsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    setStep('form');
    setEmail('');
    setCardNumber('');
    setExpiry('');
    setCvc('');
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !cardNumber) return;
    setIsSubmitting(true);
    
    // Simulate premium payment processing
    setTimeout(() => {
      setIsSubmitting(false);
      setStep('success');
    }, 1500);
  };

  return (
    <>
      {/* Product Page Button Panel */}
      <div className="product-detail-actions" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2.5rem' }}>
        
        {/* Direct Checkout Buy Now Button */}
        <button 
          onClick={handleOpen}
          className="btn btn-primary w-full text-center"
          style={{ 
            padding: '1.1rem 2rem', 
            fontSize: '1rem', 
            letterSpacing: '0.05em',
            fontWeight: 600,
            background: '#000000',
            color: '#ffffff',
            border: '1px solid #000000'
          }}
        >
          BUY NOW — ${product.price.toFixed(2)}
        </button>

        {/* Purchase on Etsy Button */}
        <a 
          href={`https://www.etsy.com/search?q=${encodeURIComponent(product.name + ' Great Wooden')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-secondary w-full text-center"
          style={{ 
            padding: '1.1rem 2rem', 
            fontSize: '1.05rem', 
            letterSpacing: '0.05em',
            border: '1px solid var(--border-color)',
            color: 'var(--text-primary)'
          }}
        >
          PURCHASE ON ETSY
        </a>
      </div>

      {/* Direct Checkout Glassmorphism Modal */}
      {isOpen && (
        <div className="checkout-overlay">
          <div className="checkout-modal">
            {/* Close trigger */}
            <button className="checkout-close" onClick={handleClose}>
              <X size={20} />
            </button>

            {step === 'form' ? (
              <>
                <h3 className="checkout-title">Direct Digital Checkout</h3>
                
                {/* Product Summary */}
                <div style={{ background: '#f9f9f9', padding: '1rem', borderRadius: '6px', border: '1px solid #eee', marginBottom: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <img src={product.image} alt={product.name} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h4 style={{ fontSize: '0.85rem', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{product.name}</h4>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Instant PDF Blueprint Download</span>
                  </div>
                  <span style={{ fontSize: '1rem', fontWeight: 600 }}>${product.price.toFixed(2)}</span>
                </div>

                <form className="checkout-form" onSubmit={handleSubmit}>
                  {/* Email block */}
                  <div className="checkout-input-group">
                    <label className="checkout-input-label">Email Address</label>
                    <div style={{ position: 'relative' }}>
                      <input 
                        type="email" 
                        required
                        placeholder="your@email.com" 
                        className="checkout-input w-full"
                        style={{ paddingLeft: '2.5rem' }}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <Mail size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                    </div>
                  </div>

                  {/* Card Number block */}
                  <div className="checkout-input-group">
                    <label className="checkout-input-label">Credit Card Number</label>
                    <div style={{ position: 'relative' }}>
                      <input 
                        type="text" 
                        required
                        maxLength={19}
                        placeholder="4111 2222 3333 4444" 
                        className="checkout-input w-full"
                        style={{ paddingLeft: '2.5rem' }}
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim())}
                      />
                      <CreditCard size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                    </div>
                  </div>

                  {/* Expiry and CVC grid */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div className="checkout-input-group">
                      <label className="checkout-input-label">Expiration Date</label>
                      <input 
                        type="text" 
                        required
                        maxLength={5}
                        placeholder="MM/YY" 
                        className="checkout-input"
                        value={expiry}
                        onChange={(e) => setExpiry(e.target.value)}
                      />
                    </div>
                    <div className="checkout-input-group">
                      <label className="checkout-input-label">CVC Code</label>
                      <input 
                        type="password" 
                        required
                        maxLength={3}
                        placeholder="123" 
                        className="checkout-input"
                        value={cvc}
                        onChange={(e) => setCvc(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Security indicators */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-secondary)', padding: '0.5rem 0' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <Lock size={12} /> 256-Bit SSL Encrypted
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <ShieldCheck size={12} /> Secure Gateway
                    </span>
                  </div>

                  {/* Submit Button */}
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary w-full text-center"
                    style={{ padding: '1rem', background: '#000000', color: '#ffffff' }}
                  >
                    {isSubmitting ? 'PROCESSING...' : `PAY & DOWNLOAD NOW — $${product.price.toFixed(2)}`}
                  </button>
                </form>
              </>
            ) : (
              <div className="checkout-success-box animate-fade-in">
                <div className="success-circle">
                  <Check size={32} />
                </div>
                <h3 className="checkout-title" style={{ marginBottom: '0.5rem' }}>Payment Successful!</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem', lineHeight: '1.5', marginBottom: '2rem' }}>
                  Your plans are ready. We also sent a high-resolution backup link to <strong>{email}</strong>.
                </p>

                {/* Simulated direct PDF download trigger */}
                <a 
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    alert("Your detailed PDF build plans are downloading! (This is a working storefront demonstration)");
                  }}
                  className="btn btn-primary w-full text-center"
                  style={{ padding: '1.1rem', background: '#22c55e', border: '1px solid #22c55e', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                >
                  <Download size={18} /> DOWNLOAD PLANS (PDF)
                </a>
                
                <button 
                  onClick={handleClose} 
                  className="btn btn-secondary w-full text-center" 
                  style={{ marginTop: '1rem', padding: '0.75rem' }}
                >
                  CLOSE SHOP
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
