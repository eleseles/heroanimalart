import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shipping | Bizilla Studio',
  description: 'Shipping rates, delivery times, and international shipping information.',
};

export default function ShippingPage() {
  return (
    <div className="container legal-page">
      <h1>Shipping</h1>
      
      <h2>Delivery Methods</h2>
      <p>We offer premium shipping services to ensure your items arrive safely and promptly.</p>
      <ul>
        <li>Standard Shipping (3-5 business days): $10 (Free on orders over $200)</li>
        <li>Express Shipping (1-2 business days): $25</li>
        <li>International Shipping (5-10 business days): $45</li>
      </ul>

      <h2>Order Processing</h2>
      <p>
        Orders are processed Monday through Friday, excluding holidays. Please allow 1-2 business 
        days for processing before your order is dispatched. Once shipped, you will receive a 
        confirmation email with tracking information.
      </p>

      <h2>International Orders</h2>
      <p>
        Bizilla Studio ships worldwide. Please note that international orders may be subject to 
        import duties and taxes, which are the responsibility of the customer.
      </p>

      <h2>Insurance</h2>
      <p>
        All shipments are fully insured against loss or damage during transit. If your item 
        arrives damaged, please contact us immediately with photographic evidence.
      </p>
    </div>
  );
}
