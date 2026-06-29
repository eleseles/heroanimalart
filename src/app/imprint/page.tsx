import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Imprint | HeroAnimalArt',
  description: 'Legal information and contact details for HeroAnimalArt.',
};

export default function ImprintPage() {
  return (
    <div className="container legal-page">
      <h1>Imprint</h1>

      <h2>Responsible for Content</h2>
      <p>
        Emrecan Sarı<br />
        HeroAnimalArt<br />
        Istanbul, Turkey
      </p>

      <h2>Contact</h2>
      <p>
        Email: emrecansari@hotmail.com<br />
        Phone: +90 554 861 83 53
      </p>

      <h2>Dispute Resolution</h2>
      <p>
        The European Commission provides a platform for online dispute resolution (ODR) at{' '}
        <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer">
          https://ec.europa.eu/consumers/odr
        </a>. We are not obligated or willing to participate in dispute resolution proceedings
        before a consumer arbitration board.
      </p>

      <h2>Disclaimer</h2>
      <p>
        All digital products are provided for personal use only. Redistribution, resale, or
        commercial use of downloaded files is not permitted without prior written consent.
      </p>
    </div>
  );
}
