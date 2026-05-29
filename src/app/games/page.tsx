'use client';

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { GameHub, type Game } from '@/components/game-hub';
import { GameScreen } from '@/components/game-screen';
import { CatchHeartsGame } from '@/components/games/catch-hearts-game';
import { FindFlowerGame } from '@/components/games/find-flower-game';
import { MemoryGame } from '@/components/games/memory-game';
import { PopBalloonsGame } from '@/components/games/pop-balloons-game';
import { PuzzleGame } from '@/components/games/puzzle-game';
import { CelebrationScreen } from '@/components/celebration-screen';

const GAMES: Game[] = [
  {
    id: 'hearts',
    name: 'Catch the Hearts',
    description: 'Move your basket to catch falling hearts before time runs out!',
    emoji: '❤️',
    reward: '🧺 Heart Catcher',
  },
  {
    id: 'flower',
    name: 'Find the Lucky Flower',
    description: 'Find the special golden flower among all the beautiful blooms!',
    emoji: '🌸',
    reward: '🌟 Lucky Flower Finder',
  },
  {
    id: 'memory',
    name: 'Memory Match',
    description: 'Test your memory by finding matching pairs!',
    emoji: '🧠',
    reward: '🏆 Memory Master',
  },
  {
    id: 'balloons',
    name: 'Pop the Balloons',
    description: 'Click to pop balloons before they float away!',
    emoji: '🎈',
    reward: '✨ Balloon Popper',
  },
  {
    id: 'puzzle',
    name: 'Birthday Puzzle',
    description: 'Drag and drop to arrange the birthday message!',
    emoji: '🧩',
    reward: '💝 Puzzle Master',
  },
];

export default function GamesPage() {
  const [currentGame, setCurrentGame] = useState<string | null>(null);
  const [completedGames, setCompletedGames] = useState<Set<string>>(new Set());
  const [rewards, setRewards] = useState<string[]>([]);

  const handleSelectGame = (gameId: string) => {
    setCurrentGame(gameId);
  };

  const handleGameComplete = (reward: string) => {
    const gameId = GAMES.find((g) => g.reward === reward)?.id;
    if (gameId && !completedGames.has(gameId)) {
      const newCompleted = new Set(completedGames);
      newCompleted.add(gameId);
      setCompletedGames(newCompleted);

      const newRewards = [...rewards, reward];
      setRewards(newRewards);

      if (newCompleted.size === GAMES.length) {
        setTimeout(() => {
          setCurrentGame('celebration');
        }, 1500);
      } else {
        setTimeout(() => {
          setCurrentGame(null);
        }, 2000);
      }
    }
  };

  const handleBackToHub = () => {
    setCurrentGame(null);
  };

  const handleCelebrateFinish = () => {
    setCurrentGame(null);
    setCompletedGames(new Set());
    setRewards([]);
  };

  const renderGameContent = () => {
    switch (currentGame) {
      case 'hearts':
        return (
          <GameScreen gameName="Catch the Hearts" gameEmoji="❤️" onBack={handleBackToHub}>
            <CatchHeartsGame onComplete={handleGameComplete} />
          </GameScreen>
        );
      case 'flower':
        return (
          <GameScreen gameName="Find the Lucky Flower" gameEmoji="🌸" onBack={handleBackToHub}>
            <FindFlowerGame onComplete={handleGameComplete} />
          </GameScreen>
        );
      case 'memory':
        return (
          <GameScreen gameName="Memory Match" gameEmoji="🧠" onBack={handleBackToHub}>
            <MemoryGame onComplete={handleGameComplete} />
          </GameScreen>
        );
      case 'balloons':
        return (
          <GameScreen gameName="Pop the Balloons" gameEmoji="🎈" onBack={handleBackToHub}>
            <PopBalloonsGame onComplete={handleGameComplete} />
          </GameScreen>
        );
      case 'puzzle':
        return (
          <GameScreen gameName="Birthday Puzzle" gameEmoji="🧩" onBack={handleBackToHub}>
            <PuzzleGame onComplete={handleGameComplete} />
          </GameScreen>
        );
      case 'celebration':
        return <CelebrationScreen rewards={rewards} onContinue={handleCelebrateFinish} />;
      default:
        return (
          <GameHub
            games={GAMES}
            onSelectGame={handleSelectGame}
            completedGames={completedGames}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-50 via-pink-50 to-purple-50">
      <AnimatePresence mode="wait">{renderGameContent()}</AnimatePresence>
    </div>
  );
}
