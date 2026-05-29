'use client';

import React, { useState, useMemo } from 'react';
import ProductCard from '@/components/ProductCard';
import { products } from '@/data/products';
import { 
  ArrowRight, 
  Download, 
  ShieldCheck, 
  Hammer, 
  Star, 
  HelpCircle, 
  ChevronDown 
} from 'lucide-react';
import Insights from '@/components/Insights';

// Project Savings Data definition
interface ProjectSaving {
  id: string;
  name: string;
  retailPrice: number;
  baseDiyPrice: number;
  difficulty: string;
  timeEstimate: string;
}

const PROJECT_SAVINGS: Record<string, ProjectSaving> = {
  'cart-sink': {
    id: 'cart-sink',
    name: 'DIY Mobile Coffee Cart with Sink (Fluted)',
    retailPrice: 3450,
    baseDiyPrice: 350,
    difficulty: 'Moderate',
    timeEstimate: '1.5 Weekends'
  },
  'farmstand-4door': {
    id: 'farmstand-4door',
    name: 'Secure 4-Door Roadside Farmstand',
    retailPrice: 4200,
    baseDiyPrice: 450,
    difficulty: 'Intermediate',
    timeEstimate: '2 Weekends'
  },
  'bar-folding': {
    id: 'bar-folding',
    name: 'Mobile Folding Outdoor Bar Cart',
    retailPrice: 2800,
    baseDiyPrice: 280,
    difficulty: 'Easy / Beginner',
    timeEstimate: '1 Weekend'
  }
};

