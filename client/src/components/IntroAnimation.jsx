import React, { useState, useEffect } from 'react';
import { Sparkles, ChevronRight } from 'lucide-react';
import { TextEffect } from '@/components/core/text-effect';
import { GhostFibers } from './GhostFibers';

export function IntroAnimation({ onFinish, onExitStart }) {
  const [isExiting, setIsExiting] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Increment progress smoothly over ~2.3 seconds
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Smooth logarithmic pacing
        const step = prev < 50 ? 2 : 1;
        return Math.min(100, prev + step);
      });
    }, 30);

    // Trigger smooth fade-out exit at 2.8s (decreased by 1s)
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
      if (onExitStart) onExitStart();
    }, 2800);

    // Fully complete and unmount at 3.3s
    const finishTimer = setTimeout(() => {
      if (onFinish) onFinish();
    }, 3300);

    const handleKeyDown = (e) => {
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
        handleSkip();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearInterval(interval);
      clearTimeout(exitTimer);
      clearTimeout(finishTimer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onFinish, onExitStart]);

  const handleSkip = () => {
    if (isExiting) return;
    setIsExiting(true);
    if (onExitStart) onExitStart();
    setTimeout(() => {
      if (onFinish) onFinish();
    }, 450);
  };

  return (
    <div
      className={`intro-splash-overlay ${isExiting ? 'is-exiting' : ''}`}
      onClick={handleSkip}
      role="banner"
      aria-label="Welcome to Vaibhav Gupta Portal"
    >
      {/* Black & Blue Cyber Ambient Lighting */}
      <div className="intro-ambient-blue-deep" aria-hidden="true" />
      <div className="intro-ambient-blue-electric" aria-hidden="true" />
      <div className="intro-grid-pattern" aria-hidden="true" />

      {/* Living WebGL GhostFibers Ambient Field */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          opacity: 0.65,
          pointerEvents: 'none'
        }}
        aria-hidden="true"
      >
        <GhostFibers
          lineColor="#140E35"
          glowColor="#3437A0"
          speed={0.2}
          scale={2.2}
          rotation={10}
          rotationSpeed={0.2}
          layers={4}
          waveAmplitude={0.015}
          waveFrequency={3}
          waveSpeed={0.15}
          layerSpeed={0.08}
          twist={0.1}
          twistFrequency={5}
          twistSpeed={1.2}
          lineFrequency={5}
          lineSpacing={2}
          lineSharpness={16}
          glowFalloff={10}
          glowIntensity={1.6}
          brightness={2}
          blueBoost={1.25}
          vignette={0.8}
          grain={0.05}
          dpr={1}
        />
      </div>

      <div className="intro-content-container" onClick={(e) => e.stopPropagation()}>
        {/* High-Impact Avatar presentation (Vaibhav Gupta Avatar as it was) */}
        <div className="intro-avatar-frame-wrap">
          <div className="intro-avatar-ambient-glow" />

          <div className="intro-avatar-inner-border">
            <div className="intro-scan-beam" />
            <img
              src="/vaibhav-avatar.png"
              alt="Vaibhav Gupta"
              className="intro-avatar-portrait"
            />
          </div>
        </div>

        {/* Identity & Typography: VAIBHAV GUPTA with Solana badge coming from the right */}
        <h1 className="intro-headline kinetic-headline">
          <TextEffect
            per="char"
            preset="fade"
            as="span"
            className="intro-first-name word-vaibhav"
            delay={0.08}
            speedReveal={0.035}
          >
            VAIBHAV
          </TextEffect>{' '}
          <TextEffect
            per="char"
            preset="fade"
            as="span"
            className="intro-last-name word-gupta"
            delay={0.35}
            speedReveal={0.035}
          >
            GUPTA
          </TextEffect>
          <span className="intro-solana-badge" title="Solana Verified">
            <img
              src="/solana-logo.png"
              alt="Solana"
              className="intro-solana-badge-img"
            />
          </span>
        </h1>

        <p className="intro-sub-headline">
          CRYPTO INFLUENCER
        </p>

        {/* Glowing cyber progress meter */}
        <div className="intro-meter-container">
          <div className="intro-meter-track">
            <div
              className="intro-meter-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="intro-meter-meta">
            <span className="intro-meter-status">
              <Sparkles size={11} className="intro-sparkle-icon" />
              <span>INITIALIZING SECURE PORTAL</span>
            </span>
            <span className="intro-meter-percentage">{progress}%</span>
          </div>
        </div>

        {/* Skip Prompt */}
        <button
          type="button"
          onClick={handleSkip}
          className="intro-skip-button"
          title="Click to enter immediately"
        >
          <span>Tap anywhere to enter</span>
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}

export default IntroAnimation;
