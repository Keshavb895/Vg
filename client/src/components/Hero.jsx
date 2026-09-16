import React from 'react';
import AeroShards from './AeroShards';

export function Hero({ onOpenContactModal }) {
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
    <section className="hero-fullscreen" id="home">
      {/* React Bits AeroShards WebGPU Component - 100% Full Hero Coverage Edge-to-Edge */}
      <AeroShards
        backgroundColor="#120F17"
        shardColor="#896ABD"
        accentColor="#A855F7"
        placement="full"
        flow="stream"
        material="pearl"
        detail="balanced"
        effect="none"
        scale={1}
        spread={1}
        depth={1}
        speed={1}
        spin={1}
        interaction="repel"
        density={1.5}
        shardSize={1.1}
        stretch={1}
        turbulence={1}
        glow={1}
        edgeSoftness={2}
        bloom={0.5}
        grain={0.05}
        chromaticAberration={0.0075}
        transitionDuration={1}
        interactionRadius={1.5}
        interactionStrength={0.5}
        rippleIntensity={1}
        holdToGather
        paused={false}
      />

      {/* Minimalist, Crystal-Clear Content Overlay */}
      <div className="hero-content-overlay">
        <div className="hero-content-center">
          {/* Minimal Pill Badge */}
          <div
            className="hero-rb-badge"
            onClick={scrollToServices}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter') scrollToServices(e); }}
            title="Explore Crypto Vaibhav"
          >
            <span className="hero-rb-tag">NEW</span>
            <span className="hero-rb-badge-text">
              Crypto Vaibhav
              <svg
                className="hero-rb-badge-arrow"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </span>
          </div>

          {/* Clean, Modern Sans-Serif Headline */}
          <h1 className="hero-rb-headline">
            Welcome to The World of<br className="hero-rb-br" />
            Vaibhav Gupta...
          </h1>

          {/* Minimal Pill Action Buttons: Solid White & Translucent Indigo */}
          <div className="hero-rb-buttons">
            <button
              type="button"
              onClick={onOpenContactModal}
              className="btn-rb-primary"
              id="hero-get-started-btn"
            >
              Get started
            </button>

            <a
              href="#services"
              onClick={scrollToServices}
              className="btn-rb-secondary"
              id="hero-learn-more-btn"
            >
              Learn more
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
