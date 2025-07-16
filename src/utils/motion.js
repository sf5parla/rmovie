// Optimized motion utilities to reduce framer-motion bundle size
import { motion } from 'framer-motion';

// Page transition variants
export const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 }
};

// Page transition settings
export const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.4
};

// Optimized motion component for page transitions
export const MotionDiv = motion.div;

// Fade in animation for components
export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.5 }
};

// Slide up animation for modals
export const slideUp = {
  initial: { y: '100%', opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: '100%', opacity: 0 },
  transition: { duration: 0.3 }
};

// Stagger animation for lists
export const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 }
};