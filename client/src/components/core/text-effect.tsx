import React from 'react';
import { motion, Variants, Transition } from 'framer-motion';

export type PresetType = 'blur' | 'scale' | 'fade' | 'slide';
export type PerType = 'char' | 'word' | 'line';

export type TextEffectProps = {
  children: string;
  per?: PerType;
  as?: keyof React.JSX.IntrinsicElements;
  variants?: {
    container?: Variants;
    item?: Variants;
  };
  className?: string;
  preset?: PresetType;
  delay?: number;
  speedReveal?: number;
  trigger?: boolean;
  onAnimationComplete?: () => void;
  onAnimationStart?: () => void;
  segmentWrapperClassName?: string;
  style?: React.CSSProperties;
};

const defaultContainerVariants: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

const presetVariants: Record<PresetType, { container: Variants; item: Variants }> = {
  fade: {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { duration: 0.35, ease: 'easeOut' },
      },
      exit: {
        opacity: 0,
        transition: { duration: 0.2 },
      },
    },
  },
  blur: {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0, filter: 'blur(10px)' },
      visible: {
        opacity: 1,
        filter: 'blur(0px)',
        transition: { duration: 0.4, ease: 'easeOut' },
      },
      exit: {
        opacity: 0,
        filter: 'blur(10px)',
        transition: { duration: 0.2 },
      },
    },
  },
  scale: {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0, scale: 0.8 },
      visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.35, ease: 'easeOut' },
      },
      exit: {
        opacity: 0,
        scale: 0.8,
        transition: { duration: 0.2 },
      },
    },
  },
  slide: {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
      },
      exit: {
        opacity: 0,
        y: -20,
        transition: { duration: 0.2 },
      },
    },
  },
};

const motionComponents: Record<string, any> = {
  p: motion.p,
  span: motion.span,
  div: motion.div,
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  h4: motion.h4,
};

export function TextEffect({
  children,
  per = 'word',
  as: Component = 'p',
  variants,
  className = '',
  preset = 'fade',
  delay = 0,
  speedReveal = 0.05,
  trigger = true,
  onAnimationComplete,
  onAnimationStart,
  segmentWrapperClassName = '',
  style,
  ...props
}: TextEffectProps) {
  const text = typeof children === 'string' ? children : String(children || '');

  const basePreset = presetVariants[preset] || presetVariants.fade;
  const itemVariants = variants?.item || basePreset.item;
  const containerVariants = variants?.container || {
    ...basePreset.container,
    visible: {
      ...basePreset.container.visible,
      transition: {
        staggerChildren: speedReveal,
        delayChildren: delay,
      },
    },
  };

  const MotionComponent = motionComponents[Component] || (motion as any)[Component] || motion.span;

  const renderContent = () => {
    if (per === 'char') {
      return text.split('').map((char, charIndex) => (
        <motion.span
          key={`char-${charIndex}`}
          variants={itemVariants}
          style={{
            display: 'inline-block',
            whiteSpace: char === ' ' ? 'pre' : 'normal',
          }}
          className={segmentWrapperClassName}
        >
          {char}
        </motion.span>
      ));
    }

    if (per === 'line') {
      const lines = text.split('\n');
      return lines.map((line, lineIndex) => (
        <motion.span
          key={`line-${lineIndex}`}
          variants={itemVariants}
          style={{ display: 'block' }}
        >
          {line}
        </motion.span>
      ));
    }

    const words = text.split(/(\s+)/);
    return words.map((word, wordIndex) => {
      if (/^\s+$/.test(word)) {
        return (
          <span key={`space-${wordIndex}`} style={{ display: 'inline-block', whiteSpace: 'pre' }}>
            {word}
          </span>
        );
      }

      return (
        <motion.span
          key={`word-${wordIndex}`}
          variants={itemVariants}
          style={{ display: 'inline-block' }}
          className={segmentWrapperClassName}
        >
          {word}
        </motion.span>
      );
    });
  };

  return (
    <MotionComponent
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate={trigger ? 'visible' : 'hidden'}
      onAnimationStart={onAnimationStart}
      onAnimationComplete={onAnimationComplete}
      style={style}
      {...props}
    >
      {renderContent()}
    </MotionComponent>
  );
}

export function TextEffectPerChar({
  children = 'Animate your ideas with motion-primitives',
  ...props
}: Partial<TextEffectProps>) {
  return (
    <TextEffect per="char" preset="fade" {...(props as any)}>
      {children}
    </TextEffect>
  );
}

export default TextEffect;
