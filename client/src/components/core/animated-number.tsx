'use client';
import { useEffect, useState } from 'react';
import { motion, useSpring, useTransform, SpringOptions } from 'framer-motion';
import { cn } from '@/lib/utils';

export type AnimatedNumberProps = {
  value: number;
  className?: string;
  springOptions?: SpringOptions;
  as?: 'span' | 'div' | 'p';
  decimalPlaces?: number;
  format?: (value: number) => string;
};

export function AnimatedNumber({
  value,
  className = '',
  springOptions,
  as = 'span',
  decimalPlaces = 0,
  format,
}: AnimatedNumberProps) {
  const spring = useSpring(value, springOptions);
  const display = useTransform(spring, (current) => {
    if (typeof format === 'function') {
      return format(current);
    }
    if (decimalPlaces > 0) {
      return Number(current).toFixed(decimalPlaces);
    }
    return Math.round(current).toLocaleString();
  });

  useEffect(() => {
    spring.set(value);
  }, [spring, value]);

  const Component = (motion as any)[as] || motion.span;

  return <Component className={cn('tabular-nums', className)}>{display}</Component>;
}

export type AnimatedNumberBasicProps = {
  initialValue?: number;
  targetValue?: number;
  suffix?: string;
  className?: string;
  duration?: number;
  bounce?: number;
};

export function AnimatedNumberBasic({
  initialValue = 0,
  targetValue = 50,
  suffix = 'K+',
  className = '',
  duration = 2000,
  bounce = 0,
}: AnimatedNumberBasicProps) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(targetValue);
  }, [targetValue]);

  return (
    <div className={cn('inline-flex items-center', className)}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 16 16'
        width='16'
        height='16'
        className='mr-2.5 h-4 w-4 fill-transparent stroke-current stroke-[1.3]'
        aria-hidden='true'
      >
        <path d='M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z'></path>
      </svg>
      <AnimatedNumber
        className='inline-flex items-center font-mono text-2xl font-light text-zinc-800 dark:text-zinc-50'
        springOptions={{
          bounce,
          duration,
        }}
        value={value}
      />
      {suffix && <span>{suffix}</span>}
    </div>
  );
}
