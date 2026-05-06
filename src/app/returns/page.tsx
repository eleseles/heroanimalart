import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Returns | Bizilla Studio',
  description: 'Our returns policy and instructions for returning or exchanging items.',
};

export default function ReturnsPage() {
  return (
    <div className="container legal-page">
      <h1>Returns</h1>
      
      <h2>Our Return Policy</h2>
      <p>
        If you are not completely satisfied with your purchase, you may return your item(s) within 
        30 days of receipt for a full refund or exchange.
      </p>

      <h2>Return Requirements</h2>
      <ul>
        <li>Items must be in original, unused condition</li>
        <li>Original packaging must be intact</li>
        <li>All tags and protective seals must be attached</li>
        <li>Proof of purchase is required</li>
      </ul>

      <h2>How to Start a Return</h2>
      <p>
        To initiate a return, please contact our support team at support@luminastudio.com with 
        your order number. We will provide you with a prepaid return label and instructions.
      </p>

      <h2>Refund Process</h2>
      <p>
        Once your return is received and inspected, we will notify you of the approval or rejection 
        of your refund. If approved, your refund will be processed to your original method of 
        payment within 5-10 business days.
      </p>

      <h2>Exchanges</h2>
      <p>
        We only replace items if they are defective or damaged. If you need to exchange an item 
        for the same product, please send us an email.
      </p>
    </div>
  );
}
