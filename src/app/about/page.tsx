import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About | HeroAnimalArt',
  description: 'The story behind HeroAnimalArt — unique digital animal art prints made with passion.',
};

export default function AboutPage() {
  return (
    <div className="container legal-page">
      <h1>About HeroAnimalArt</h1>

      <p>
        HeroAnimalArt is an independent digital art studio run by Emrecan Sarı. We create bold,
        character-driven animal portraits — from regal lions to curious foxes — designed to bring
        personality and warmth to any wall.
      </p>

      <p>
        Every design is crafted as a high-resolution digital file so you can print it exactly how
        and where you want: a large canvas above the sofa, a small framed print on a shelf, or
        matching prints for a gallery wall. No waiting for shipping — download instantly and print
        locally.
      </p>

      <h2>What We Sell</h2>
      <p>
        All products are <strong>digital downloads</strong> — print-ready JPG or PDF files
        delivered to your inbox immediately after purchase. We do not sell or ship physical prints.
      </p>

      <h2>Our Style</h2>
      <p>
        We specialize in hero-style animal portraits: confident poses, rich detail, and a timeless
        quality that works in both modern and classic interiors. Each piece is designed to look as
        good at A4 as it does at 24&quot;×36&quot;.
      </p>

      <h2>Get in Touch</h2>
      <p>
        Questions, custom requests, or commercial licensing inquiries — we would love to hear from
        you. Reach us at <strong>emrecansari@hotmail.com</strong>.
      </p>
    </div>
  );
}
