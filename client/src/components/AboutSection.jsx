import React, { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import vaibhavSketchPortrait from '../assets/vaibhav-sketch-portrait.jpg';
import TiltedCard from './TiltedCard';
import './AboutSection.css';

export function AboutSection() {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth < 768;
  });

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scrollToServices = (e) => {
    e.preventDefault();
    const servicesEl = document.getElementById('services');
    if (servicesEl) {
      if (window.lenis) {
        window.lenis.scrollTo(servicesEl, { offset: -70, duration: 1.4 });
      } else {
        servicesEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="about-section" id="about">
      {/* Subtle ambient lighting and grid pattern */}
      <div className="about-ambient-glow" aria-hidden="true" />
      <div className="about-dot-grid" aria-hidden="true" />

      <div className="about-inner">
        {/* Two-Column Responsive Showcase Grid */}
        <div className="about-grid">
          {/* Left Column: Expressive Typography, Stats & Action Button */}
          <div className="about-left-col scroll-reveal">
            {/* High-Impact Headline with Flowing Script */}
            <h2 className="about-hero-headline">
              Helping people to{' '}
              <span className="accent-goals">achieve</span>{' '}their goals
              <br />
              with help of{' '}
              <span className="accent-crypto">crypto</span>.
            </h2>

            {/* Influencer Mission & Bio */}
            <p className="about-bio-description">
              Your ultimate crypto advantage. We help thousands unlock deep liquidity, claim exclusive airdrops, and find the market's best-kept secrets before they go mainstream.
            </p>

            {/* Credibility Stats Strip on top of Explore Services */}
            <div className="about-stats-strip">
              <div className="about-stat-item">
                <div className="about-stat-number">50K+</div>
                <div className="about-stat-label">Community Traders</div>
              </div>
              <div className="about-stat-divider" />
              <div className="about-stat-item">
                <div className="about-stat-number">0%</div>
                <div className="about-stat-label">Bank Freeze Risk</div>
              </div>
            </div>

            {/* Action Buttons Row */}
            <div className="about-actions-row">
              <a
                href="#services"
                onClick={scrollToServices}
                className="about-btn-primary"
                id="about-explore-work-btn"
              >
                <span>Our Services</span>
                <div className="btn-arrow-circle">
                  <ArrowRight size={14} />
                </div>
              </a>
            </div>
          </div>

          {/* Right Column: Portrait Card (Tilted 3D on desktop, clean static on mobile) */}
          <div className="about-right-col scroll-reveal-3d">
            <div className="about-portrait-card-wrapper">
              {isMobile ? (
                /* Non-Tilted Clean Static Photo Card for Mobile */
                <div className="about-mobile-portrait-card">
                  <img
                    src={vaibhavSketchPortrait}
                    alt="Vaibhav Gupta - Web3 & P2P Specialist"
                    className="about-mobile-portrait-img"
                  />
                </div>
              ) : (
                /* 3D Tilted Card for Desktop */
                <TiltedCard
                  imageSrc={vaibhavSketchPortrait}
                  altText="Vaibhav Gupta - Web3 & P2P Specialist"
                  captionText="Vaibhav Gupta · P2P & Crypto Mentor"
                  containerWidth="100%"
                  containerHeight="420px"
                  imageWidth="100%"
                  imageHeight="420px"
                  rotateAmplitude={12}
                  scaleOnHover={1.05}
                  showMobileWarning={false}
                  showTooltip
                />
              )}

              {/* Author Caption Plate Below Card */}
              <div className="portrait-caption-box">
                <div className="caption-name-row">
                  <h3 className="portrait-author-name">Vaibhav Gupta</h3>
                  <span className="verified-check" title="Verified Influencer & P2P Desk">
                    <CheckCircle2 size={18} fill="#2563eb" color="#ffffff" />
                  </span>
                </div>
                <p className="portrait-author-title">
                  P2P <span className="title-spacer" /> Crypto Mentor
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
