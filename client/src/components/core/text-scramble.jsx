import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

const defaultChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=<>?/';

export function TextScramble({
  children,
  duration = 1.0,
  speed = 0.035,
  delay = 0,
  characterSet = defaultChars,
  className = '',
  as: Component = 'p',
  trigger = true,
  scrambleOnHover = true,
  onScrambleComplete,
  renderText,
  ...props
}) {
  const MotionComponent = motion[Component] || motion.span;

  const [scrambledText, setScrambledText] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const text = typeof children === 'string' ? children : String(children || '');
  const displayText = scrambledText ?? text;
  const timeoutRef = useRef(null);
  const intervalRef = useRef(null);

  const scramble = () => {
    clearInterval(intervalRef.current);
    setIsAnimating(true);

    const steps = Math.max(1, Math.floor(duration / speed));
    let step = 0;

    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      let scrambled = '';
      const progress = step / steps;

      for (let i = 0; i < text.length; i++) {
        if (text[i] === ' ') {
          scrambled += ' ';
          continue;
        }

        if (progress * text.length > i) {
          scrambled += text[i];
        } else {
          scrambled += characterSet[Math.floor(Math.random() * characterSet.length)];
        }
      }

      setScrambledText(scrambled);
      step++;

      if (step > steps) {
        clearInterval(intervalRef.current);
        setScrambledText(null);
        setIsAnimating(false);
        if (typeof onScrambleComplete === 'function') {
          onScrambleComplete();
        }
      }
    }, speed * 1000);
  };

  useEffect(() => {
    if (!trigger) return;

    if (delay > 0) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        scramble();
      }, delay * 1000);
    } else {
      scramble();
    }

    return () => {
      clearTimeout(timeoutRef.current);
      clearInterval(intervalRef.current);
    };
  }, [trigger, text, delay]);

  const handleMouseEnter = (e) => {
    if (props.onMouseEnter) props.onMouseEnter(e);
    if (scrambleOnHover) scramble();
  };

  return (
    <MotionComponent
      className={className}
      onMouseEnter={handleMouseEnter}
      {...props}
    >
      {typeof renderText === 'function' ? renderText(displayText) : displayText}
    </MotionComponent>
  );
}

export function TextScrambleBasic() {
  return (
    <TextScramble className="font-mono text-sm uppercase">
      Text Scramble
    </TextScramble>
  );
}

export function TextScrambleCustomCharacterDuration({
  children = "Generating the interface...",
  className = "",
  delay = 0,
  ...props
}) {
  return (
    <TextScramble
      className={`font-mono text-sm ${className}`.trim()}
      duration={1.2}
      characterSet=". "
      delay={delay}
      {...props}
    >
      {children}
    </TextScramble>
  );
}

export default TextScramble;
