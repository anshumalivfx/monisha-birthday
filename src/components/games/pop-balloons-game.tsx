'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useGameState } from '@/hooks/useGameState';
import { useGameTimer } from '@/hooks/useGameTimer';

interface Balloon {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  popped: boolean;
}

interface PopBalloonsGameProps {
  onComplete: (reward: string) => void;
}

export function PopBalloonsGame({ onComplete }: PopBalloonsGameProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<'playing' | 'completed'>('playing');
  const { score, addScore, completeGame } = useGameState(0);
  const { time, formatTime } = useGameTimer(gameState === 'playing');
  const balloonsRef = useRef<Balloon[]>([]);
  const balloonIdRef = useRef<number>(0);
  const animationIdRef = useRef<number | undefined>(undefined);
  const poppedRef = useRef<number>(0);

  const GAME_DURATION = 30;
  const colors = ['#ff6b9d', '#a8d8ea', '#ffc857', '#f8b4d3', '#ff9ece'];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const handleCanvasClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      balloonsRef.current.forEach((balloon) => {
        if (balloon.popped) return;

        const dist = Math.sqrt(
          Math.pow(clickX - balloon.x, 2) + Math.pow(clickY - balloon.y, 2)
        );

        if (dist < balloon.radius) {
          balloon.popped = true;
          poppedRef.current++;
          addScore(10);
        }
      });
    };

    canvas.addEventListener('click', handleCanvasClick);

    // Spawn balloons
    const spawnInterval = setInterval(() => {
      if (gameState === 'playing' && balloonsRef.current.length < 15) {
        balloonsRef.current.push({
          id: balloonIdRef.current++,
          x: Math.random() * (canvas.width - 40) + 20,
          y: canvas.height,
          vx: (Math.random() - 0.5) * 2,
          vy: -2 - Math.random() * 1.5,
          radius: 20 + Math.random() * 10,
          color: colors[Math.floor(Math.random() * colors.length)],
          popped: false,
        });
      }
    }, 500);

    // Game loop
    const gameLoop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      balloonsRef.current = balloonsRef.current
        .map((balloon) => {
          if (!balloon.popped) {
            balloon.x += balloon.vx;
            balloon.y += balloon.vy;
            balloon.vy += 0.05; // gravity
          }
          return balloon;
        })
        .filter((balloon) => balloon.y < canvas.height);

      // Draw balloons
      balloonsRef.current.forEach((balloon) => {
        ctx.fillStyle = balloon.color;
        ctx.globalAlpha = balloon.popped ? 0.3 : 1;
        ctx.beginPath();
        ctx.arc(balloon.x, balloon.y, balloon.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;

        // Draw string
        ctx.strokeStyle = '#999';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(balloon.x, balloon.y + balloon.radius);
        ctx.lineTo(balloon.x, balloon.y + balloon.radius + 30);
        ctx.stroke();

        if (balloon.popped) {
          ctx.font = '20px Arial';
          ctx.fillStyle = '#ff0000';
          ctx.fillText('💥', balloon.x - 10, balloon.y - 10);
        }
      });

      // Draw score
      ctx.fillStyle = '#333';
      ctx.font = 'bold 16px Arial';
      ctx.fillText(`Popped: ${poppedRef.current}`, 10, 30);
      ctx.fillText(`Time: ${formatTime(time)}`, 10, 55);

      if (time < GAME_DURATION) {
        animationIdRef.current = requestAnimationFrame(gameLoop);
      } else {
        setGameState('completed');
        completeGame('Balloon Popper');
        onComplete('🎈 Balloon Popper');
      }
    };

    animationIdRef.current = requestAnimationFrame(gameLoop);

    return () => {
      canvas.removeEventListener('click', handleCanvasClick);
      clearInterval(spawnInterval);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, [gameState, time, formatTime, addScore, completeGame, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center space-y-4"
    >
      <h1 className="text-4xl font-serif font-bold text-accent mb-4">Pop the Balloons</h1>
      <p className="text-foreground/70 mb-4">Click on balloons to pop them before they float away!</p>

      <canvas
        ref={canvasRef}
        width={400}
        height={400}
        className="border-2 border-accent rounded-lg bg-white/30 backdrop-blur-sm cursor-crosshair"
      />

      {gameState === 'completed' && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="mt-6 text-center"
        >
          <p className="text-2xl font-semibold text-accent mb-2">Game Over!</p>
          <p className="text-xl text-foreground">You popped {poppedRef.current} balloons!</p>
        </motion.div>
      )}
    </motion.div>
  );
}
