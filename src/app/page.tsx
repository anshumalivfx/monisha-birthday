"use client";

import { useState } from "react";

export default function Home() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <div className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20">
        {/* Subtle background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-accent/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/5 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
          {/* Top label */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-foreground/10 bg-foreground/5 w-fit mx-auto">
            <span className="w-2 h-2 bg-accent rounded-full"></span>
            <span className="text-sm font-medium tracking-wide">CELEBRATING TODAY</span>
          </div>

          {/* Main heading */}
          <div className="space-y-4">
            <h1 className="font-serif text-6xl sm:text-7xl lg:text-8xl font-light leading-tight text-balance">
              Happy Birthday
            </h1>
            <p className="font-serif text-5xl sm:text-6xl lg:text-7xl font-light text-accent">
              Monisha
            </p>
          </div>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-foreground/70 max-w-2xl mx-auto leading-relaxed font-light">
            May this day be filled with moments that take your breath away and memories that warm your heart for years to come.
          </p>

          {/* CTA Button */}
          <div className="pt-4">
            <button
              onClick={() => setIsHovered(!isHovered)}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="inline-flex items-center gap-3 px-8 py-4 bg-foreground text-background rounded-full hover:gap-4 transition-all duration-300 font-medium text-lg"
            >
              Celebrate with me
              <span className={`transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`}>→</span>
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="animate-bounce">
            <div className="w-6 h-10 border-2 border-foreground/30 rounded-full flex items-start justify-center p-2">
              <div className="w-1 h-2 bg-foreground/30 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Wishes Section */}
      <div className="py-20 px-6 bg-secondary/5 border-t border-foreground/10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl sm:text-5xl font-light mb-4">Birthday Wishes</h2>
            <div className="w-12 h-1 bg-accent mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Dream Big",
                text: "Chase the dreams that make your heart race and never settle for anything less than extraordinary.",
              },
              {
                title: "Live Fully",
                text: "Every moment is a gift. Live with intention, love with passion, and celebrate every small victory.",
              },
              {
                title: "Shine Bright",
                text: "Your light illuminates the world around you. Keep being the remarkable person you are.",
              },
            ].map((wish, i) => (
              <div key={i} className="group p-8 rounded-lg border border-foreground/10 hover:border-accent/30 bg-white/2 hover:bg-accent/5 transition-all duration-300">
                <h3 className="font-serif text-2xl font-light mb-4 text-accent">{wish.title}</h3>
                <p className="text-foreground/70 font-light leading-relaxed">{wish.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl sm:text-5xl font-light mb-4">Your Journey</h2>
            <div className="w-12 h-1 bg-accent mx-auto"></div>
          </div>

          <div className="space-y-12">
            {[
              { year: "Today", title: "A New Year Begins", desc: "Celebrating the wonderful person you are" },
              { year: "This Year", title: "New Adventures Await", desc: "May you find joy in every unexpected moment" },
              { year: "Forever", title: "Timeless Memories", desc: "Building a legacy of love and laughter" },
            ].map((item, i) => (
              <div key={i} className="flex gap-8 items-start">
                <div className="flex-shrink-0 w-24">
                  <div className="text-sm font-medium text-accent">{item.year}</div>
                </div>
                <div className="flex-grow pb-8 border-l border-foreground/10 pl-8 relative">
                  <div className="absolute w-3 h-3 bg-accent rounded-full -left-[7px] top-1"></div>
                  <h3 className="font-serif text-2xl font-light mb-2">{item.title}</h3>
                  <p className="text-foreground/60 font-light">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="py-12 px-6 border-t border-foreground/10 bg-foreground/2">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-foreground/60 font-light text-sm">
            With love and warmest wishes
          </p>
        </div>
      </div>
    </div>
  );
}
