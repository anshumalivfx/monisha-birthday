"use client";

import { useEffect, useRef, useState } from "react";

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
  const [isPressed, setIsPressed] = useState(false);
  const [puzzleInput, setPuzzleInput] = useState("");
  const [puzzleSolved, setPuzzleSolved] = useState(false);
  const [puzzleHint, setPuzzleHint] = useState("");
  const [wishLine, setWishLine] = useState("");
  const burstTimerRef = useRef<number | null>(null);
  const [wishFlash, setWishFlash] = useState(false);
  const flashTimerRef = useRef<number | null>(null);
  const [gameReveal, setGameReveal] = useState<number | null>(null);
  const [gameWin, setGameWin] = useState(false);
  const [winningIndex, setWinningIndex] = useState(() => Math.floor(Math.random() * 3));

  useEffect(() => {
    // Generate confetti
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
      emoji: ["🌸", "🌷", "🌹", "🌺"][Math.floor(Math.random() * 4)],
    }));
    setFlowers(flw);
  }, []);

  const wishes = [
    "Your wish is already on its way. ✨",
    "May your year sparkle with kindness and sweet surprises.",
    "A little magic for you, right now. 🌸",
    "Wishes made with love always find their way home.",
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

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-cream via-rose-50 to-cream">
      {/* Confetti */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {confetti.map((c) => (
          <div
            key={c.id}
            className="absolute animate-confetti"
            style={{
              left: `${c.left}%`,
              top: "-20px",
              animation: `confetti ${c.duration}s ease-in ${c.delay}s infinite`,
            }}
          >
            {["🎉", "✨", "💕", "🎂"][Math.floor(Math.random() * 4)]}
          </div>
        ))}
        {wishBurst.map((c) => (
          <div
            key={`burst-${c.id}`}
            className="absolute animate-confetti"
            style={{
              left: `${c.left}%`,
              top: "-10px",
              animation: `confetti ${c.duration}s ease-in ${c.delay}s`,
            }}
          >
            {"✨"}
          </div>
        ))}
      </div>

      {/* Floating Flowers Background */}
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

      {/* Main Content */}
      <main className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 py-20">
        {/* Decorative flowers around title */}
        <div className="absolute top-10 left-5 text-5xl opacity-30 animate-bounce">🌸</div>
        <div className="absolute top-20 right-8 text-6xl opacity-30 animate-bounce" style={{ animationDelay: "0.3s" }}>
          🌷
        </div>
        <div className="absolute bottom-40 left-10 text-5xl opacity-30 animate-bounce" style={{ animationDelay: "0.6s" }}>
          🌹
        </div>

        {/* Main greeting card */}
        <div className="max-w-3xl mx-auto text-center space-y-8 bg-white/40 backdrop-blur-md rounded-3xl p-12 shadow-2xl border border-white/60">
          {/* Top decoration */}
          <div className="flex justify-center gap-3">
            <span className="text-4xl">🌸</span>
            <span className="text-4xl">🎂</span>
            <span className="text-4xl">🌷</span>
          </div>

          {/* Main text */}
          <div className="space-y-6">
            <p className="text-rose-400 font-display text-lg font-semibold tracking-widest">
              ✨ A SPECIAL DAY FOR SOMEONE SPECIAL ✨
            </p>
            <h1 className="font-serif text-6xl sm:text-7xl lg:text-8xl font-bold text-gradient">
              Happy Birthday
            </h1>
            <h2 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-light text-rose-500 animate-pulse">
              Monisha
            </h2>
          </div>

          {/* Message */}
          <p className="text-foreground/80 text-lg leading-relaxed max-w-xl mx-auto font-light">
            On this beautiful day, we celebrate you and everything that makes you wonderful. Your smile brings joy, your kindness inspires us, and your presence makes the world more beautiful.
          </p>

          {/* Wish + puzzle */}
          <div className="pt-6 space-y-4">
            <div className="space-y-3">
              <p className="text-sm text-foreground/80">Solve the puzzle or find the lucky petal to trigger a special sparkle.</p>
            </div>

            <div className="mx-auto max-w-md rounded-2xl bg-white/60 p-5 text-left shadow-lg">
              <p className="text-sm uppercase tracking-[0.2em] text-rose-400">Bonus Puzzle</p>
              <p className="mt-2 text-lg font-semibold text-foreground">How many letters are in “Monisha”?</p>
              <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                <input
                  value={puzzleInput}
                  onChange={(event) => {
                    setPuzzleInput(event.target.value);
                    setPuzzleHint("");
                  }}
                  inputMode="numeric"
                  placeholder="Type a number"
                  className="w-full rounded-full border border-rose-200 bg-white/80 px-4 py-2 text-foreground shadow-sm focus:border-rose-400 focus:outline-none"
                />
                <button
                  onClick={() => {
                    if (puzzleInput.trim() === "7") {
                      setPuzzleSolved(true);
                      setPuzzleHint("");
                      triggerWish();
                    } else {
                      setPuzzleHint("Almost! Count the letters carefully.");
                    }
                  }}
                  className="rounded-full bg-rose-400 px-6 py-2 font-semibold text-white shadow-md transition hover:bg-rose-500"
                >
                  Unlock
                </button>
              </div>
              {puzzleHint ? <p className="mt-3 text-sm text-rose-500">{puzzleHint}</p> : null}
              {puzzleSolved ? (
                <p className="mt-3 text-sm font-semibold text-rose-400">Bonus sparkle unlocked.</p>
              ) : null}
            </div>
          </div>

          {/* Mini game */}
          <div className="mt-6 rounded-3xl border border-white/60 bg-white/40 p-6 shadow-xl">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.25em] text-rose-400">Lucky Petal</p>
                <p className="mt-1 text-lg font-semibold text-foreground">Pick the petal with the hidden sparkle.</p>
              </div>
              <button
                onClick={resetGame}
                className="rounded-full border border-rose-200 bg-white/70 px-4 py-2 text-sm font-semibold text-rose-500 transition hover:bg-white"
              >
                Play again
              </button>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              {[0, 1, 2].map((index) => {
                const revealed = gameReveal === index;
                const isWinner = revealed && index === winningIndex;
                return (
                  <button
                    key={`petal-${index}`}
                    onClick={() => handleGamePick(index)}
                    className={`rounded-2xl border border-white/60 px-6 py-8 text-3xl shadow-md transition hover:-translate-y-1 hover:bg-white/70 ${
                      revealed ? "bg-white/90" : "bg-white/40"
                    }`}
                  >
                    {revealed ? (isWinner ? "✨" : "🌸") : "🌷"}
                  </button>
                );
              })}
            </div>

            {gameReveal !== null ? (
              <p className="mt-4 text-sm font-semibold text-rose-500">
                {gameWin ? "You found the sparkle! Make a wish." : "So close! Try again for the sparkle."}
              </p>
            ) : null}
          </div>

          {/* Bottom decoration */}
          <div className="flex justify-center gap-3 pt-4">
            <span className="text-4xl">🌺</span>
            <span className="text-4xl">💫</span>
            <span className="text-4xl">🌸</span>
          </div>
        </div>

        {/* Wishes section */}
        <div className="mt-24 max-w-4xl mx-auto w-full">
          <h2 className="text-center font-serif text-4xl mb-12 text-foreground font-light">
            Special Wishes for You
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                emoji: "🌟",
                title: "Be You",
                message: "Never apologize for being authentically, brilliantly you.",
              },
              {
                emoji: "💖",
                title: "Love Always",
                message: "Surround yourself with love and give it freely to others.",
              },
              {
                emoji: "🎈",
                title: "Dream Big",
                message: "Your dreams are valid and deserve to come true.",
              },
            ].map((wish, i) => (
              <div
                key={i}
                className="group p-8 rounded-2xl bg-white/30 backdrop-blur-sm border border-white/50 hover:bg-white/50 transition-all duration-300 transform hover:-translate-y-2"
              >
                <p className="text-5xl mb-4">{wish.emoji}</p>
                <h3 className="font-serif text-2xl font-light text-rose-500 mb-2">{wish.title}</h3>
                <p className="text-foreground/70 font-light leading-relaxed">{wish.message}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Final message */}
        <div className="mt-20 text-center max-w-2xl mx-auto">
          <p className="font-light text-lg text-foreground/70 mb-4">
            Here's to a year filled with beautiful moments, wonderful adventures, and endless happiness.
          </p>
          <p className="font-display text-rose-400 text-2xl">✨ Wishing you the most magical birthday ✨</p>
        </div>
      </main>
    </div>
  );
}
