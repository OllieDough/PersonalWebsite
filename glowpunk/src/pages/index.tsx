"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const sections = [
  "Hi. I'm Oliver Do. Pleasure to meet you.",
  "What can I help you with?",
  "Here’s what I love to do.",
  "Guitar, food, movement, making cool sh*t.",
  "The future is soft, wild, and glowing.",
];

const capricornStars = [
  { top: "20%", left: "30%" },
  { top: "22%", left: "34%" },
  { top: "25%", left: "39%" },
  { top: "28%", left: "43%" },
  { top: "26%", left: "48%" },
  { top: "29%", left: "52%" },
  { top: "32%", left: "56%" },
  { top: "30%", left: "60%" },
];

// Twinkling white stars
const generateStars = (count: number) => {
  const stars = [];
  for (let i = 0; i < count; i++) {
    const size = Math.random() * 2 + 1;
    const left = Math.random() * 100;
    const top = Math.random() * 100;
    const duration = Math.random() * 3 + 1.5;
    const delay = Math.random() * 5;
    stars.push(
      <div
        key={`star-${i}`}
        className="absolute rounded-full bg-white opacity-70"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          left: `${left}%`,
          top: `${top}%`,
          animation: `twinkle ${duration}s ease-in-out ${delay}s infinite`,
        }}
      ></div>
    );
  }
  return stars;
};

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = (e: WheelEvent) => {
    e.preventDefault();
    const dir = e.deltaY > 0 ? 1 : -1;
    setCurrentIndex((prev) => {
      const next = prev + dir;
      if (next < 0 || next >= sections.length) return prev;
      return next;
    });
  };

  useEffect(() => {
    window.addEventListener("wheel", handleScroll, { passive: false });
    return () => window.removeEventListener("wheel", handleScroll);
  }, []);

  const fontOptions = ["monospace", "serif", "cursive", "sans-serif"];

  return (
    <div className="h-screen w-screen overflow-hidden bg-black text-white relative font-mono">
      {/* 🌌 Purple Spinning Glow Background */}
      <div className="space stars1" />
      <div className="space stars2" />
      <div className="space stars3" />

      {/* ✨ White Twinkling Stars */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {generateStars(100)}
      </div>

      {/* 🐐 Capricorn Constellation */}
      {currentIndex === 0 &&
        capricornStars.map((pos, i) => (
          <div
            key={`capricorn-${i}`}
            className="absolute w-[4px] h-[4px] bg-purple-300 rounded-full shadow-md shadow-purple-500 z-10"
            style={{ top: pos.top, left: pos.left }}
          ></div>
        ))}

      {/* 🎤 Section Text */}
      <div className="h-full w-full flex flex-col items-center justify-center gap-12 z-20 relative">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="text-3xl md:text-5xl font-bold px-4 text-center flex flex-wrap justify-center"
        >
          {[...sections[currentIndex]].map((char, i) => {
            const hue = Math.floor(Math.random() * 360);
            const scale = (Math.random() * 0.4 + 0.8).toFixed(2);
            const rotate = (Math.random() * 20 - 10).toFixed(1);
            const y = (Math.random() * 6 - 3).toFixed(1);
            const glow = Math.floor(Math.random() * 8 + 4);
            const letterSpacing = (Math.random() * 2).toFixed(1);
            const font = fontOptions[Math.floor(Math.random() * fontOptions.length)];

            return (
              <motion.span
                key={i}
                className="inline-block mx-0.5"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                style={{
                  color: `hsl(${hue}, 100%, 85%)`,
                  transform: `scale(${scale}) rotate(${rotate}deg) translateY(${y}px)`,
                  fontFamily: font,
                  letterSpacing: `${letterSpacing}px`,
                  textShadow: `0 0 ${glow}px hsl(${hue}, 100%, 75%)`,
                }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            );
          })}
        </motion.div>

        {/* ⭕ Dot Navigation */}
        <div className="flex flex-row gap-4 z-20">
          {sections.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-4 h-4 rounded-full transition-all duration-300 ${
                currentIndex === idx ? "bg-purple-500 scale-125" : "bg-white/30"
              }`}
            ></button>
          ))}
        </div>
      </div>

      {/* ✨ CSS Styles */}
      <style jsx global>{`
        .space {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          background: rgba(128, 0, 128, 0.08) center / 100px 100px round;
          border: 1px dashed rgba(200, 100, 255, 0.15);
          animation: galaxy 20s linear infinite;
          pointer-events: none;
          z-index: 0;
        }

        .stars1 {
          animation-duration: 20s;
        }

        .stars2 {
          animation-duration: 30s;
        }

        .stars3 {
          animation-duration: 40s;
        }

        @keyframes galaxy {
          0% {
            transform: rotate(0deg) scale(1);
          }
          50% {
            transform: rotate(180deg) scale(1.02);
          }
          100% {
            transform: rotate(360deg) scale(1);
          }
        }

        @keyframes twinkle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}