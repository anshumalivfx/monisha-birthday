'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useGameState } from '@/hooks/useGameState';

interface FindFlowerGameProps {
  onComplete: (reward: string) => void;
}

interface Cell {
  id: number;
  revealed: boolean;
  isLucky: boolean;
  emoji: string;
}

export function FindFlowerGame({ onComplete }: FindFlowerGameProps) {
  const [cells, setCells] = useState<Cell[]>([]);
  const [attempts, setAttempts] = useState(0);
  const [gameState, setGameState] = useState<'playing' | 'completed'>('playing');
  const { completeGame } = useGameState(0);

  const GRID_SIZE = 16;
  const MAX_ATTEMPTS = 8;

  useEffect(() => {
    // Initialize grid
    const newCells: Cell[] = Array.from({ length: GRID_SIZE }, (_, i) => ({
      id: i,
      revealed: false,
      isLucky: i === Math.floor(Math.random() * GRID_SIZE),
      emoji: ['🌸', '🌷', '🌹', '🌺'][Math.floor(Math.random() * 4)],
    }));
    setCells(newCells);
  }, []);

  const handleCellClick = (id: number) => {
    if (gameState !== 'playing') return;

    setCells((prevCells) =>
      prevCells.map((cell) => (cell.id === id ? { ...cell, revealed: true } : cell))
    );

    const clickedCell = cells.find((c) => c.id === id);
    if (clickedCell?.isLucky) {
      setGameState('completed');
      completeGame('Lucky Flower Finder');
      onComplete('🌸 Lucky Flower Finder');
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      if (newAttempts >= MAX_ATTEMPTS) {
        setGameState('completed');
        completeGame('Lucky Flower Finder');
        onComplete('🌸 Lucky Flower Finder');
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center space-y-6"
    >
      <div className="text-center">
        <h1 className="text-4xl font-serif font-bold text-accent mb-2">Find the Lucky Flower</h1>
        <p className="text-foreground/70">Find the special flower among all the beautiful ones!</p>
        <p className="text-sm text-accent mt-2">Attempts left: {MAX_ATTEMPTS - attempts}</p>
      </div>

      <div className="grid grid-cols-4 gap-3 p-4 bg-white/20 backdrop-blur-sm rounded-2xl">
        {cells.map((cell) => (
          <motion.button
            key={cell.id}
            onClick={() => handleCellClick(cell.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`w-16 h-16 rounded-lg font-semibold text-2xl transition-all ${
              cell.revealed
                ? 'bg-white/60 border-2 border-accent cursor-default'
                : 'glass-card hover:bg-white/50 cursor-pointer'
            }`}
            disabled={cell.revealed}
          >
            {cell.revealed ? (cell.isLucky ? '✨' : cell.emoji) : '?'}
          </motion.button>
        ))}
      </div>

      {gameState === 'completed' && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <p className="text-2xl font-semibold text-accent mb-2">
            {attempts < MAX_ATTEMPTS ? 'You found it!' : 'Game Over!'}
          </p>
          <p className="text-foreground">Attempts used: {attempts}</p>
        </motion.div>
      )}
    </motion.div>
  );
}
