
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface WelcomeAnimationProps {
  onComplete: () => void;
}

const WelcomeAnimation: React.FC<WelcomeAnimationProps> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 500); // Allow exit animation to complete
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [onComplete]);
  
  if (!isVisible) return null;
  
  return (
    <motion.div 
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative w-64 h-64 mb-6"
      >
        <img 
          src="/lovable-uploads/9063530b-9684-4546-b253-211c757f4499.png" 
          alt="Doctor" 
          className="w-full h-full object-contain"
        />
      </motion.div>
      
      <motion.h2
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="text-3xl font-bold text-primary text-center tracking-wide"
      >
        We Care For You
      </motion.h2>
      
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="h-1 bg-primary/70 rounded-full mt-4 w-48"
      />
    </motion.div>
  );
};

export default WelcomeAnimation;
