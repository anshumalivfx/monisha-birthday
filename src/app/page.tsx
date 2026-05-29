import type { CSSProperties } from "react";

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

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-sweet text-ink">
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

      <main className="relative z-10 mx-auto flex min-h-screen w-full max-w-5xl flex-col items-center justify-center gap-10 px-6 py-24 text-center">
        <span className="ribbon">For Monisha</span>
        <div className="flex flex-col items-center gap-6">
          <p className="tagline">A tiny universe of confetti, just for you.</p>
          <h1 className="font-display text-4xl leading-tight sm:text-6xl">
            Happy Birthday
            <span className="name-glow">Monisha</span>
          </h1>
          <p className="max-w-2xl text-base leading-7 sm:text-lg">
            May your day be wrapped in soft petals, sweet surprises, and the kind of
            joy that keeps sparkling long after the candles are out.
          </p>
        </div>

        <div className="grid w-full gap-6 sm:grid-cols-2">
          <div className="wish-card">
            <p className="wish-title">Today feels extra magical.</p>
            <p>
              Wishing you laughter that bubbles over, wishes that land gently, and a
              year that feels like your favorite song.
            </p>
          </div>
          <div className="wish-card">
            <p className="wish-title">Keep glowing.</p>
            <p>
              You are kind, brilliant, and loved. May every step ahead feel cozy,
              bright, and full of sweet adventures.
            </p>
          </div>
        </div>

        <div className="signature">With warm birthday sparkles</div>
      </main>
    </div>
  );
}
