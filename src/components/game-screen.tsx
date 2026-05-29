'use client';

import { motion } from 'framer-motion';

interface GameScreenProps {
  children: React.ReactNode;
  onBack: () => void;
  gameName: string;
  gameEmoji: string;
}

export function GameScreen({ children, onBack, gameName, gameEmoji }: GameScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center justify-center px-4 py-8"
    >
      {/* Header with back button */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full max-w-2xl mb-8 flex items-center justify-between"
      >
        <motion.button
          onClick={onBack}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="glass-card rounded-full p-3 hover:bg-white/50 transition-all"
          title="Back to games"
        >
          ←
        </motion.button>

        <div className="text-center flex-1">
          <span className="text-4xl mr-2">{gameEmoji}</span>
          <span className="text-sm font-semibold text-foreground/60">{gameName}</span>
        </div>

        <div className="w-12" />
      </motion.div>

      {/* Game content */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="w-full max-w-2xl"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
