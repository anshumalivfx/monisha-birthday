'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useGameState } from '@/hooks/useGameState';

interface MemoryGameProps {
  onComplete: (reward: string) => void;
}

interface Card {
  id: number;
  emoji: string;
  matched: boolean;
  flipped: boolean;
}

export function MemoryGame({ onComplete }: MemoryGameProps) {
  const [cards, setCards] = useState<Card[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matched, setMatched] = useState(0);
  const { completeGame } = useGameState(0);

  const PAIRS = 8;
  const TOTAL_CARDS = PAIRS * 2;
  const emojis = ['🎂', '🎈', '💝', '🌹', '✨', '💖', '🎉', '🌸'];

  useEffect(() => {
    // Initialize cards
    const shuffled = [...emojis, ...emojis]
      .sort(() => Math.random() - 0.5)
      .map((emoji, i) => ({
        id: i,
        emoji,
        matched: false,
        flipped: false,
      }));
    setCards(shuffled);
  }, []);

  useEffect(() => {
    if (flipped.length !== 2) return;

    const [first, second] = flipped;
    if (cards[first].emoji === cards[second].emoji) {
      setCards((prev) =>
        prev.map((card, i) =>
          i === first || i === second ? { ...card, matched: true } : card
        )
      );
      setMatched((prev) => prev + 1);
      setFlipped([]);
    } else {
      setTimeout(() => {
        setFlipped([]);
      }, 600);
    }
    setMoves((prev) => prev + 1);
  }, [flipped, cards]);

  useEffect(() => {
    if (matched === PAIRS && matched > 0) {
      completeGame('Memory Master');
      onComplete('🧠 Memory Master');
    }
  }, [matched, completeGame, onComplete]);

  const toggleFlip = (id: number) => {
    if (cards[id].matched || flipped.includes(id) || flipped.length === 2) return;
    setFlipped((prev) => [...prev, id]);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center space-y-6"
    >
      <div className="text-center">
        <h1 className="text-4xl font-serif font-bold text-accent mb-2">Memory Match</h1>
        <p className="text-foreground/70">Find matching pairs!</p>
        <div className="flex justify-center gap-8 mt-4 text-sm">
          <p className="text-foreground">Pairs found: {matched}/{PAIRS}</p>
          <p className="text-foreground">Moves: {moves}</p>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3 p-4 bg-white/20 backdrop-blur-sm rounded-2xl">
        {cards.map((card) => (
          <motion.button
            key={card.id}
            onClick={() => toggleFlip(card.id)}
            whileHover={!card.matched ? { scale: 1.05 } : {}}
            whileTap={!card.matched ? { scale: 0.95 } : {}}
            initial={false}
            animate={{ rotateY: card.matched || flipped.includes(card.id) ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className={`w-16 h-16 rounded-lg font-bold text-2xl transition-all ${
              card.matched
                ? 'bg-green-200/50 cursor-default'
                : flipped.includes(card.id)
                  ? 'glass-card'
                  : 'glass-card hover:bg-white/50 cursor-pointer'
            }`}
            disabled={card.matched}
          >
            {card.matched || flipped.includes(card.id) ? card.emoji : '?'}
          </motion.button>
        ))}
      </div>

      {matched === PAIRS && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <p className="text-2xl font-semibold text-accent mb-2">Congratulations!</p>
          <p className="text-foreground">You completed it in {moves} moves!</p>
        </motion.div>
      )}
    </motion.div>
  );
}
