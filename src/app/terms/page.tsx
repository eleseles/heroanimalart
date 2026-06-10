import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | HeroAnimalArt',
  description: 'Our terms and conditions for using the HeroAnimalArt website and services.',
};

export default function TermsPage() {
  return (
    <div className="container legal-page">
      <h1>Terms of Service</h1>
      
      <p>Last updated: May 06, 2026</p>

      <h2>1. Introduction</h2>
      <p>
        Welcome to HeroAnimalArt. By accessing our website, you agree to be bound by these Terms of Service. 
        If you disagree with any part of the terms, you may not access our services.
      </p>

      <h2>2. Intellectual Property</h2>
      <p>
        The content, layout, design, data, databases and graphics on this website are protected by intellectual 
        property laws. You may not reproduce, download, transmit or re-use any part of the website without 
        our express written consent.
      </p>

      <h2>3. User Conduct</h2>
      <p>Users are expected to use the website responsibly. Prohibited activities include:</p>
      <ul>
        <li>Attempting to interfere with the proper working of the site</li>
        <li>Using automated systems to extract data (scraping)</li>
        <li>Uploading malicious code or viruses</li>
      </ul>

      <h2>4. Limitation of Liability</h2>
      <p>
        HeroAnimalArt shall not be liable for any indirect, incidental, or consequential damages resulting 
        from the use or inability to use our services.
      </p>

      <h2>5. Changes to Terms</h2>
      <p>
        We reserve the right to modify these terms at any time. Your continued use of the site following 
        any changes constitutes acceptance of the new terms.
      </p>
    </div>
  );
}
