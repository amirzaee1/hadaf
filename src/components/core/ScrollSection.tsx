import React from 'react';
import { motion } from 'motion/react';

interface ScrollSectionProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
  threshold?: number;
  direction?: 'up' | 'down' | 'right' | 'left' | 'fade';
  delay?: number;
}

export const ScrollSection: React.FC<ScrollSectionProps> = ({
  id,
  className = '',
  children,
  direction = 'up',
  delay = 0.1,
}) => {
  const getVariants = () => {
    switch (direction) {
      case 'right':
        return {
          hidden: { opacity: 0, x: -30 },
          visible: { opacity: 1, x: 0 },
        };
      case 'left':
        return {
          hidden: { opacity: 0, x: 30 },
          visible: { opacity: 1, x: 0 },
        };
      case 'fade':
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        };
      case 'up':
      default:
        return {
          hidden: { opacity: 0, y: 35 },
          visible: { opacity: 1, y: 0 },
        };
    }
  };

  return (
    <motion.section
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      variants={getVariants()}
      className={`relative w-full ${className}`}
    >
      {children}
    </motion.section>
  );
};
