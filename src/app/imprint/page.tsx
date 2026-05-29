import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Imprint | Great Wooden',
  description: 'Legal information about Great Wooden.',
};

export default function ImprintPage() {
  return (
    <div className="container legal-page">
      <h1>Imprint</h1>
      
      <h2>Contact Information</h2>
      <p>
        Great Wooden GmbH<br />
        Minimalstrasse 12<br />
        10115 Berlin, Germany
      </p>
      
      <p>
        Email: hello@luminastudio.com<br />
        Phone: +49 (0) 30 123 456 78
      </p>

      <h2>Authorized Representatives</h2>
      <p>Max Mustermann, CEO</p>

      <h2>Registry Information</h2>
      <p>
        Commercial Register: Amtsgericht Charlottenburg<br />
        Registration Number: HRB 123456 B
      </p>

      <h2>VAT Identification Number</h2>
      <p>DE 123 456 789</p>

      <h2>Dispute Resolution</h2>
      <p>
        The European Commission provides a platform for online dispute resolution (OS), 
        available at: https://ec.europa.eu/consumers/odr. We are neither obligated 
        nor willing to participate in a dispute resolution procedure before a consumer 
        arbitration board.
      </p>
    </div>
  );
}
