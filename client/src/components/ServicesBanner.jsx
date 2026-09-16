import React from 'react';
import { ArrowRight } from 'lucide-react';
import TrueFocus from './TrueFocus';
import ScrollStack, { ScrollStackItem } from './ScrollStack';
import tfExchangeLogo from '../assets/tf-p2p-3d.jpg';
import tfVerseLogo from '../assets/tf-verse-logo.jpg';

export function ServicesBanner({ onOpenContactModal }) {
  return (
    <section className="services-section" id="services">
      <div className="services-inner">

        {/* Section Header */}
        <div className="services-header-wrapper">
          <div className="services-title-center">
            <TrueFocus
              sentence="OUR SERVICES"
              manualMode
              blurAmount={2.5}
              borderColor="#6e70d7"
              glowColor="rgba(110, 112, 215, 0.6)"
              animationDuration={0.5}
              pauseBetweenAnimations={1}
            />
          </div>
        </div>

        {/* ScrollStack: Multi-card stack that pins, stacks, and scales on scroll */}
        <ScrollStack
          itemScale={0.045}
          itemStackDistance={42}
          stackPosition={88}
          baseScale={0.88}
        >
          {/* Card 01 — TF P2P Desk */}
          <ScrollStackItem itemClassName="service-scroll-card card-theme-p2p">
            <div className="service-card-watermark font-mono" aria-hidden="true">01</div>
            <div className="service-card-ambient-glow glow-p2p" aria-hidden="true" />

            <div className="single-card-grid">
              <div className="single-card-left">
                <h3 className="service-card-title">
                  TF <span className="gradient-text-blue">P2P</span>
                </h3>

                <p className="service-card-desc">
                  Experience Vaibhav Gupta&apos;s premier institutional &amp; retail P2P liquidity service. Safe, swift crypto-to-fiat conversion backed by 100% verified banking channels with absolute zero freeze risk.
                </p>

                {/* Minimal Features Dash List */}
                <div className="service-features-block">
                  <div className="features-block-label">FEATURES</div>
                  <div className="features-dash-list">
                    <div className="features-dash-item">
                      <span className="feature-dash">—</span>
                      <span className="feature-text">Crypto Tax Filing</span>
                    </div>
                    <div className="features-dash-item">
                      <span className="feature-dash">—</span>
                      <span className="feature-text">Free Tax Consultation</span>
                    </div>
                    <div className="features-dash-item">
                      <span className="feature-dash">—</span>
                      <span className="feature-text">24/7 Support</span>
                    </div>
                    <div className="features-dash-item">
                      <span className="feature-dash">—</span>
                      <span className="feature-text">Minimal Cost</span>
                    </div>
                    <div className="features-dash-item">
                      <span className="feature-dash">—</span>
                      <span className="feature-text">Personal Tax Assistant</span>
                    </div>
                  </div>
                </div>

                <div className="single-card-footer">
                  <button
                    type="button"
                    className="service-card-btn btn-p2p"
                    id="p2p-access-btn"
                    onClick={() => onOpenContactModal && onOpenContactModal('p2p')}
                  >
                    <span>ACCESS P2P DESK</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>

              <div className="single-card-right">
                <div className="single-card-img-wrapper border-blue">
                  <img src={tfExchangeLogo} alt="TF Exchange P2P Official" className="single-card-img" />
                </div>
              </div>
            </div>
          </ScrollStackItem>

          {/* Card 02 — TF Verse */}
          <ScrollStackItem itemClassName="service-scroll-card card-theme-verse">
            <div className="service-card-watermark font-mono" aria-hidden="true">02</div>
            <div className="service-card-ambient-glow glow-verse" aria-hidden="true" />

            <div className="single-card-grid">
              <div className="single-card-left">
                <h3 className="service-card-title">
                  TF <span className="gradient-text-purple">Verse</span>
                </h3>

                <p className="service-card-desc">
                  Step into Vaibhav Gupta&apos;s exclusive Web3 ecosystem. Gain unfair market advantage with high-conviction token calls, early seed allocations, vetted airdrop radars, and direct private mastermind access.
                </p>

                {/* Minimal Features Dash List */}
                <div className="service-features-block">
                  <div className="features-block-label">FEATURES</div>
                  <div className="features-dash-list">
                    <div className="features-dash-item">
                      <span className="feature-dash">—</span>
                      <span className="feature-text">High-Conviction Alpha</span>
                    </div>
                    <div className="features-dash-item">
                      <span className="feature-dash">—</span>
                      <span className="feature-text">Free Market Masterclass</span>
                    </div>
                    <div className="features-dash-item">
                      <span className="feature-dash">—</span>
                      <span className="feature-text">24/7 VIP Community</span>
                    </div>
                    <div className="features-dash-item">
                      <span className="feature-dash">—</span>
                      <span className="feature-text">Early Seed Allocations</span>
                    </div>
                    <div className="features-dash-item">
                      <span className="feature-dash">—</span>
                      <span className="feature-text">Personal Alpha Mentor</span>
                    </div>
                  </div>
                </div>

                <div className="single-card-footer">
                  <button
                    type="button"
                    className="service-card-btn btn-verse"
                    id="verse-join-btn"
                    onClick={() => onOpenContactModal && onOpenContactModal('tfverse')}
                  >
                    <span>JOIN TF VERSE</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>

              <div className="single-card-right">
                <div className="single-card-img-wrapper border-purple">
                  <img src={tfVerseLogo} alt="TF Verse Official Logo" className="single-card-img" />
                </div>
              </div>
            </div>
          </ScrollStackItem>

          {/* Card 03 — More Services Coming... */}
          <ScrollStackItem itemClassName="service-scroll-card card-theme-coming-soon">
            <div className="coming-soon-ambient" aria-hidden="true" />
            <div className="coming-soon-content">
              <h3 className="coming-soon-text">More Services Coming...</h3>
            </div>
          </ScrollStackItem>
        </ScrollStack>

      </div>
    </section>
  );
}

export default ServicesBanner;
