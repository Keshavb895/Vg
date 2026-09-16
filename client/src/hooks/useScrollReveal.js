import { useEffect } from 'react';

/**
 * useScrollReveal Hook (Inspired by dndaliens.com kinetic 3D scroll physics)
 * Observes all elements marked with .scroll-reveal, .scroll-reveal-3d, .scroll-reveal-left,
 * .scroll-reveal-right, or .scroll-reveal-scale and applies .is-revealed when they cross into view.
 */
export function useScrollReveal(enabled = true) {
  useEffect(() => {
    if (!enabled) return;

    const observerCallback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          // Once revealed, keep it clean & unobserve to free up GPU/CPU resources on mobile
          observer.unobserve(entry.target);
        }
      });
    };

    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -35px 0px',
      threshold: 0.1,
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    const observeElements = () => {
      const elements = document.querySelectorAll(
        '.scroll-reveal, .scroll-reveal-3d, .scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-scale, .scroll-reveal-mobile-card'
      );
      elements.forEach((el) => {
        if (!el.classList.contains('is-revealed')) {
          observer.observe(el);
        }
      });
    };

    // Immediate check and short delay check
    observeElements();
    const timer = setTimeout(observeElements, 80);

    // Mutation observer to capture elements dynamically rendered or unmounted
    const mutationObserver = new MutationObserver(() => {
      observeElements();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      clearTimeout(timer);
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, [enabled]);
}
