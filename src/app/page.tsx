'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { HeroSection } from '@/components/hero-section';
import { AnimatedCake } from '@/components/animated-cake';
import { FloatingBalloons } from '@/components/floating-balloons';
import { GiftBox } from '@/components/gift-box';
import { Fireworks } from '@/components/fireworks';
import { ParticlesCanvas } from '@/components/particles-canvas';

interface Confetti {
  id: number;
  left: number;
  delay: number;
  duration: number;
}

interface Flower {
  id: number;
  left: number;
  top: number;
  delay: number;
  emoji: string;
}

export default function Home() {
  const [confetti, setConfetti] = useState<Confetti[]>([]);
  const [wishBurst, setWishBurst] = useState<Confetti[]>([]);
  const [flowers, setFlowers] = useState<Flower[]>([]);
  const [puzzleInput, setPuzzleInput] = useState('');
  const [puzzleSolved, setPuzzleSolved] = useState(false);
  const [puzzleHint, setPuzzleHint] = useState('');
  const [wishLine, setWishLine] = useState('');
  const burstTimerRef = useRef<number | null>(null);
  const [wishFlash, setWishFlash] = useState(false);
  const flashTimerRef = useRef<number | null>(null);
  const [gameReveal, setGameReveal] = useState<number | null>(null);
  const [gameWin, setGameWin] = useState(false);
  const [winningIndex, setWinningIndex] = useState(() =>
    Math.floor(Math.random() * 3)
  );
  const [showFireworks, setShowFireworks] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [musicPlaying, setMusicPlaying] = useState(false);

  useEffect(() => {
    // Generate confetti on page load
    const conf = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 0.5,
      duration: 2 + Math.random() * 1,
    }));
    setConfetti(conf);

    // Generate flowers
    const flw = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: -50 - Math.random() * 50,
      delay: Math.random() * 0.8,
      emoji: ['🌸', '🌷', '🌹', '🌺'][Math.floor(Math.random() * 4)],
    }));
    setFlowers(flw);
  }, []);

  const wishes = [
    'Your wish is already on its way. ✨',
    'May your year sparkle with kindness and sweet surprises.',
    'A little magic for you, right now. 🌸',
    'Wishes made with love always find their way home.',
  ];

  const triggerWish = () => {
    const burst = Array.from({ length: 28 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 0.2,
      duration: 1.6 + Math.random() * 0.8,
    }));
    setWishBurst(burst);
    setWishLine(wishes[Math.floor(Math.random() * wishes.length)]);
    setWishFlash(true);

    if (burstTimerRef.current) {
      window.clearTimeout(burstTimerRef.current);
    }
    burstTimerRef.current = window.setTimeout(() => {
      setWishBurst([]);
    }, 2200);

    if (flashTimerRef.current) {
      window.clearTimeout(flashTimerRef.current);
    }
    flashTimerRef.current = window.setTimeout(() => {
      setWishFlash(false);
    }, 900);
  };

  const handleGamePick = (index: number) => {
    if (gameReveal !== null) {
      return;
    }
    setGameReveal(index);
    setGameWin(index === winningIndex);
  };

  const resetGame = () => {
    setGameReveal(null);
    setGameWin(false);
    setWinningIndex(Math.floor(Math.random() * 3));
  };

  const handleCelebrate = () => {
    setShowFireworks(true);
    setTimeout(() => setShowFireworks(false), 1500);
  };

  return (
    <div
      className={`relative min-h-screen overflow-x-hidden transition-colors duration-500 ${
        theme === 'dark'
          ? 'bg-gradient-to-b from-gray-900 via-pink-900 to-gray-900'
          : 'bg-gradient-to-b from-cyan-50 via-pink-50 to-purple-50'
      }`}
    >
      {/* Particle canvas for cursor trail */}
      <ParticlesCanvas />

      {/* Confetti and particles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {confetti.map((c) => (
          <div
            key={c.id}
            className="absolute animate-confetti"
            style={{
              left: `${c.left}%`,
              top: '-20px',
              animation: `confetti ${c.duration}s ease-in ${c.delay}s infinite`,
            }}
          >
            {['🎉', '✨', '💕', '🎂'][Math.floor(Math.random() * 4)]}
          </div>
        ))}
        {wishBurst.map((c) => (
          <div
            key={`burst-${c.id}`}
            className="absolute animate-confetti"
            style={{
              left: `${c.left}%`,
              top: '-10px',
              animation: `confetti ${c.duration}s ease-in ${c.delay}s`,
            }}
          >
            ✨
          </div>
        ))}
      </div>

      {/* Floating flowers background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {flowers.map((f) => (
          <div
            key={f.id}
            className="absolute text-4xl opacity-20 animate-float"
            style={{
              left: `${f.left}%`,
              top: `${f.top}px`,
              animation: `float ${8 + Math.random() * 4}s ease-in-out ${f.delay}s infinite`,
            }}
          >
            {f.emoji}
          </div>
        ))}
      </div>

      {/* Floating balloons */}
      <FloatingBalloons />

      {/* Fireworks */}
      <Fireworks isActive={showFireworks} />

      {/* Theme and music toggles */}
      <motion.div
        className="fixed top-6 right-6 z-50 flex gap-3"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <button
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          className="glass-card px-4 py-2 rounded-full text-sm font-semibold hover:scale-105 transition-transform"
          title="Toggle theme"
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
        <button
          onClick={() => setMusicPlaying(!musicPlaying)}
          className="glass-card px-4 py-2 rounded-full text-sm font-semibold hover:scale-105 transition-transform"
          title="Toggle music"
        >
          {musicPlaying ? '🔊' : '🔕'}
        </button>
      </motion.div>

      {/* Main content */}
      <main className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 py-12 sm:py-20">
        {/* Hero section */}
        <HeroSection />

        {/* Animated cake section */}
        <motion.section
          className="mt-20 w-full max-w-2xl"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="glass-card rounded-3xl p-8 sm:p-12 text-center space-y-6">
            <h2 className="font-serif text-3xl sm:text-4xl font-light text-foreground">
              Make a Wish
            </h2>
            <AnimatedCake />
          </div>
        </motion.section>

        {/* Puzzle section */}
        <motion.section
          className="mt-16 w-full max-w-md"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="glass-card rounded-2xl p-6 sm:p-8 space-y-4">
            <div>
              <p className="text-sm uppercase tracking-widest font-semibold text-accent">
                Bonus Puzzle
              </p>
              <p className="mt-2 text-lg font-semibold text-foreground">
                How many letters are in "Monisha"?
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                value={puzzleInput}
                onChange={(event) => {
                  setPuzzleInput(event.target.value);
                  setPuzzleHint('');
                }}
                inputMode="numeric"
                placeholder="Type a number"
                className="flex-1 rounded-full border border-accent/30 bg-white/60 px-4 py-2 text-foreground focus:border-accent focus:outline-none transition"
              />
              <button
                onClick={() => {
                  if (puzzleInput.trim() === '7') {
                    setPuzzleSolved(true);
                    setPuzzleHint('');
                    triggerWish();
                  } else {
                    setPuzzleHint('Almost! Count the letters carefully.');
                  }
                }}
                className="glow-btn"
              >
                Unlock
              </button>
            </div>
            {puzzleHint && (
              <p className="text-sm text-accent font-medium">{puzzleHint}</p>
            )}
            {puzzleSolved && (
              <p className="text-sm text-accent font-semibold">
                Bonus sparkle unlocked.
              </p>
            )}
          </div>
        </motion.section>

        {/* Gift box section */}
        <motion.section
          className="mt-16 w-full max-w-md"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="glass-card rounded-2xl p-8 text-center">
            <p className="text-sm uppercase tracking-widest font-semibold text-accent mb-6">
              Special Surprise
            </p>
            <GiftBox />
          </div>
        </motion.section>

        {/* Petal game section */}
        <motion.section
          className="mt-16 w-full max-w-2xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="glass-card rounded-3xl p-6 sm:p-8 space-y-6">
            <div>
              <p className="text-sm uppercase tracking-widest font-semibold text-accent">
                Lucky Petal
              </p>
              <p className="mt-2 text-lg font-semibold text-foreground">
                Pick the petal with the hidden sparkle
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3 sm:gap-4">
              {[0, 1, 2].map((index) => {
                const revealed = gameReveal === index;
                const isWinner = revealed && index === winningIndex;
                return (
                  <motion.button
                    key={`petal-${index}`}
                    onClick={() => handleGamePick(index)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`rounded-xl sm:rounded-2xl px-4 sm:px-6 py-6 sm:py-8 text-2xl sm:text-3xl font-semibold transition-all ${
                      revealed
                        ? 'glass-card'
                        : 'glass-card hover:bg-white/50'
                    }`}
                  >
                    {revealed ? (isWinner ? '✨' : '🌸') : '🌷'}
                  </motion.button>
                );
              })}
            </div>

            {gameReveal !== null && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
              >
                <p className="text-sm font-semibold text-accent">
                  {gameWin
                    ? "You found the sparkle! Make a wish."
                    : 'So close! Try again for the sparkle.'}
                </p>
                {gameWin && (
                  <button
                    onClick={resetGame}
                    className="mt-3 text-xs font-semibold text-primary hover:text-accent transition"
                  >
                    Play again
                  </button>
                )}
              </motion.div>
            )}
          </div>
        </motion.section>

        {/* Wishes grid section */}
        <motion.section
          className="mt-24 w-full max-w-4xl"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-center font-serif text-3xl sm:text-4xl font-light text-foreground mb-12">
            Special Wishes for You
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                emoji: '🌟',
                title: 'Be You',
                message:
                  'Never apologize for being authentically, brilliantly you.',
              },
              {
                emoji: '💖',
                title: 'Love Always',
                message:
                  'Surround yourself with love and give it freely to others.',
              },
              {
                emoji: '🎈',
                title: 'Dream Big',
                message: 'Your dreams are valid and deserve to come true.',
              },
            ].map((wish, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card-hover glass-card rounded-2xl p-6 sm:p-8"
              >
                <p className="text-4xl sm:text-5xl mb-4">{wish.emoji}</p>
                <h3 className="font-serif text-xl sm:text-2xl font-light text-accent mb-2">
                  {wish.title}
                </h3>
                <p className="text-foreground/70 font-light leading-relaxed text-sm sm:text-base">
                  {wish.message}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Celebrate button and final message */}
        <motion.section
          className="mt-24 text-center max-w-2xl space-y-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-light text-base sm:text-lg text-foreground/70 leading-relaxed">
            Here&apos;s to a year filled with beautiful moments, wonderful
            adventures, and endless happiness.
          </p>

          <motion.button
            onClick={handleCelebrate}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="glow-btn mx-auto text-base sm:text-lg px-8 py-3"
          >
            Celebrate Now! 🎉
          </motion.button>

          <p className="font-display text-accent text-xl sm:text-2xl">
            ✨ Wishing you the most magical birthday ✨
          </p>
        </motion.section>

        {/* Bottom spacing */}
        <div className="h-20" />
      </main>
    </div>
  );
}
