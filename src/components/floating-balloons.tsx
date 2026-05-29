'use client';

import { motion } from 'framer-motion';
import { useMemo } from 'react';

export function FloatingBalloons() {
  const balloons = useMemo(
    () =>
      Array.from({ length: 5 }).map((_, i) => ({
        id: i,
        delay: i * 0.2,
        left: 20 + i * 15,
        color: ['#f8b4d3', '#ff6b9d', '#ffc857', '#a8d8ea', '#ff5a8a'][i],
      })),
    []
  );

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {balloons.map((balloon) => (
        <motion.div
          key={balloon.id}
          initial={{ y: '100vh', opacity: 0 }}
          animate={{
            y: '-100vh',
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            delay: balloon.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute"
          style={{ left: `${balloon.left}%` }}
        >
          {/* Balloon */}
          <div className="relative">
            <motion.div
              animate={{
                x: [0, -20, 20, -10, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
              }}
              className="w-8 h-10 rounded-full shadow-lg"
              style={{
                background: `linear-gradient(135deg, ${balloon.color}, ${balloon.color}dd)`,
              }}
            />

            {/* String */}
            <div
              className="w-px h-12 absolute left-1/2 -translate-x-1/2 top-10"
              style={{
                background: `linear-gradient(to bottom, ${balloon.color}66, transparent)`,
              }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
