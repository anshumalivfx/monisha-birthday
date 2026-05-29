'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useGameState } from '@/hooks/useGameState';

interface PuzzleGameProps {
  onComplete: (reward: string) => void;
}

interface PuzzlePiece {
  id: number;
  correctPosition: number;
  currentPosition: number;
  label: string;
  emoji: string;
}

const PUZZLE_SEQUENCE = [
  { id: 0, label: 'Happy', emoji: '😊' },
  { id: 1, label: 'Birthday', emoji: '🎂' },
  { id: 2, label: 'Monisha', emoji: '👑' },
  { id: 3, label: 'Celebration', emoji: '🎉' },
];

export function PuzzleGame({ onComplete }: PuzzleGameProps) {
  const [pieces, setPieces] = useState<PuzzlePiece[]>([]);
  const [completed, setCompleted] = useState(false);
  const { completeGame } = useGameState(0);

  useEffect(() => {
    const shuffled = PUZZLE_SEQUENCE.map((piece, idx) => ({
      id: piece.id,
      correctPosition: idx,
      currentPosition: Math.floor(Math.random() * PUZZLE_SEQUENCE.length),
      label: piece.label,
      emoji: piece.emoji,
    })).sort(() => Math.random() - 0.5);

    setPieces(shuffled);
  }, []);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, id: number) => {
    e.dataTransfer!.effectAllowed = 'move';
    e.dataTransfer!.setData('pieceId', id.toString());
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer!.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, targetId: number) => {
    e.preventDefault();
    const draggedId = parseInt(e.dataTransfer!.getData('pieceId'));

    setPieces((prev) => {
      const draggedPiece = prev.find((p) => p.id === draggedId);
      const targetPiece = prev.find((p) => p.id === targetId);

      if (!draggedPiece || !targetPiece) return prev;

      const newPieces = prev.map((p) => {
        if (p.id === draggedId) return { ...p, currentPosition: targetPiece.currentPosition };
        if (p.id === targetId) return { ...p, currentPosition: draggedPiece.currentPosition };
        return p;
      });

      const isCompleted = newPieces.every((p) => p.currentPosition === p.correctPosition);
      if (isCompleted && !completed) {
        setCompleted(true);
        completeGame('Puzzle Master');
        onComplete('🧩 Puzzle Master');
      }

      return newPieces;
    });
  };

  const sortedPieces = [...pieces].sort((a, b) => a.currentPosition - b.currentPosition);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center space-y-6"
    >
      <div className="text-center">
        <h1 className="text-4xl font-serif font-bold text-accent mb-2">Birthday Puzzle</h1>
        <p className="text-foreground/70">Drag puzzle pieces to arrange them in the correct order!</p>
      </div>

      <div className="space-y-4">
        <p className="text-center text-sm text-foreground/60">Correct order: Happy Birthday Monisha Celebration</p>

        <div className="flex flex-wrap justify-center gap-2 p-4 bg-white/20 backdrop-blur-sm rounded-2xl min-h-24">
          {sortedPieces.map((piece) => (
            <div
              key={piece.id}
              draggable
              onDragStart={(e) => handleDragStart(e as any, piece.id)}
              onDragOver={(e) => handleDragOver(e as any)}
              onDrop={(e) => handleDrop(e as any, piece.id)}
              className={`px-4 py-3 rounded-lg font-semibold cursor-move transition-all ${
                piece.currentPosition === piece.correctPosition
                  ? 'bg-green-200/50 border-2 border-green-400 text-foreground hover:scale-105'
                  : 'glass-card text-foreground hover:bg-white/50 hover:scale-105'
              }`}
            >
              <span className="text-lg mr-2">{piece.emoji}</span>
              {piece.label}
            </div>
          ))}
        </div>
      </div>

      {completed && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <p className="text-2xl font-semibold text-accent mb-2">Perfect!</p>
          <p className="text-foreground">You solved the puzzle! Happy Birthday Monisha!</p>
        </motion.div>
      )}
    </motion.div>
  );
}
