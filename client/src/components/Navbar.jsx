import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export function Navbar({ onOpenContactModal }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const aboutEl = document.getElementById('about');
      const servicesEl = document.getElementById('services');
      const communityEl = document.getElementById('community') || document.getElementById('feedback');
      const scrollPos = window.scrollY + 220;

      if (communityEl && scrollPos >= communityEl.offsetTop) {
        setActiveSection('feedback');
      } else if (servicesEl && scrollPos >= servicesEl.offsetTop) {
        setActiveSection('services');
      } else if (aboutEl && scrollPos >= aboutEl.offsetTop) {
        setActiveSection('about');
      } else {
        setActiveSection('home');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (sectionId === 'home') {
      if (window.lenis) {
        window.lenis.scrollTo(0, { duration: 1.4 });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    const element = document.getElementById(sectionId) ||
      (sectionId === 'feedback' ? document.getElementById('community') : null);

    if (element) {
      if (window.lenis) {
        window.lenis.scrollTo(element, { offset: -80, duration: 1.4 });
      } else {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      setActiveSection(sectionId);
    }
  };

  return (
    <>
      <header className={`reactbits-floating-nav ${scrolled ? 'nav-is-scrolled' : ''}`} id="main-header">
        <div className="reactbits-nav-pill">
          {/* Brand Logo: Orbital Icon + Brand Name */}
          <a
            href="#home"
            onClick={(e) => scrollToSection(e, 'about')}
            className="reactbits-nav-brand"
            aria-label="VG"
          >
            <svg
              className="reactbits-atom-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(30 12 12)" />
              <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(-30 12 12)" />
              <circle cx="12" cy="12" r="1.7" fill="currentColor" />
            </svg>
            <span className="reactbits-brand-name">VG</span>
          </a>

          {/* Desktop Navigation Links & Contact Us CTA */}
          <div className="reactbits-nav-right">
            <nav className="reactbits-nav-links" id="desktop-nav-links">
              <a
                href="#about"
                onClick={(e) => scrollToSection(e, 'about')}
                className={`reactbits-nav-link ${activeSection === 'about' ? 'active' : ''}`}
                id="nav-link-about"
              >
                About me
              </a>

              <a
                href="#services"
                onClick={(e) => scrollToSection(e, 'services')}
                className={`reactbits-nav-link ${activeSection === 'services' ? 'active' : ''}`}
                id="nav-link-services"
              >
                Services
              </a>

              <a
                href="#feedback"
                onClick={(e) => scrollToSection(e, 'feedback')}
                className={`reactbits-nav-link ${activeSection === 'feedback' ? 'active' : ''}`}
                id="nav-link-feedback"
              >
                Feedback
              </a>
            </nav>

            {/* Solid Pure White Pill Button: Contact Us */}
            <button
              type="button"
              onClick={onOpenContactModal}
              className="reactbits-btn-signup"
              id="nav-contact-btn"
            >
              Contact us
            </button>

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              className="reactbits-mobile-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation"
              id="mobile-nav-toggle"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="reactbits-mobile-drawer" id="mobile-nav-menu">
            <a
              href="#about"
              onClick={(e) => scrollToSection(e, 'about')}
              className={`reactbits-mobile-item ${activeSection === 'about' ? 'active' : ''}`}
            >
              About me
            </a>
            <a
              href="#services"
              onClick={(e) => scrollToSection(e, 'services')}
              className={`reactbits-mobile-item ${activeSection === 'services' ? 'active' : ''}`}
            >
              Services
            </a>
            <a
              href="#feedback"
              onClick={(e) => scrollToSection(e, 'feedback')}
              className={`reactbits-mobile-item ${activeSection === 'feedback' ? 'active' : ''}`}
            >
              Feedback
            </a>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenContactModal) onOpenContactModal();
              }}
              className="reactbits-mobile-cta"
              id="mobile-nav-contact-btn"
            >
              Contact us
            </button>
          </div>
        )}
      </header>

      {/* Mobile Backdrop */}
      {mobileMenuOpen && (
        <div
          className="reactbits-backdrop"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}

export default Navbar;

