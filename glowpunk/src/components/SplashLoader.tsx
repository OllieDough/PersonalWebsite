"use client";

import React, { useState, useEffect, useRef } from "react";

const SplashLoader = ({ onFinish }: { onFinish: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [glowIntensity, setGlowIntensity] = useState(0);
  const [exploded, setExploded] = useState(false);
  const [fadeToBlack, setFadeToBlack] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Progress logic
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 20);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (exploded) return;
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    const distance = Math.sqrt((e.clientX - cx) ** 2 + (e.clientY - cy) ** 2);
    const intensity = Math.max(0, 100 - distance / 10);
    setGlowIntensity(intensity);
  };

  const handleMouseLeave = () => {
    if (!exploded) setGlowIntensity(0);
  };

  const handleGoatClick = () => {
    if (progress < 100) return;
    setExploded(true);
    timeoutRef.current = setTimeout(() => {
      setFadeToBlack(true);
      timeoutRef.current = setTimeout(onFinish, 500);
    }, 300);
  };

  const handleDoubleClick = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    onFinish();
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onDoubleClick={handleDoubleClick}
      style={{
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
        position: "relative",
        background: fadeToBlack
          ? "black"
          : "radial-gradient(circle, rgba(128, 0, 128, 0.8), rgba(0, 0, 0, 1))",
        backgroundSize: "400% 400%",
        animation: fadeToBlack ? "none" : "shimmer 12s ease-in-out infinite",
        transition: "background-color 0.5s ease",
      }}
    >
      {/* Progress Bar */}
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          left: "10%",
          width: "80%",
          height: "10px",
          background: "#444",
          borderRadius: "5px",
          overflow: "hidden",
          zIndex: 30,
        }}
      >
        <div
          style={{
            width: `${progress}%`,
            height: "100%",
            background: "white",
            transition: "width 0.2s",
          }}
        />
      </div>

      {/* Goat */}
      <div
        onClick={handleGoatClick}
        onDoubleClick={handleDoubleClick}
        style={{
          position: "absolute",
          top: "52.5%",
          left: "51.5%",
          transform: exploded
            ? "translate(-50%, -45%) scale(100)"
            : "translate(-50%, -50%)",
          zIndex: fadeToBlack ? -1 : 10,
          width: "200px",
          height: "200px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: progress >= 100 ? "pointer" : "not-allowed",
          boxShadow: exploded
            ? "none"
            : `0 0 ${glowIntensity}px ${glowIntensity / 2}px black`,
          borderRadius: "50%",
          animation: exploded ? "blowUp 0.5s ease forwards" : "none",
          transition: "box-shadow 0.5s ease",
        }}
      >
        <img src="/ram.svg" alt="Goat" style={{ width: "100%", height: "100%" }} />
      </div>

      {/* Orbiting Snakes & Dragons */}
      {!exploded &&
        Array.from({ length: 8 }).map((_, index) => {
          const angle = (index / 8) * 360;
          return (
            <img
              key={index}
              src={index % 2 === 0 ? "/snakeHead.svg" : "/dragonHead.svg"}
              alt=""
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transformOrigin: "center",
                animation: "orbit 10s linear infinite",
                animationDelay: `${(index / 8) * -10}s`,
                transform: `rotate(${angle}deg) translate(150px)`,
                width: "60px",
                height: "60px",
              }}
            />
          );
        })}

      {/* Fade overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: fadeToBlack ? "black" : "transparent",
          transition: "background-color 0.5s ease",
          zIndex: 20,
          pointerEvents: "none",
        }}
      ></div>

      {/* Animations */}
      <style jsx>{`
        @keyframes orbit {
          0% {
            transform: rotate(0deg) translate(150px);
          }
          100% {
            transform: rotate(360deg) translate(150px);
          }
        }

        @keyframes blowUp {
          0% {
            transform: translate(-50%, -50%) scale(1);
          }
          100% {
            transform: translate(-50%, -50%) scale(4);
          }
        }

        @keyframes shimmer {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </div>
  );
};

export default SplashLoader;