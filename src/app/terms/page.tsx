import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | HeroAnimalArt',
  description: 'Terms and conditions for purchasing and using HeroAnimalArt digital products.',
};

export default function TermsPage() {
  return (
    <div className="container legal-page">
      <h1>Terms of Service</h1>

      <p>Last updated: June 30, 2026</p>

      <p>
        By accessing heroanimalart.com or purchasing a digital product, you agree to these Terms of
        Service. Please read them carefully before completing a purchase.
      </p>

      <h2>1. Digital Products</h2>
      <p>
        All products sold by HeroAnimalArt are <strong>digital downloads</strong>. Upon successful
        payment you will receive a download link via email. No physical goods will be shipped.
      </p>

      <h2>2. License — Personal Use</h2>
      <p>
        Your purchase grants you a <strong>non-exclusive, non-transferable personal license</strong> to:
      </p>
      <ul>
        <li>Print the file for personal, non-commercial home or office use</li>
        <li>Use the print in your own home or as a personal gift</li>
      </ul>
      <p>You may <strong>not</strong>:</p>
      <ul>
        <li>Resell, redistribute, or sublicense the files or prints</li>
        <li>Use the designs for commercial products (e.g., merchandise, print-on-demand)</li>
        <li>Share the digital files publicly or on file-sharing platforms</li>
        <li>Claim the artwork as your own</li>
      </ul>
      <p>
        Commercial licenses are available — contact us at <strong>emrecansari@hotmail.com</strong> for
        pricing.
      </p>

      <h2>3. Payment</h2>
      <p>
        Payments are processed securely by Polar.sh. HeroAnimalArt does not store your payment
        card details. All prices are listed in USD and include applicable taxes where required.
      </p>

      <h2>4. Refunds</h2>
      <p>
        Please review our <a href="/returns">Refund Policy</a> for full details. Digital files are
        generally non-refundable, but we will always help if there is a technical problem with
        your download.
      </p>

      <h2>5. Intellectual Property</h2>
      <p>
        All artwork, designs, images, and content on this website are the intellectual property of
        HeroAnimalArt (Emrecan Sarı) and are protected by copyright law. Unauthorized use is
        prohibited.
      </p>

      <h2>6. Limitation of Liability</h2>
      <p>
        HeroAnimalArt shall not be liable for any indirect, incidental, or consequential damages
        arising from the use or inability to use our products or website. Our maximum liability is
        limited to the amount paid for the relevant order.
      </p>

      <h2>7. Changes to Terms</h2>
      <p>
        We reserve the right to update these terms at any time. Continued use of the site after
        changes constitutes acceptance of the updated terms.
      </p>

      <h2>8. Contact</h2>
      <p>
        Questions about these terms? Email us at <strong>emrecansari@hotmail.com</strong>.
      </p>
    </div>
  );
}
