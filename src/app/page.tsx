"use client";

import type { CSSProperties } from "react";
import { useState } from "react";

const confettiPieces = [
  { left: "6%", size: "10px", delay: "0s", duration: "8s", hue: "345" },
  { left: "14%", size: "12px", delay: "1.2s", duration: "9s", hue: "24" },
  { left: "22%", size: "8px", delay: "0.6s", duration: "7s", hue: "190" },
  { left: "30%", size: "11px", delay: "2.1s", duration: "8.5s", hue: "280" },
  { left: "38%", size: "9px", delay: "0.9s", duration: "7.8s", hue: "55" },
  { left: "46%", size: "13px", delay: "1.7s", duration: "9.4s", hue: "312" },
  { left: "54%", size: "8px", delay: "0.3s", duration: "7.2s", hue: "145" },
  { left: "62%", size: "12px", delay: "2.6s", duration: "8.7s", hue: "18" },
  { left: "70%", size: "10px", delay: "1.1s", duration: "8.1s", hue: "210" },
  { left: "78%", size: "9px", delay: "2.3s", duration: "7.6s", hue: "260" },
  { left: "86%", size: "12px", delay: "0.4s", duration: "8.9s", hue: "330" },
  { left: "93%", size: "8px", delay: "1.9s", duration: "7.4s", hue: "40" },
];

const petals = [
  { left: "8%", size: "16px", delay: "0s", duration: "10s" },
  { left: "18%", size: "12px", delay: "2s", duration: "12s" },
  { left: "26%", size: "18px", delay: "1.2s", duration: "11s" },
  { left: "36%", size: "14px", delay: "2.6s", duration: "13s" },
  { left: "45%", size: "20px", delay: "0.8s", duration: "12s" },
  { left: "56%", size: "15px", delay: "3.1s", duration: "11.5s" },
  { left: "66%", size: "18px", delay: "1.7s", duration: "12.8s" },
  { left: "74%", size: "14px", delay: "2.9s", duration: "10.6s" },
  { left: "84%", size: "19px", delay: "1.4s", duration: "12.2s" },
  { left: "92%", size: "13px", delay: "2.3s", duration: "11.2s" },
];

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
}

