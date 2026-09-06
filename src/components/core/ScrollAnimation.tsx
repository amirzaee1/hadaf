import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

interface ScrollAnimationProps {
  children: React.ReactNode;
  parallaxSpeed?: number; // 0 for none, positive for slower, negative for faster
  revealType?: 'fade-up' | 'scale-in' | 'slide-right' | 'cinematic-focus';
  delay?: number;
  className?: string;
}

export const ScrollAnimation: React.FC<ScrollAnimationProps> = ({
  children,
  parallaxSpeed = 0,
  revealType = 'fade-up',
  delay = 0,
  className = '',
}) => {
  const getInitial = () => {
    switch (revealType) {
      case 'scale-in':
        return { opacity: 0, scale: 0.92 };
      case 'slide-right':
        return { opacity: 0, x: -30 };
      case 'cinematic-focus':
        return { opacity: 0, filter: 'blur(8px)', y: 15 };
      case 'fade-up':
      default:
        return { opacity: 0, y: 25 };
    }
  };

  const getAnimate = () => {
    switch (revealType) {
      case 'scale-in':
        return { opacity: 1, scale: 1 };
      case 'slide-right':
        return { opacity: 1, x: 0 };
      case 'cinematic-focus':
        return { opacity: 1, filter: 'blur(0px)', y: 0 };
      case 'fade-up':
      default:
        return { opacity: 1, y: 0 };
    }
  };

  return (
    <motion.div
      initial={getInitial()}
      whileInView={getAnimate()}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.16, 1, 0.3, 1], // cinematic smooth ease-out
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
