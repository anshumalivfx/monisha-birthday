'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface CelebrationScreenProps {
  rewards: string[];
  onContinue: () => void;
}

export function CelebrationScreen({ rewards, onContinue }: CelebrationScreenProps) {
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden"
    >
      {/* Confetti animation */}
      {showConfetti && (
        <>
          {Array.from({ length: 30 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 1, y: -100, x: Math.random() * 400 - 200 }}
              animate={{ opacity: 0, y: 500 }}
              transition={{ duration: 2, delay: Math.random() * 0.3 }}
              className="fixed pointer-events-none text-3xl"
            >
              {['🎉', '✨', '💝', '🎂', '🌸'][Math.floor(Math.random() * 5)]}
            </motion.div>
          ))}
        </>
      )}

      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, type: 'spring', stiffness: 100 }}
        className="text-center space-y-8 max-w-2xl"
      >
        <div>
          <motion.div
            animate={{ scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-8xl mb-4"
          >
            🎊
          </motion.div>
          <h1 className="text-5xl sm:text-6xl font-serif font-bold text-accent mb-4">
            All Games Complete!
          </h1>
          <p className="text-xl text-foreground/70">
            You&apos;ve unlocked all the birthday rewards!
          </p>
        </div>

        {/* Rewards display */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-3"
        >
          <p className="text-lg font-semibold text-foreground mb-4">Your Rewards:</p>
          <div className="flex flex-wrap justify-center gap-3">
            {rewards.map((reward, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + idx * 0.1 }}
                className="glass-card rounded-full px-4 py-2 text-sm font-semibold text-foreground"
              >
                {reward}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Special message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="glass-card rounded-2xl p-6 sm:p-8 space-y-3"
        >
          <p className="text-2xl font-serif font-light text-accent">
            Happy Birthday, Monisha!
          </p>
          <p className="text-foreground/70 leading-relaxed">
            You&apos;ve completed all the games and earned all the rewards. Thank you for celebrating with us and making this day special. Here&apos;s to a year filled with joy, laughter, and wonderful memories!
          </p>
        </motion.div>

        {/* Continue button */}
        <motion.button
          onClick={onContinue}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="glow-btn mt-8 text-lg px-8 py-3"
        >
          Return to Home
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