export default function Home() {
  const [score, setScore] = useState(0);
  const [clickPower, setClickPower] = useState(1);
  const [achievements, setAchievements] = useState<Achievement[]>([
    { id: "1", title: "First Wish", description: "Click the birthday cake", icon: "🎂", unlocked: false },
    { id: "2", title: "Cake Master", description: "Reach 100 clicks", icon: "👑", unlocked: false },
    { id: "3", title: "Party Animal", description: "Reach 500 clicks", icon: "🎉", unlocked: false },
    { id: "4", title: "Monisha's Champion", description: "Reach 1000 clicks", icon: "⭐", unlocked: false },
  ]);
  const [showPowerUpMsg, setShowPowerUpMsg] = useState(false);

  const handleCakeClick = () => {
    const newScore = score + clickPower;
    setScore(newScore);

    setAchievements((prev) =>
      prev.map((ach) => {
        if (ach.id === "1" && !ach.unlocked) {
          return { ...ach, unlocked: true };
        }
        if (ach.id === "2" && !ach.unlocked && newScore >= 100) {
          return { ...ach, unlocked: true };
        }
        if (ach.id === "3" && !ach.unlocked && newScore >= 500) {
          return { ...ach, unlocked: true };
        }
        if (ach.id === "4" && !ach.unlocked && newScore >= 1000) {
          return { ...ach, unlocked: true };
        }
        return ach;
      })
    );

    // Power up every 300 clicks
    if (newScore % 300 === 0 && newScore > 0) {
      setClickPower((prev) => prev + 1);
      setShowPowerUpMsg(true);
      setTimeout(() => setShowPowerUpMsg(false), 2000);
    }
  };

  const unlockedCount = achievements.filter((a) => a.unlocked).length;

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-primary via-secondary to-accent text-foreground">
      <div className="pointer-events-none absolute inset-0">
        <div className="bg-orbit bg-orbit-one" />
        <div className="bg-orbit bg-orbit-two" />
        <div className="bg-sparkle" />
      </div>

      <div className="confetti-layer" aria-hidden>
        {confettiPieces.map((piece, index) => (
          <span
            key={`confetti-${index}`}
            className="confetti-piece"
            style={
              {
                "--x": piece.left,
                "--size": piece.size,
                "--delay": piece.delay,
                "--duration": piece.duration,
                "--hue": piece.hue,
              } as CSSProperties
            }
          />
        ))}
      </div>

      <div className="petal-layer" aria-hidden>
        {petals.map((petal, index) => (
          <span
            key={`petal-${index}`}
            className="petal"
            style={
              {
                "--x": petal.left,
                "--size": petal.size,
                "--delay": petal.delay,
                "--duration": petal.duration,
              } as CSSProperties
            }
          />
        ))}
      </div>

      <main className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl flex-col items-center justify-center gap-8 px-6 py-12">
        {/* Header */}
        <div className="flex flex-col items-center gap-4 text-center">
          <span className="ribbon">🎂 For Monisha 🎂</span>
          <h1 className="font-display text-5xl leading-tight sm:text-7xl font-bold">
            Happy Birthday
          </h1>
          <p className="name-glow text-5xl sm:text-6xl">Monisha</p>
          <p className="max-w-2xl text-lg leading-7 sm:text-xl opacity-90">
            Click the cake to unlock your special birthday experience. Every click brings magic! ✨
          </p>
        </div>

        {/* Game Section */}
        <div className="flex w-full flex-col items-center gap-8 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 p-8 shadow-2xl lg:flex-row lg:gap-12">
          {/* Left: Cake Game */}
          <div className="flex flex-1 flex-col items-center gap-6">
            <button
              onClick={handleCakeClick}
              className="cake-button group relative h-40 w-40 sm:h-48 sm:w-48 cursor-pointer transform transition-all duration-100 hover:scale-110 active:scale-95"
              aria-label="Click the birthday cake"
            >
              <span className="text-8xl sm:text-9xl group-hover:scale-125 transition-transform duration-100">🎂</span>
            </button>

            <div className="text-center">
              <p className="text-sm opacity-75 uppercase tracking-wider">Your Score</p>
              <p className="text-5xl sm:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
                {score}
              </p>
              <p className="text-sm opacity-75 mt-2">Click Power: {clickPower}x ⚡</p>
            </div>

            {showPowerUpMsg && (
              <div className="animate-bounce text-center">
                <p className="text-xl font-bold text-yellow-300">⭐ Power Up! ⭐</p>
              </div>
            )}
          </div>

          {/* Right: Wishes & Messages */}
          <div className="flex flex-1 flex-col gap-6">
            <div className="wish-card-new">
              <p className="wish-title text-lg font-semibold mb-2">✨ Today feels extra magical</p>
              <p className="text-sm leading-relaxed">
                Wishing you laughter that bubbles over, wishes that land gently, and a year that feels like your favorite song.
              </p>
            </div>
            <div className="wish-card-new">
              <p className="wish-title text-lg font-semibold mb-2">💫 Keep glowing bright</p>
              <p className="text-sm leading-relaxed">
                You are kind, brilliant, and loved. May every step ahead feel cozy, bright, and full of sweet adventures.
              </p>
            </div>
            <div className="wish-card-new">
              <p className="wish-title text-lg font-semibold mb-2">🌟 You inspire us all</p>
              <p className="text-sm leading-relaxed">
                Your light touches everyone around you. Here&apos;s to celebrating the amazing person you are today and always.
              </p>
            </div>
          </div>
        </div>

        {/* Achievements Section */}
        <div className="w-full rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 p-8 shadow-2xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold flex items-center gap-3">
              🏆 Achievements
              <span className="text-lg opacity-75">({unlockedCount}/{achievements.length})</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`achievement-card p-6 rounded-2xl text-center transition-all duration-300 ${
                  achievement.unlocked
                    ? "bg-gradient-to-br from-yellow-300/20 to-orange-300/20 border border-yellow-300/50 scale-105"
                    : "bg-white/5 border border-white/20 opacity-60"
                }`}
              >
                <p className="text-4xl mb-2">{achievement.icon}</p>
                <p className="font-semibold text-sm sm:text-base mb-1">{achievement.title}</p>
                <p className="text-xs opacity-75">{achievement.description}</p>
                {achievement.unlocked && (
                  <div className="mt-3">
                    <span className="inline-block px-3 py-1 bg-yellow-400/30 text-yellow-200 rounded-full text-xs font-bold">
                      ✓ Unlocked
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="signature text-lg">With all the birthday sparkles and wishes ✨</p>
        </div>
      </main>
    </div>
  );
}
