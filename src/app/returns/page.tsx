import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Refund Policy | HeroAnimalArt',
  description: 'Refund and cancellation policy for HeroAnimalArt digital downloads.',
};

export default function ReturnsPage() {
  return (
    <div className="container legal-page">
      <h1>Refund Policy</h1>

      <p>Last updated: June 30, 2026</p>

      <h2>Digital Products — No Returns</h2>
      <p>
        All products sold by HeroAnimalArt are <strong>digital downloads</strong>. Because digital
        files are delivered instantly and cannot be &ldquo;returned&rdquo; once downloaded, we do
        not accept returns or exchanges.
      </p>

      <h2>Exceptions — When We Do Refund</h2>
      <p>We will issue a full refund if:</p>
      <ul>
        <li>Your file did not download successfully and we cannot resolve the issue.</li>
        <li>The file you received is corrupted or does not match the product description.</li>
        <li>You were charged more than once for the same order.</li>
      </ul>
      <p>
        Refund requests must be submitted within <strong>14 days</strong> of purchase. Please
        contact us with your order confirmation and a description of the problem.
      </p>

      <h2>How to Request a Refund</h2>
      <p>
        Email us at <strong>emrecansari@hotmail.com</strong> with the subject line
        &ldquo;Refund Request — [Order Number]&rdquo;. We aim to respond within 2 business days.
      </p>

      <h2>Non-Refundable Situations</h2>
      <ul>
        <li>Change of mind after download.</li>
        <li>Purchasing the wrong item — please review product details before buying.</li>
        <li>Inability to open files due to incompatible software on your device.</li>
      </ul>

      <h2>File Formats</h2>
      <p>
        Our digital prints are delivered as high-resolution files (typically JPG or PDF). Please
        check the product listing for format details before purchasing.
      </p>
    </div>
  );
}
