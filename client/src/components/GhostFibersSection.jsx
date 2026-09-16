import React, { useState } from 'react';
import { Sparkles, Activity, Play, Pause, Sun, Moon, ShieldCheck, ArrowRight } from 'lucide-react';
import { GhostFibers } from './GhostFibers';

export function GhostFibersSection({ onOpenContactModal }) {
  const [lightMode, setLightMode] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [speed, setSpeed] = useState(0.2);

  return (
    <section className="ghost-fibers-section" id="network">
      <div className="ghost-fibers-inner">
        {/* Section Header */}
        <div className="section-header scroll-reveal">
          <div className="section-badge gold font-mono" style={{ fontFamily: "'Disket Mono', monospace" }}>
            <Activity size={14} />
            <span>REACT BITS COMPONENT &bull; WEBGL 2</span>
          </div>
          <h2 
            className="section-title font-mono uppercase" 
            style={{ letterSpacing: '0.02em', fontFamily: "'Disket Mono', monospace" }}
          >
            <span>NEURAL P2P </span>
            <span className="gradient-text">LIQUIDITY MESH</span>
          </h2>
          <p className="section-subtitle">
            Interactive multi-layered dynamic fiber field powered by <code>GhostFibers</code> WebGL shader.
            Visualizing real-time encrypted peer-to-peer settlement channels.
          </p>
        </div>

        {/* 600px Interactive Canvas Container */}
        <div className="ghost-fibers-frame scroll-reveal-3d">
          <div style={{ width: '100%', height: '600px', position: 'relative', borderRadius: '24px', overflow: 'hidden' }}>
            <GhostFibers
              lineColor={lightMode ? '#0f172a' : '#140E35'}
              glowColor={lightMode ? '#0284c7' : '#3437A0'}
              speed={speed}
              scale={2}
              rotation={0}
              rotationSpeed={0.25}
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
              lightMode={lightMode}
              paused={isPaused}
            />

            {/* Glassmorphic HUD Overlays */}
            <div className="ghost-hud-top-left">
              <span className="hud-pill">
                <span className="pulse-dot" style={{ width: '7px', height: '7px' }}></span>
                <span>Active Liquidity Mesh</span>
              </span>
              <span className="hud-pill hud-meta">
                <ShieldCheck size={13} color="#10b981" />
                <span>4 Fiber Layers &bull; 60 FPS</span>
              </span>
            </div>

            <div className="ghost-hud-top-right">
              <button
                type="button"
                className="hud-ctrl-btn"
                onClick={() => setLightMode(!lightMode)}
                title={lightMode ? "Switch to Dark Cyber Mode" : "Switch to Light Ink Mode"}
              >
                {lightMode ? <Moon size={14} /> : <Sun size={14} />}
                <span>{lightMode ? 'Cyber Dark' : 'Light Ink'}</span>
              </button>

              <button
                type="button"
                className="hud-ctrl-btn"
                onClick={() => setIsPaused(!isPaused)}
                title={isPaused ? "Resume Animation" : "Pause Animation"}
              >
                {isPaused ? <Play size={14} /> : <Pause size={14} />}
                <span>{isPaused ? 'Resume' : 'Pause'}</span>
              </button>
            </div>

            <div className="ghost-hud-bottom">
              <div className="hud-bottom-info">
                <div className="hud-stat-badge">
                  <span className="hud-stat-num">100%</span>
                  <span className="hud-stat-desc">Escrow Guaranteed</span>
                </div>
                <div className="hud-stat-badge">
                  <span className="hud-stat-num">~3.8m</span>
                  <span className="hud-stat-desc">Avg Settlement</span>
                </div>
              </div>

              {onOpenContactModal && (
                <button
                  type="button"
                  className="hud-action-btn"
                  onClick={onOpenContactModal}
                >
                  <Sparkles size={14} />
                  <span>Initiate P2P Exchange</span>
                  <ArrowRight size={14} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default GhostFibersSection;
