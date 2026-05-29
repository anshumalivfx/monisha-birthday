'use client';

import { motion } from 'framer-motion';

export interface Game {
  id: string;
  name: string;
  description: string;
  emoji: string;
  reward: string;
}

interface GameHubProps {
  games: Game[];
  onSelectGame: (gameId: string) => void;
  completedGames: Set<string>;
}

export function GameHub({ games, onSelectGame, completedGames }: GameHubProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center justify-center px-4 py-12"
    >
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl sm:text-6xl font-serif font-bold text-accent mb-4">
          Birthday Games
        </h1>
        <p className="text-foreground/70 text-lg">
          Play all 5 games to earn special rewards and celebrate!
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full">
        {games.map((game, idx) => (
          <motion.button
            key={game.id}
            onClick={() => onSelectGame(game.id)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ scale: 1.05, translateY: -5 }}
            whileTap={{ scale: 0.95 }}
            className="glass-card glass-card-hover rounded-2xl p-6 sm:p-8 text-left group relative overflow-hidden"
          >
            {/* Background glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-accent/0 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <span className="text-5xl">{game.emoji}</span>
                {completedGames.has(game.id) && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="text-2xl bg-green-200/50 rounded-full p-2"
                  >
                    ✓
                  </motion.div>
                )}
              </div>

              <h2 className="text-2xl font-semibold text-foreground mb-2">{game.name}</h2>
              <p className="text-foreground/70 text-sm mb-4">{game.description}</p>

              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-accent">Reward: {game.reward}</span>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="text-accent"
                >
                  →
                </motion.div>
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Progress indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-12 text-center"
      >
        <div className="inline-block glass-card rounded-full px-6 py-3">
          <p className="text-sm font-semibold text-foreground">
            Games Completed: <span className="text-accent">{completedGames.size}/{games.length}</span>
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
