import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Bizilla Studio',
  description: 'How we collect, use, and protect your personal data at Bizilla Studio.',
};

export default function PrivacyPage() {
  return (
    <div className="container legal-page">
      <h1>Privacy Policy</h1>
      
      <p>Last updated: May 06, 2026</p>

      <h2>1. Information We Collect</h2>
      <p>
        We collect information that you provide directly to us, such as when you create an account, 
        make a purchase, or contact our support team. This may include your name, email address, 
        shipping address, and payment information.
      </p>

      <h2>2. How We Use Your Information</h2>
      <p>We use the information we collect to:</p>
      <ul>
        <li>Process and fulfill your orders</li>
        <li>Communicate with you about your account and purchases</li>
        <li>Improve our website and customer service</li>
        <li>Send you marketing communications (if you have opted in)</li>
      </ul>

      <h2>3. Data Protection</h2>
      <p>
        We implement a variety of security measures to maintain the safety of your personal information. 
        Your personal data is contained behind secured networks and is only accessible by a limited 
        number of persons who have special access rights.
      </p>

      <h2>4. Cookies</h2>
      <p>
        Our website uses cookies to enhance your browsing experience. You can choose to disable 
        cookies through your browser settings, though some features of the site may not function properly.
      </p>

      <h2>5. Your Rights</h2>
      <p>
        You have the right to access, correct, or delete your personal information. Please contact 
        us if you wish to exercise these rights.
      </p>
    </div>
  );
}
