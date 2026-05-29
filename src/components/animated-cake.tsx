'use client';

import { motion } from 'framer-motion';

export function AnimatedCake() {
  const candleVariants = {
    flicker: {
      opacity: [1, 0.5, 1, 0.7, 1],
      transition: {
        duration: 0.3,
        repeat: Infinity,
        repeatDelay: 0.2,
      },
    },
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="relative w-32 h-32 flex items-center justify-center">
        {/* Cake base */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 100, delay: 0.2 }}
          className="absolute bottom-0 w-24 h-16 bg-gradient-to-b from-amber-100 to-amber-200 rounded-b-2xl shadow-lg"
        />

        {/* Cake frosting */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 100, delay: 0.3 }}
          className="absolute bottom-14 w-28 h-8 bg-gradient-to-r from-pink-300 via-pink-200 to-pink-300 rounded-t-full shadow-lg"
        />

        {/* Candles */}
        {[0, 1, 2].map((idx) => (
          <motion.div
            key={`candle-${idx}`}
            variants={candleVariants}
            animate="flicker"
            initial={{ opacity: 1 }}
            className="absolute bottom-24"
            style={{ left: `calc(50% + ${(idx - 1) * 24}px)` }}
          >
            {/* Candle stick */}
            <div className="w-1 h-6 bg-amber-700 rounded-t-full" />

            {/* Flame */}
            <motion.div
              animate={{
                y: [0, -2, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 0.4,
                repeat: Infinity,
              }}
              className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-2 h-4 bg-gradient-to-t from-yellow-400 to-orange-300 rounded-full blur-sm"
            />
          </motion.div>
        ))}
      </div>

      {/* Decorative text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-center"
      >
        <p className="text-sm text-pink-500 font-semibold">Make a wish!</p>
      </motion.div>
    </div>
  );
}
