import React, { useState, useEffect, useRef } from 'react';
import { ArrowUp } from 'lucide-react';
import AccordionGallery from './AccordionGallery';

export function Footer({ onOpenContactModal }) {
  const footerRef = useRef(null);

  // Animation Phases:
  // 1. 'idle' -> Waiting for user to scroll to footer
  // 2. 'entering' -> Strictly 1-by-1 in 1 single line:
  //      - Card 1 arrives from LEFT
  //      - AFTER THAT, Card 2 arrives from RIGHT
  //      - AFTER THAT, Card 3 arrives from LEFT
  //      - AFTER THAT, Card 4 arrives from RIGHT
  //      - AFTER THAT, Card 5 arrives from LEFT
  //      - AFTER THAT, Card 6 arrives from RIGHT
  // 3. 'looping' -> All cards assembled in 1 line, smoothly gliding continuously from LEFT TO RIGHT
  const [animationPhase, setAnimationPhase] = useState('idle');

  const scrollToTop = () => {
    if (window.lenis) {
      window.lenis.scrollTo(0, { duration: 1.6 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // All cards in 1 single line (No external links)
  const allCards = [
    {
      id: 'x',
      type: 'x',
      title: 'X',
      sub: '@vaibhavguptaTF',
      btnText: 'FOLLOW ME ON X',
      icon: (
        <div className="card-top-icon x-circle-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#ffffff">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </div>
      )
    },
    {
      id: 'tg',
      type: 'telegram',
      title: 'Main Telegram',
      sub: '@cryptovaibhav',
      btnText: 'JOIN NOW',
      icon: (
        <div className="card-top-icon tg-circle-icon">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m22 2-7 20-4-9-9-4Z" />
            <path d="M22 2 11 13" />
          </svg>
        </div>
      )
    },
    {
      id: 'tg2',
      type: 'telegram-2nd',
      title: 'Secondary Telegram',
      sub: '@vaibhavguptavg',
      btnText: 'JOIN NOW',
      icon: (
        <div className="card-top-icon tg-circle-icon">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m22 2-7 20-4-9-9-4Z" />
            <path d="M22 2 11 13" />
          </svg>
        </div>
      )
    },
    {
      id: 'main-channel',
      type: 'main-channel',
      title: 'Youtube',
      sub: '',
      btnText: 'Subscribe Me on YT',
      icon: (
        <div className="card-top-icon yt-circle-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#ffffff">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
          </svg>
        </div>
      )
    },
    {
      id: 'insta',
      type: 'instagram',
      title: 'Instagram',
      sub: '@vaibhavgupta_',
      btnText: 'VIEW STORIES',
      icon: (
        <div className="card-top-icon insta-circle-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
          </svg>
        </div>
      )
    }
  ];

  const numCards = allCards.length;
  // 4 identical sets so that translateX(-50%) to translateX(0%) loops seamlessly forever
  const loopCards = [
    ...allCards,
    ...allCards,
    ...allCards,
    ...allCards
  ];

  // The set of cards in view at translateX(-50%) is exactly Copy 2 (from 2*N to 3*N - 1)
  const primaryStartIndex = 2 * numCards;
  const primaryEndIndex = 3 * numCards;

  useEffect(() => {
    let timer = null;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimationPhase((prev) => {
            if (prev === 'idle') {
              // Dynamic transition time: each card takes 0.55s + 0.65s flight duration
              const totalEntranceMs = (numCards * 550) + 650;
              timer = setTimeout(() => {
                setAnimationPhase('looping');
              }, totalEntranceMs);
              return 'entering';
            }
            return prev;
          });
        }
      },
      { threshold: 0.02, rootMargin: '0px 0px -40px 0px' }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      observer.disconnect();
      if (timer) clearTimeout(timer);
    };
  }, [numCards]);

  return (
    <footer className="creator-footer" id="contact" ref={footerRef}>


      {/* Deep Blue Ambient Nebula Glow behind the cards */}
      <div className="creator-ambient-glow" aria-hidden="true" />

      <div className="creator-footer-inner">
        {/* Section Heading: Quick Links */}
        <h2 className="creator-hero-title scroll-reveal">
          <span className="hero-title-bold">
            <span style={{
              fontSize: '2em',
              display: 'inline-block',
              lineHeight: 0.75,
              verticalAlign: 'middle',
              fontFamily: "'Dancing Script', cursive",
              fontWeight: 700,
              marginRight: '-2px'
            }}>Q</span>uick
          </span>
          <span className="hero-title-accent">Links</span>
        </h2>
      </div>

      {/* Desktop AccordionGallery — Quick Links */}
      <div className="creator-footer-inner desktop-only-gallery" style={{ paddingBottom: '2.5rem' }}>
        <AccordionGallery
          height={380}
          items={[
            { image: '/logo_x.svg', label: 'X  ·  @vaibhavguptaTF', link: '#', alt: 'X / Twitter' },
            { image: '/logo_telegram.svg', label: 'Telegram  ·  @cryptovaibhav', link: '#', alt: 'Main Telegram' },
            { image: '/logo_telegram.svg', label: 'Telegram  ·  @vaibhavguptavg', link: '#', alt: 'Secondary Telegram' },
            { image: '/logo_youtube.svg', label: 'YouTube  ·  Subscribe', link: '#', alt: 'YouTube' },
            { image: '/logo_instagram.svg', label: 'Instagram  ·  @vaibhavgupta_', link: '#', alt: 'Instagram' }
          ]}
          defaultIndex={2}
          expandRatio={0.52}
          trigger="hover"
          accentColor="#fdba74"
          overlayColor="#060010"
          textColor="#ffffff"
          grayscale
          showLabels
          duration={1.2}
          ease="power3.out"
          parallax={1.5}
          tilt={20}
          stagger={0.06}
          height={560}
          gap={15}
          radius={15}
          orientation="horizontal"
        />
      </div>

      {/* Mobile Quick Links (Vertical 1-by-1 Cards) */}
      <div className="creator-footer-inner mobile-only-quick-links" style={{ paddingBottom: '3rem' }}>
         <a href="#" className="mobile-link-card scroll-reveal-mobile-card scroll-reveal-mobile-left reveal-delay-1">
           <img src="/logo_x.svg" alt="X" className="mobile-link-icon" />
           <span className="mobile-link-text">X · @vaibhavguptaTF</span>
         </a>
         <a href="#" className="mobile-link-card scroll-reveal-mobile-card scroll-reveal-mobile-left reveal-delay-2">
           <img src="/logo_telegram.svg" alt="Telegram" className="mobile-link-icon" />
           <span className="mobile-link-text">Telegram · @cryptovaibhav</span>
         </a>
         <a href="#" className="mobile-link-card scroll-reveal-mobile-card scroll-reveal-mobile-left reveal-delay-3">
           <img src="/logo_telegram.svg" alt="Telegram" className="mobile-link-icon" />
           <span className="mobile-link-text">Telegram · @vaibhavguptavg</span>
         </a>
         <a href="#" className="mobile-link-card scroll-reveal-mobile-card scroll-reveal-mobile-left reveal-delay-4">
           <img src="/logo_youtube.svg" alt="YouTube" className="mobile-link-icon" />
           <span className="mobile-link-text">YouTube · Subscribe</span>
         </a>
         <a href="#" className="mobile-link-card scroll-reveal-mobile-card scroll-reveal-mobile-left reveal-delay-5">
           <img src="/logo_instagram.svg" alt="Instagram" className="mobile-link-icon" />
           <span className="mobile-link-text">Instagram · @vaibhavgupta_</span>
         </a>
      </div>

      <div className="creator-footer-inner">
        {/* Bottom Bar: Copyright + Scroll to top */}
        <div className="creator-bottom-bar">
          <span className="bottom-copyright">
            &copy; 2026 VAIBHAV GUPTA. ALL RIGHTS RESERVED. ZERO LIEN OTC SETTLEMENT.
          </span>
          <button
            type="button"
            onClick={scrollToTop}
            className="scroll-top-mini-btn"
            title="Scroll back to top"
            aria-label="Scroll back to top"
          >
            <ArrowUp size={14} />
          </button>
        </div>
      </div>

    </footer>
  );
}

export default Footer;
