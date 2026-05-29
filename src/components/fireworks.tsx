'use client';

import { motion } from 'framer-motion';

interface FireworksProps {
  isActive: boolean;
}

export function Fireworks({ isActive }: FireworksProps) {
  const colors = ['#ff6b9d', '#f8b4d3', '#ffc857', '#a8d8ea', '#ff5a8a'];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {isActive &&
        [...Array(40)].map((_, i) => {
          const angle = (i / 40) * Math.PI * 2;
          const radius = 200;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          const color = colors[Math.floor(Math.random() * colors.length)];

          return (
            <motion.div
              key={`firework-${i}`}
              className="absolute w-2 h-2 rounded-full"
              style={{
                backgroundColor: color,
                left: '50%',
                top: '50%',
                marginLeft: '-4px',
                marginTop: '-4px',
              }}
              initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
              animate={{
                x: x * 1.5,
                y: y * 1.5,
                opacity: 0,
                scale: 0,
              }}
              transition={{
                duration: 1.2,
                ease: 'easeOut',
                delay: i * 0.02,
              }}
            />
          );
        })}
    </div>
  );
}
