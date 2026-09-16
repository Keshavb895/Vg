import React, { useLayoutEffect, useRef, useCallback } from 'react';
import './ScrollStack.css';

export const ScrollStackItem = ({ children, itemClassName = '' }) => (
  <div className={`scroll-stack-item-content ${itemClassName}`.trim()}>{children}</div>
);

const ScrollStack = ({
  children,
  className = '',
  itemScale = 0.045,
  itemStackDistance = 38,
  stackPosition = 90, // px from top of viewport (below navbar)
  baseScale = 0.88,
  onStackComplete,
}) => {
  const containerRef = useRef(null);
  const wrappersRef = useRef([]);
  const cardsRef = useRef([]);
  const lastTransformsRef = useRef(new Map());
  const rafIdRef = useRef(null);
  const isTickingRef = useRef(false);

  const updateCardTransforms = useCallback(() => {
    isTickingRef.current = false;
    const cards = cardsRef.current;
    const wrappers = wrappersRef.current;
    const numCards = cards.length;
    if (!numCards) return;

    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;

    // Mobile-optimized parameters for clean touch stacking
    const isMobile = windowWidth < 768;
    const activeStackPosition = isMobile ? 68 : stackPosition;
    const activeStackDistance = isMobile ? 24 : itemStackDistance;
    const activeItemScale = isMobile ? 0.03 : itemScale;

    // Calculate static document top for each wrapper (wrappers have NO transform)
    const wrapperTops = wrappers.map(w => (w ? w.getBoundingClientRect().top + scrollTop : 0));

    // End marker to know when the whole stack should unpin
    const endEl = document.querySelector('.scroll-stack-end');
    const endTop = endEl ? endEl.getBoundingClientRect().top + scrollTop : (wrapperTops[numCards - 1] + 800);
    // Pin until the end of the container reaches near the bottom of viewport
    const pinEnd = endTop - windowHeight * 0.75;

    // Pin start for each card
    const pinStarts = wrapperTops.map((top, i) => {
      const pinTargetY = activeStackPosition + i * activeStackDistance;
      return top - pinTargetY;
    });

    cards.forEach((card, i) => {
      if (!card) return;

      const pinStart = pinStarts[i];

      // 1. Calculate translateY for pinning
      let translateY = 0;
      if (scrollTop >= pinStart && scrollTop <= pinEnd) {
        translateY = scrollTop - pinStart;
      } else if (scrollTop > pinEnd) {
        translateY = pinEnd - pinStart;
      } else {
        translateY = 0;
      }

      // 2. Calculate scale:
      // When subsequent cards (i+1, i+2, ...) approach their pinStarts, card i scales down smoothly!
      let scale = 1;
      for (let j = i + 1; j < numCards; j++) {
        const nextPinStart = pinStarts[j];
        // Transition range: card i starts scaling down before card j pins
        const approachRange = isMobile ? 260 : 400;
        const progress = Math.max(0, Math.min(1, (scrollTop - (nextPinStart - approachRange)) / approachRange));
        scale -= progress * activeItemScale;
      }
      scale = Math.max(baseScale, Math.min(1, scale));

      // 3. Subtle shadow depth and brightness for stacked cards
      let brightness = 1;
      for (let j = i + 1; j < numCards; j++) {
        const nextPinStart = pinStarts[j];
        const progress = Math.max(0, Math.min(1, (scrollTop - (nextPinStart - 350)) / 350));
        brightness -= progress * 0.04;
      }
      brightness = Math.max(0.85, brightness);

      // Round to prevent unnecessary DOM style thrashing
      const roundY = Math.round(translateY * 10) / 10;
      const roundScale = Math.round(scale * 1000) / 1000;
      const roundBright = Math.round(brightness * 100) / 100;

      const prev = lastTransformsRef.current.get(i);
      const changed =
        !prev ||
        Math.abs(prev.translateY - roundY) > 0.2 ||
        Math.abs(prev.scale - roundScale) > 0.002 ||
        Math.abs(prev.brightness - roundBright) > 0.01;

      if (changed) {
        card.style.transform = `translate3d(0, ${roundY}px, 0) scale(${roundScale})`;
        card.style.filter = roundBright < 1 ? `brightness(${roundBright})` : 'none';
        lastTransformsRef.current.set(i, {
          translateY: roundY,
          scale: roundScale,
          brightness: roundBright,
        });
      }
    });
  }, [itemScale, itemStackDistance, stackPosition, baseScale]);

  const requestUpdate = useCallback(() => {
    if (!isTickingRef.current) {
      isTickingRef.current = true;
      rafIdRef.current = requestAnimationFrame(updateCardTransforms);
    }
  }, [updateCardTransforms]);

  useLayoutEffect(() => {
    // Initial sync
    updateCardTransforms();

    const handleScroll = () => requestUpdate();
    const handleResize = () => requestUpdate();

    if (window.lenis) {
      window.lenis.on('scroll', handleScroll);
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    // In case images finish loading, refresh after short delay
    const timer = setTimeout(updateCardTransforms, 300);

    return () => {
      clearTimeout(timer);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      if (window.lenis) {
        window.lenis.off('scroll', handleScroll);
      }
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      lastTransformsRef.current.clear();
      isTickingRef.current = false;
    };
  }, [updateCardTransforms, requestUpdate]);

  const childArray = React.Children.toArray(children);

  return (
    <div className={`scroll-stack-scroller ${className}`.trim()} ref={containerRef}>
      <div className="scroll-stack-inner">
        {childArray.map((child, i) => (
          <div
            key={i}
            className="scroll-stack-card-wrapper"
            ref={el => (wrappersRef.current[i] = el)}
          >
            <div
              className="scroll-stack-card"
              ref={el => (cardsRef.current[i] = el)}
              style={{ zIndex: 10 + i * 10 }}
            >
              {child}
            </div>
          </div>
        ))}
        <div className="scroll-stack-end" />
      </div>
    </div>
  );
};

export default ScrollStack;
