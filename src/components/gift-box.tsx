'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export function GiftBox() {
  const [isOpen, setIsOpen] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring' as const,
        stiffness: 100,
        delay: 0.3,
      },
    },
  };

  const lidVariants = {
    closed: {
      rotateX: 0,
      y: 0,
      transition: { duration: 0.4 } as any,
    },
    open: {
      rotateX: -90,
      y: -40,
      transition: { duration: 0.6 } as any,
    },
  };

  const boxVariants = {
    closed: {
      scale: 1,
      transition: { duration: 0.4 } as any,
    },
    open: {
      scale: 1.05,
      transition: { duration: 0.4 } as any,
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="flex flex-col items-center gap-4"
    >
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        animate={isOpen ? 'open' : 'closed'}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative w-24 h-24 cursor-pointer focus:outline-none"
      >
        {/* Box body */}
        <motion.div
          variants={boxVariants}
          className="absolute inset-0 bg-gradient-to-br from-amber-300 to-amber-500 rounded-lg shadow-xl border-2 border-amber-600"
        />

        {/* Lid */}
        <motion.div
          variants={lidVariants}
          className="absolute inset-0 origin-bottom"
          style={{
            perspective: 1000,
            perspectiveOrigin: 'center bottom',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-red-400 to-red-600 rounded-lg shadow-lg border-2 border-red-700" />

          {/* Ribbon */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-yellow-300 shadow-md" />
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-yellow-300 shadow-md" />

          {/* Bow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="w-4 h-4 bg-yellow-400 rounded-full shadow-md" />
          </div>
        </motion.div>

        {/* Sparkles when open */}
        {isOpen && (
          <>
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={`sparkle-${i}`}
                className="absolute w-2 h-2 text-yellow-300"
                initial={{
                  x: 0,
                  y: 0,
                  opacity: 1,
                }}
                animate={{
                  x: (Math.cos((i / 8) * Math.PI * 2) * 80),
                  y: (Math.sin((i / 8) * Math.PI * 2) * 80),
                  opacity: 0,
                }}
                transition={{
                  duration: 0.8,
                  ease: 'easeOut',
                }}
              >
                ✨
              </motion.div>
            ))}
          </>
        )}
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : 10 }}
        className="text-center"
      >
        {isOpen && (
          <div className="space-y-2">
            <p className="text-sm font-semibold text-pink-600">You found the gift!</p>
            <p className="text-xs text-pink-500">Wishing you joy and love</p>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
