'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useGameState } from '@/hooks/useGameState';
import { useGameTimer } from '@/hooks/useGameTimer';

interface Heart {
  x: number;
  y: number;
  vx: number;
  vy: number;
  id: number;
}

interface CatchHeartsGameProps {
  onComplete: (reward: string) => void;
}

export function CatchHeartsGame({ onComplete }: CatchHeartsGameProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<'playing' | 'completed'>('playing');
  const { score, addScore, completeGame } = useGameState(0);
  const { time, formatTime } = useGameTimer(gameState === 'playing');
  const [basket, setBasket] = useState({ x: 150, y: 0 });
  const heartsRef = useRef<Heart[]>([]);
  const heartIdRef = useRef<number>(0);
  const caughtRef = useRef<number>(0);
  const animationIdRef = useRef<number | undefined>(undefined);

  const BASKET_WIDTH = 60;
  const BASKET_HEIGHT = 60;
  const GAME_DURATION = 30;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left - BASKET_WIDTH / 2;
      setBasket((prev) => ({
        ...prev,
        x: Math.max(0, Math.min(x, canvas.width - BASKET_WIDTH)),
      }));
    };

    canvas.addEventListener('mousemove', handleMouseMove);

    // Spawn hearts
    const spawnInterval = setInterval(() => {
      if (gameState === 'playing') {
        heartsRef.current.push({
          x: Math.random() * (canvas.width - 20),
          y: -20,
          vx: (Math.random() - 0.5) * 2,
          vy: 2 + Math.random() * 1.5,
          id: heartIdRef.current++,
        });
      }
    }, 400);

    // Game loop
    const gameLoop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw basket
      ctx.fillStyle = '#ff6b9d';
      ctx.fillRect(basket.x, canvas.height - BASKET_HEIGHT, BASKET_WIDTH, BASKET_HEIGHT);
      ctx.fillText('🧺', basket.x + 15, canvas.height - 15);

      // Update and draw hearts
      heartsRef.current = heartsRef.current.filter((heart) => {
        heart.x += heart.vx;
        heart.y += heart.vy;
        heart.vy += 0.1; // gravity

        // Draw heart
        ctx.font = '24px Arial';
        ctx.fillText('❤️', heart.x, heart.y);

        // Check collision with basket
        if (
          heart.y + 20 >= canvas.height - BASKET_HEIGHT &&
          heart.x >= basket.x &&
          heart.x <= basket.x + BASKET_WIDTH
        ) {
          caughtRef.current++;
          return false;
        }

        return heart.y < canvas.height;
      });

      ctx.fillStyle = '#666';
      ctx.font = '16px Arial';
      ctx.fillText(`Caught: ${caughtRef.current}`, 10, 30);
      ctx.fillText(`Time: ${formatTime(time)}`, 10, 55);

      if (time < GAME_DURATION) {
        animationIdRef.current = requestAnimationFrame(gameLoop);
      } else {
        setGameState('completed');
        completeGame('Heart Catcher');
        onComplete('🧺 Heart Catcher');
      }
    };

    animationIdRef.current = requestAnimationFrame(gameLoop);

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
      clearInterval(spawnInterval);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, [gameState, time, basket, formatTime, completeGame, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center space-y-4"
    >
      <h1 className="text-4xl font-serif font-bold text-accent mb-4">Catch the Hearts</h1>
      <p className="text-foreground/70 mb-4">Move your basket to catch the falling hearts!</p>

      <canvas
        ref={canvasRef}
        width={400}
        height={400}
        className="border-2 border-accent rounded-lg bg-white/30 backdrop-blur-sm cursor-none"
      />

      {gameState === 'completed' && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="mt-6 text-center"
        >
          <p className="text-2xl font-semibold text-accent mb-2">Great job!</p>
          <p className="text-xl text-foreground">You caught {caughtRef.current} hearts in {formatTime(time)}</p>
        </motion.div>
      )}
    </motion.div>
  );
}
