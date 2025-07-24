"use client";

import { useEffect, useState, useMemo } from "react";
import { motion, useAnimationFrame } from "framer-motion";
import SplashLoader from "@/components/SplashLoader";
import Image from "next/image";

const sections = [
  "THE GLOWPUNK UNIVERSE",
  "What can I help you with?",
  "Here’s what I love to do.",
  "Guitar, food, movement, making cool sh*t.",
  "The future is soft, wild, and glowing.",
];

const planets = [
  { name: "Mercury", color: "#b1b1b1", radius: 50, size: 6, speed: 0.02 },
  { name: "Venus", color: "#e5c07b", radius: 80, size: 10, speed: 0.015 },
  { name: "Earth", color: "#4fc3f7", radius: 110, size: 12, speed: 0.012 },
  { name: "Mars", color: "#ef5350", radius: 140, size: 9, speed: 0.011 },
  { name: "Jupiter", color: "#fdd835", radius: 180, size: 18, speed: 0.009 },
  { name: "Saturn", color: "#d4af37", radius: 230, size: 16, speed: 0.007 },
  { name: "Uranus", color: "#81d4fa", radius: 270, size: 14, speed: 0.005 },
  { name: "Neptune", color: "#536dfe", radius: 310, size: 14, speed: 0.004 },
];

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

const OrbitingSun = ({ radius = 120 }: { radius?: number }) => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  useAnimationFrame(() => {
    setPos((prevPos) => {
      const nextAngle = Math.atan2(prevPos.y, prevPos.x) + 0.01;
      return {
        x: radius * Math.cos(nextAngle),
        y: radius * Math.sin(nextAngle),
      };
    });
  });

  return (
    <motion.div
      style={{
        position: "absolute",
        top: `calc(50% + ${pos.y}px)`,
        left: `calc(50% + ${pos.x}px)`,
        width: 80,
        height: 80,
        borderRadius: "50%",
        background: "radial-gradient(circle, #FFD700, #FF8C00)",
        boxShadow: "0 0 40px 15px rgba(255, 200, 0, 0.6)",
        zIndex: 10,
      }}
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
    />
  );
};

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [angles, setAngles] = useState(planets.map(() => 0));
  const [stars] = useState(() => generateStars(1000));
  const [showSplash, setShowSplash] = useState(true);
  const fontOptions = useMemo(() => ["monospace", "serif", "cursive", "sans-serif"], []);

  const styledSections = useMemo(() => {
    return sections.map((section) =>
      [...section].map((char, i) => {
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
      })
    );
  }, [fontOptions]);

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

  useAnimationFrame(() => {
    setAngles((prev) => prev.map((a, i) => a + planets[i].speed));
  });

  return (
    <div className="relative">
      {showSplash && <SplashLoader onFinish={() => setShowSplash(false)} />}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showSplash ? 0 : 1 }}
        transition={{ duration: 2.5, ease: "easeInOut" }}
        className="h-screen w-screen overflow-hidden bg-black text-white font-mono"
      >
        <div className="space stars1" />
        <div className="space stars2" />
        <div className="space stars3" />
        <div className="absolute inset-0 z-0 pointer-events-none">{stars}</div>

        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-yellow-400 shadow-[0_0_80px_30px_rgba(255,200,0,0.5)] animate-pulse z-10" />

        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 w-28 h-28">
          <Image src="/ram.svg" alt="Goat" width={112} height={112} />
        </div>

        {planets.map((planet, i) => {
          const x = planet.radius * Math.cos(angles[i]);
          const y = planet.radius * Math.sin(angles[i]);
          return (
            <div
              key={planet.name}
              className="absolute"
              style={{ left: `calc(50% + ${x}px)`, top: `calc(50% + ${y}px)` }}
            >
              <motion.div
                className="rounded-full shadow-lg"
                style={{
                  width: planet.size,
                  height: planet.size,
                  backgroundColor: planet.color,
                  boxShadow: `0 0 12px 4px ${planet.color}`,
                }}
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 10 / planet.speed, ease: "linear" }}
              />
            </div>
          );
        })}

        {planets.map((planet) => (
          <div
            key={`orbit-${planet.name}`}
            className="absolute border border-dashed border-gray-500/20 rounded-full"
            style={{
              width: planet.radius * 2,
              height: planet.radius * 2,
              left: `calc(50% - ${planet.radius}px)`,
              top: `calc(50% - ${planet.radius}px)`,
            }}
          ></div>
        ))}

        <OrbitingSun />

        <div className="relative mt-40 w-full flex justify-center items-center z-20">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="text-3xl md:text-5xl font-bold px-4 text-center flex flex-wrap justify-center"
          >
            {styledSections[currentIndex]}
          </motion.div>
        </div>

        <div className="absolute left-6 top-1/2 transform -translate-y-1/2 flex flex-col gap-4 z-20">
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
            0%,
            100% {
              opacity: 0.2;
            }
            50% {
              opacity: 1;
            }
          }
        `}</style>
      </motion.div>
    </div>
  );
}