import React, { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { ServicesBanner } from './components/ServicesBanner';
import { CommunitySays } from './components/CommunitySays';
import { Footer } from './components/Footer';
import { ContactModal } from './components/ContactModal';
import { useScrollReveal } from './hooks/useScrollReveal';
import SplashCursor from './components/SplashCursor';

export function App() {
  const [contactModalOpen, setContactModalOpen] = useState(false);

  // Initialize kinetic 3D scroll reveal physics
  useScrollReveal(true);

  // Initialize Ultra-Smooth Inertial Scroll & Section Scroll Lightening
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.1,
      touchMultiplier: 1.8,
      infinite: false,
    });

    window.lenis = lenis;

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    let isUpdating = false;
    const updateAllSectionsFade = () => {
      if (isUpdating) return;
      isUpdating = true;

      requestAnimationFrame(() => {
        const sections = Array.from(document.querySelectorAll('.hero-fullscreen, .about-section, .services-section, .community-section'));

        const measurements = sections.map(sec => {
          return { sec, rect: sec.getBoundingClientRect() };
        });

        measurements.forEach(({ sec, rect }) => {
          const progress = rect.top >= 0
            ? 0
            : Math.min(1, Math.max(0, -rect.top / Math.max(rect.height * 0.7, 200)));
          sec.style.setProperty('--section-scroll-fade', progress.toFixed(3));
          sec.style.setProperty('--hero-scroll-fade', progress.toFixed(3));
        });

        isUpdating = false;
      });
    };

    updateAllSectionsFade();
    window.addEventListener('scroll', updateAllSectionsFade, { passive: true });
    lenis.on('scroll', updateAllSectionsFade);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', updateAllSectionsFade);
      lenis.off('scroll', updateAllSectionsFade);
      lenis.destroy();
      window.lenis = null;
    };
  }, []);

  const splashSectionRef = useRef(null);

  return (
    <div className="app-container">
      {/* Background Ambience & Cyber Grid Overlay */}
      <div className="ambient-mesh" aria-hidden="true" />
      <div className="grid-overlay" aria-hidden="true" />

      {/* 1.) Sticky Navbar */}
      <Navbar onOpenContactModal={() => setContactModalOpen(true)} />

      <main>
        {/* Hero Section */}
        <Hero onOpenContactModal={() => setContactModalOpen(true)} />

        {/* 2.) About Me Showcase Section */}
        <AboutSection onOpenContactModal={() => setContactModalOpen(true)} />

        {/* 3.) Our Services We Provide Banner */}
        <ServicesBanner onOpenContactModal={() => setContactModalOpen(true)} />

        {/* 4.) What the Community Says */}
        <CommunitySays />
      </main>

      {/* SplashCursor — fixed overlay, visible only when post-feedback section is on screen */}
      <SplashCursor
        DENSITY_DISSIPATION={3.5}
        VELOCITY_DISSIPATION={2}
        PRESSURE={0.1}
        CURL={3}
        SPLAT_RADIUS={0.2}
        SPLAT_FORCE={6000}
        COLOR_UPDATE_SPEED={10}
        SHADING
        RAINBOW_MODE={false}
        COLOR="#A855F7"
        sectionRef={splashSectionRef}
      />

      {/* Post-feedback area: sentinel + Footer */}
      <div ref={splashSectionRef} style={{ position: 'relative' }}>
        <Footer onOpenContactModal={() => setContactModalOpen(true)} />
      </div>

      {/* Direct Contact & Service Inquiry Modal */}
      <ContactModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
      />
    </div>
  );
}

export default App;
