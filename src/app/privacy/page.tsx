import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | HeroAnimalArt',
  description: 'How HeroAnimalArt collects, uses, and protects your personal data.',
};

export default function PrivacyPage() {
  return (
    <div className="container legal-page">
      <h1>Privacy Policy</h1>

      <p>Last updated: June 30, 2026</p>

      <p>
        HeroAnimalArt (&ldquo;we&rdquo;, &ldquo;our&rdquo;, &ldquo;us&rdquo;) is operated by
        Emrecan Sarı. This policy explains how we handle personal data when you visit
        heroanimalart.com or purchase a digital product.
      </p>

      <h2>1. Data We Collect</h2>
      <p>When you make a purchase we collect:</p>
      <ul>
        <li>Name and email address (for order delivery and support)</li>
        <li>Payment information — processed securely by our payment provider; we never store card details</li>
        <li>IP address and browser data collected automatically by our hosting provider</li>
      </ul>
      <p>We do <strong>not</strong> collect shipping addresses because all products are digital downloads.</p>

      <h2>2. How We Use Your Data</h2>
      <ul>
        <li>Deliver your purchased digital files</li>
        <li>Respond to support requests</li>
        <li>Send order confirmations and receipts</li>
        <li>Improve the website (aggregated, anonymous analytics only)</li>
      </ul>
      <p>We do not sell or share your personal data with third parties for marketing purposes.</p>

      <h2>3. Third-Party Services</h2>
      <p>We use the following third-party services that may process your data:</p>
      <ul>
        <li><strong>Polar.sh</strong> — payment processing and digital file delivery</li>
        <li><strong>Vercel</strong> — website hosting (logs IP addresses for security)</li>
        <li><strong>Google</strong> — analytics and advertising (see Google&apos;s privacy policy)</li>
      </ul>

      <h2>4. Cookies</h2>
      <p>
        Our website uses essential cookies for functionality and analytics cookies (Google Analytics)
        to understand how visitors use the site. You can disable non-essential cookies through your
        browser settings.
      </p>

      <h2>5. Data Retention</h2>
      <p>
        We retain order records for up to 7 years as required by applicable tax law. You may
        request deletion of your personal data at any time, subject to legal retention requirements.
      </p>

      <h2>6. Your Rights (GDPR)</h2>
      <p>If you are located in the EU/EEA, you have the right to:</p>
      <ul>
        <li>Access the personal data we hold about you</li>
        <li>Correct inaccurate data</li>
        <li>Request deletion of your data</li>
        <li>Object to processing or request restriction</li>
        <li>Lodge a complaint with your local data protection authority</li>
      </ul>
      <p>
        To exercise any of these rights, contact us at <strong>emrecansari@hotmail.com</strong>.
      </p>

      <h2>7. Contact</h2>
      <p>
        Data controller: Emrecan Sarı, HeroAnimalArt<br />
        Email: emrecansari@hotmail.com
      </p>
    </div>
  );
}