export default function Home() {
  // Tabs State
  const [activeTab, setActiveTab] = useState<'ALL' | 'BARS' | 'STANDS' | 'GARDEN'>('ALL');
  
  // Savings Calculator State
  const [selectedProjectId, setSelectedProjectId] = useState<string>('cart-sink');
  const [lumberMultiplier, setLumberMultiplier] = useState<number>(1.0);

  // FAQ State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Filtered Products Logic
  const filteredProducts = useMemo(() => {
    if (activeTab === 'ALL') return products.slice(0, 8);
    if (activeTab === 'BARS') return products.filter(p => p.category === 'Custom food cart').slice(0, 8);
    if (activeTab === 'STANDS') return products.filter(p => p.category === 'DIY Farmstand').slice(0, 8);
    if (activeTab === 'GARDEN') return products.filter(p => p.category === 'Carpenter Bee Trap').slice(0, 8);
    return products.slice(0, 8);
  }, [activeTab]);

  // Calculator Savings Calculation
  const selectedProject = PROJECT_SAVINGS[selectedProjectId];
  const calculatedDiyCost = Math.round(selectedProject.baseDiyPrice * lumberMultiplier);
  const netSavings = selectedProject.retailPrice - calculatedDiyCost;

  // FAQ toggle handler
  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="hero container">
        <div className="hero-content animate-fade-in">
          <div className="hero-badge">ESSENTIALS — COLLECTION 01</div>
          <h1 className="hero-title">
            Build Your Own<br />Masterpieces
          </h1>
          <p className="hero-desc">
            Download highly detailed blueprints and step-by-step guides. Build custom event coffee carts, roadside farmstands, and beautiful woodwork with ease.
          </p>
          <div className="hero-actions">
            <a href="/products" className="btn btn-primary">
              BROWSE PLANS
            </a>
            <a href="#testimonials" className="btn btn-secondary">
              READ REVIEWS
            </a>
          </div>
        </div>
        <div className="hero-image-wrapper" style={{ borderRadius: '8px' }}>
          <img 
            src="/hero.png" 
            alt="Great Wooden DIY Plans" 
            className="hero-image"
          />
        </div>
      </section>

      {/* Featured Products Showcase (Interactive Tabs Showcase) */}
      <section className="section container">
        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 3rem auto' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 500, marginBottom: '1rem', letterSpacing: '-0.02em' }}>Craft Your Masterpiece</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem' }}>
            Select a project category below to discover premium build blueprints ready for instant download.
          </p>
        </div>

        {/* Dynamic Category Tabs */}
        <div className="showcase-tabs">
          <button 
            className={`showcase-tab ${activeTab === 'ALL' ? 'active' : ''}`}
            onClick={() => setActiveTab('ALL')}
          >
            All Blueprints
          </button>
          <button 
            className={`showcase-tab ${activeTab === 'BARS' ? 'active' : ''}`}
            onClick={() => setActiveTab('BARS')}
          >
            Coffee Carts &amp; Bars
          </button>
          <button 
            className={`showcase-tab ${activeTab === 'STANDS' ? 'active' : ''}`}
            onClick={() => setActiveTab('STANDS')}
          >
            Roadside Farmstands
          </button>
          <button 
            className={`showcase-tab ${activeTab === 'GARDEN' ? 'active' : ''}`}
            onClick={() => setActiveTab('GARDEN')}
          >
            Outdoor &amp; Garden
          </button>
        </div>
        
        {/* Dynamic Product Grid with Animation wrapper */}
        <div className="products-grid-container fade-in-scale" key={activeTab}>
          <div className="products-grid">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
        
        <div style={{ textAlign: 'center', marginTop: '4rem' }}>
          <a href="/products" className="btn btn-secondary" style={{ padding: '0.75rem 3rem' }}>
            View Full Catalog ({products.length} Plans)
          </a>
        </div>
      </section>

      {/* Shop By Category Section */}
      <section className="section container" style={{ borderTop: '1px solid var(--border-color)', paddingTop: '5rem' }}>
        <div className="section-header">
          <h2 className="section-title">Explore by Category</h2>
          <a href="/products" className="section-link">All Blueprints <ArrowRight size={16} /></a>
        </div>
        
        <div className="category-grid">
          <a href="/products?category=food-cart" className="category-card">
            <img 
              src="https://i.etsystatic.com/62574134/r/il/d4b5dc/7857156877/il_fullxfull.7857156877_31d9.jpg" 
              alt="Mobile Coffee Carts & Food Bars" 
              className="category-card-img"
            />
            <div className="category-card-info">
              <h3 className="category-card-title">Bars &amp; Coffee Carts</h3>
              <span className="category-card-link">Browse Plans</span>
            </div>
          </a>

          <a href="/products?category=farmstand" className="category-card">
            <img 
              src="https://i.etsystatic.com/62574134/r/il/3ca954/7902221795/il_fullxfull.7902221795_oq01.jpg" 
              alt="Roadside Produce & Egg Farmstands" 
              className="category-card-img"
            />
            <div className="category-card-info">
              <h3 className="category-card-title">Roadside Farmstands</h3>
              <span className="category-card-link">Browse Plans</span>
            </div>
          </a>

          <a href="/products?category=bee-trap" className="category-card">
            <img 
              src="https://i.etsystatic.com/62574134/r/il/7f2880/7941130888/il_fullxfull.7941130888_dqn4.jpg" 
              alt="Carpenter Bee Traps" 
              className="category-card-img"
            />
            <div className="category-card-info">
              <h3 className="category-card-title">Bee Trap Catchers</h3>
              <span className="category-card-link">Browse Plans</span>
            </div>
          </a>

          <a href="/products" className="category-card">
            <img 
              src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=1000" 
              alt="All Woodworking Blueprints" 
              className="category-card-img"
            />
            <div className="category-card-info">
              <h3 className="category-card-title">All Blueprints</h3>
              <span className="category-card-link">Browse All</span>
            </div>
          </a>
        </div>
      </section>

      {/* Interactive Homestead Savings Calculator Section */}
      <section className="container">
        <div className="calc-section">
          <div className="calc-grid">
            <div className="calc-content">
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#a3e635', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: '0.75rem' }}>
                🧮 Interactive Cost Analyzer
              </span>
              <h2 style={{ fontSize: '2.5rem', fontWeight: 500, color: '#ffffff', marginBottom: '1.5rem', letterSpacing: '-0.02em', lineHeight: '1.1' }}>
                Calculate Your DIY Savings
              </h2>
              <p style={{ color: '#bbbbbc', fontSize: '1rem', lineHeight: '1.6', marginBottom: '2.5rem', maxWidth: '580px' }}>
                Commercial fabricators charge high markups for catering carts and enclosed farmstands. Pick a custom project, adjust the local lumber cost index, and see how much your workshop pocketbook will save.
              </p>

              <div className="calc-controls">
                {/* Select Project Dropdown */}
                <div className="calc-group">
                  <label className="calc-label">Choose Your Project</label>
                  <select 
                    className="calc-select" 
                    value={selectedProjectId}
                    onChange={(e) => setSelectedProjectId(e.target.value)}
                  >
                    <option value="cart-sink">Mobile Coffee Cart with Sink (Commercial Style)</option>
                    <option value="farmstand-4door">Secure 4-Door Enclosed Homestead Farmstand</option>
                    <option value="bar-folding">Mobile Folding Outdoor Entertaining Beverage Bar</option>
                  </select>
                </div>

                {/* Adjust Lumber Cost Index */}
                <div className="calc-group">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <label className="calc-label">Local Lumber Price Index</label>
                    <span style={{ fontSize: '0.85rem', color: '#ffffff', fontWeight: 500 }}>
                      {lumberMultiplier === 1.0 ? 'Normal / Standard' : `${Math.round(lumberMultiplier * 100)}% Cost`}
                    </span>
                  </div>
                  <div className="calc-slider-container">
                    <input 
                      type="range" 
                      className="calc-slider"
                      min="0.8" 
                      max="1.8" 
                      step="0.1" 
                      value={lumberMultiplier}
                      onChange={(e) => setLumberMultiplier(parseFloat(e.target.value))}
                    />
                    <span className="calc-slider-value">x{lumberMultiplier.toFixed(1)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Dashboard Display Card */}
            <div className="calc-results">
              <div className="calc-savings-badge">
                💰 Estimated Net Savings
              </div>
              <div className="calc-savings-val">
                <span className="calc-savings-currency">$</span>
                {netSavings.toLocaleString()}
              </div>

              <div className="calc-breakdown">
                <div className="calc-row">
                  <span>Pre-Built Retail Store Cost:</span>
                  <span>${selectedProject.retailPrice.toLocaleString()}</span>
                </div>
                <div className="calc-row">
                  <span>Estimated DIY Materials Cost:</span>
                  <span style={{ color: '#ffffff' }}>${calculatedDiyCost.toLocaleString()}</span>
                </div>
                <div className="calc-row" style={{ borderTop: '1px dashed #2d2d34', paddingTop: '0.75rem', marginTop: '0.25rem' }}>
                  <span>Required Skills Level:</span>
                  <span style={{ color: '#a3e635', fontWeight: 600 }}>{selectedProject.difficulty}</span>
                </div>
                <div className="calc-row">
                  <span>Time Commitment:</span>
                  <span>{selectedProject.timeEstimate}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Builders Choose Us Section */}
      <section style={{ borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)', padding: '0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '650px' }}>
          <div style={{ padding: '6rem 4rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '2.5rem', fontWeight: 500, letterSpacing: '-0.02em' }}>Precision Workshop Blueprint Standards</h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginBottom: '3rem' }}>
              <div>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 500, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>📏 Imperial &amp; Metric Side-by-Side</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem', lineHeight: '1.6' }}>
                  No more conversion calculation headaches. Every woodworking blueprint includes complete dimensions in both inches (Imperial) and millimeters (Metric).
                </p>
              </div>
              
              <div>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 500, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>🪵 Wood Cut Sheet Optimization</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem', lineHeight: '1.6' }}>
                  Save money at the lumber yard. Our detailed plans provide itemized material lists and optimized cut plans to maximize wood yield and eliminate waste.
                </p>
              </div>

              <div>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 500, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>📐 Exploded 3D Visual Assembly</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem', lineHeight: '1.6' }}>
                  Step-by-step CAD drawings and isometric exploded diagrams guide you smoothly from base structure framing to final cosmetic touchups.
                </p>
              </div>
            </div>
            
            <div>
              <a href="/products" className="btn btn-primary">
                DOWNLOAD BLUEPRINTS
              </a>
            </div>
          </div>
          <div style={{ borderLeft: '1px solid var(--border-color)', position: 'relative' }}>
            <img 
              src="https://images.unsplash.com/photo-1455729552865-3ef58a362917?auto=format&fit=crop&q=80&w=1000" 
              alt="Hand-crafted wood sanding details" 
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="section container" style={{ paddingTop: '5rem', paddingBottom: '5rem' }}>
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 4rem auto' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 500, marginBottom: '1rem', letterSpacing: '-0.02em' }}>Easy 3-Step Process</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem' }}>
            From high-resolution digital download to fully completed masterpieces. Here is how we make custom DIY accessible.
          </p>
        </div>
        
        <div className="steps-grid">
          <div className="step-card">
            <div className="step-number">01</div>
            <h3 className="step-title">Select Your Plan</h3>
            <p className="step-desc">
              Browse our catalog of professional designs, from event coffee carts and roadside farmstands to home furniture.
            </p>
          </div>

          <div className="step-card">
            <div className="step-number">02</div>
            <h3 className="step-title">Instant PDF Download</h3>
            <p className="step-desc">
              Get immediate access to highly detailed CAD blueprints, precise cut lists, and itemized material sheets right after checkout.
            </p>
          </div>

          <div className="step-card">
            <div className="step-number">03</div>
            <h3 className="step-title">Build With Confidence</h3>
            <p className="step-desc">
              Follow our clear step-by-step 3D assembly visual instructions to craft a premium-grade custom structure you'll be proud of.
            </p>
          </div>
        </div>
      </section>

      {/* Bestseller Spotlight Banner Section (Split Spotlight Showcase) */}
      <section className="spotlight-section">
        <div className="container">
          <div className="spotlight-grid">
            {/* Left side: Blueprint Mockup */}
            <div className="spotlight-blueprint-wrapper">
              <img 
                src="https://i.etsystatic.com/62574134/r/il/320885/7929536095/il_fullxfull.7929536095_fq7w.jpg" 
                alt="Mobile Espresso Coffee Cart Blueprint Mockup" 
                className="spotlight-blueprint-img"
              />
            </div>
            
            {/* Right side: Information */}
            <div className="spotlight-info">
              <div className="spotlight-badge">
                🏆 Bestseller Blueprint
              </div>
              <h2 className="spotlight-title">
                Mobile Espresso Coffee Cart with Sink
              </h2>
              <p className="spotlight-description">
                Our #1 ranked woodworking blueprint. Crafted alongside commercial baristas, it integrates a built-in drop-in handsink, enclosed plumbing base, fluted designer wood slat exterior, and expanding folding wings extending up to 85 inches. Perfect to launch a premium pop-up business.
              </p>

              <div className="spotlight-features">
                <div className="spotlight-feature-item">
                  <Download className="spotlight-feature-icon" size={18} />
                  <div className="spotlight-feature-text">
                    <h4>Instant Email Delivery</h4>
                    <p>Get high-resolution PDF download links in your inbox instantly.</p>
                  </div>
                </div>

                <div className="spotlight-feature-item">
                  <ShieldCheck className="spotlight-feature-icon" size={18} />
                  <div className="spotlight-feature-text">
                    <h4>Fully Compliant Layout</h4>
                    <p>Designed to fit standard health department portable wash sink codes.</p>
                  </div>
                </div>

                <div className="spotlight-feature-item">
                  <Hammer className="spotlight-feature-icon" size={18} />
                  <div className="spotlight-feature-text">
                    <h4>Beginner Friendly Guide</h4>
                    <p>Detailed itemized fastener shopping lists and 3D exploded angles.</p>
                  </div>
                </div>

                <div className="spotlight-feature-item">
                  <Star className="spotlight-feature-icon" size={18} fill="currentColor" />
                  <div className="spotlight-feature-text">
                    <h4>5.0 Star Rated Blueprint</h4>
                    <p>Voted the most pristine wood yield coffee cart plan of 2026.</p>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <a href="/products/3" className="btn btn-primary" style={{ padding: '0.85rem 2.5rem' }}>
                  DOWNLOAD PLAN ($19.00)
                </a>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  Dual Metric &amp; Imperial Included
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Happy Builders Testimonials */}
      <section className="section container" id="testimonials" style={{ borderTop: '1px solid var(--border-color)', paddingTop: '5rem' }}>
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 4rem auto' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 500, marginBottom: '1rem', letterSpacing: '-0.02em' }}>Happy Builders</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem' }}>
            Hear from DIY makers, homesteaders, and event managers who built their dreams using our plans.
          </p>
        </div>

        <div className="testimonials-grid">
          <div className="testimonial-card">
            <div>
              <div className="testimonial-stars">
                {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="var(--text-primary)" stroke="none" />)}
              </div>
              <p className="testimonial-text">
                "The precision in the Coffee Cart plans is unmatched. The cut list saved me over $100 in materials. Highly recommended!"
              </p>
            </div>
            <div className="testimonial-author">
              <span className="author-name">Julian M.</span>
              <span className="author-role">Verified Builder</span>
            </div>
          </div>

          <div className="testimonial-card">
            <div>
              <div className="testimonial-stars">
                {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="var(--text-primary)" stroke="none" />)}
              </div>
              <p className="testimonial-text">
                "Built the 4-Door Farmstand in one weekend. The diagrams are crystal clear, and our driveway egg and honey sales have doubled!"
              </p>
            </div>
            <div className="testimonial-author">
              <span className="author-name">Sarah L.</span>
              <span className="author-role">Homestead Owner</span>
            </div>
          </div>

          <div className="testimonial-card">
            <div>
              <div className="testimonial-stars">
                {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="var(--text-primary)" stroke="none" />)}
              </div>
              <p className="testimonial-text">
                "Outstanding builder support. Had a quick question about caster wheel brackets and got a helpful reply in minutes. Perfect!"
              </p>
            </div>
            <div className="testimonial-author">
              <span className="author-name">Robert H.</span>
              <span className="author-role">Event Rental Manager</span>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive FAQ Accordion Section */}
      <section className="section container" style={{ borderTop: '1px solid var(--border-color)', paddingTop: '5rem' }}>
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 2rem auto' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 500, marginBottom: '1rem', letterSpacing: '-0.02em' }}>Common Builder Questions</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem' }}>
            Everything you need to know about our digital woodworking blueprints.
          </p>
        </div>

        <div className="faq-accordion-container">
          {[
            {
              question: "What format are the plans in and how do I receive them?",
              answer: "All our plans are high-resolution, instant digital PDF downloads. Immediately after your secure checkout, you will receive an automatic download link in your email. You can save, open, and view them on any iPad, tablet, smartphone, or laptop, or print them at a local office supply shop."
            },
            {
              question: "Do the blueprints support metric or imperial dimensions?",
              answer: "Yes, side-by-side! To support DIY builders globally, every single measurement list and visual diagram includes both inches (Imperial) and millimeters (Metric) side-by-side, removing any conversion guesswork from your build."
            },
            {
              question: "Do you provide exact shopping lists and lumber cut sheets?",
              answer: "Absolutely. Every plan contains an itemized material checklist specifying the exact amount of wood, screws, hinge brackets, casters, and paint. An optimized lumber cut guide is also provided to minimize board waste and save money at checkout."
            },
            {
              question: "What tools are required? Do I need a professional woodshop?",
              answer: "Not at all. All plans are engineered with standard home tool compatibility in mind. You only need basic tools: a miter saw or circular saw, a power drill, a tape measure, clamps, sandpaper, and protective gear."
            }
          ].map((item, index) => (
            <div key={index} className={`faq-item ${openFaqIndex === index ? 'open' : ''}`}>
              <button 
                className="faq-trigger" 
                onClick={() => toggleFaq(index)}
              >
                <span>{item.question}</span>
                <ChevronDown className="faq-trigger-icon" size={18} />
              </button>
              <div className="faq-content">
                <p>{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Rebranded Workshop Insights Section */}
      <Insights />

      {/* Newsletter Section */}
      <section className="section container" style={{ borderTop: '1px solid var(--border-color)', paddingTop: '5rem' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
          <h2 className="section-title" style={{ marginBottom: '1rem', fontSize: '1.5rem', display: 'block', textAlign: 'center' }}>Join the Workshop Journal</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
            Sign up to receive notes on woodworking designs, exclusive plan releases, and lumber optimization tutorial content.
          </p>
          <div style={{ display: 'flex', gap: '0', borderBottom: '1px solid var(--text-primary)', paddingBottom: '0.5rem' }}>
            <input 
              type="email" 
              placeholder="Email address" 
              style={{ flex: 1, padding: '0.5rem 0', background: 'transparent', border: 'none', outline: 'none', color: 'var(--text-primary)' }}
            />
            <button style={{ textTransform: 'uppercase', fontSize: '0.75rem', fontWeight: 500, letterSpacing: '0.05em' }}>
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Trust Badges Banner */}
      <section className="trust-banner">
        <div className="container">
          <div className="trust-grid">
            <div className="trust-item">
              <Download size={24} strokeWidth={1} />
              <h3 className="trust-title">Instant Access</h3>
              <p className="trust-desc">Get your digital PDF plans directly in your inbox immediately after payment.</p>
            </div>
            
            <div className="trust-item">
              <ShieldCheck size={24} strokeWidth={1} />
              <h3 className="trust-title">Verified Designs</h3>
              <p className="trust-desc">All blueprints are structurally verified and double-checked for perfect alignment.</p>
            </div>

            <div className="trust-item">
              <Hammer size={24} strokeWidth={1} />
              <h3 className="trust-title">Lumber-Saving</h3>
              <p className="trust-desc">Optimized cut patterns designed to prevent wood waste and save up to 30% on costs.</p>
            </div>

            <div className="trust-item">
              <HelpCircle size={24} strokeWidth={1} />
              <h3 className="trust-title">Builder Support</h3>
              <p className="trust-desc">Stuck during your build? Contact our workshop team anytime for 24/7 technical help.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
