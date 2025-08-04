"use client";

import React, { useState, useEffect, useRef } from "react";

const SplashLoader = ({ onFinish }: { onFinish: () => void }) => {
  const [glowIntensity, setGlowIntensity] = useState(0);
  const [exploded, setExploded] = useState(false);
  const [shrinking, setShrinking] = useState(false);
  const [explosionOpacity, setExplosionOpacity] = useState(1);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

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
    if (shrinking) return;
    setShrinking(true);
    setTimeout(() => {
      setExploded(true);
      triggerExplosion();

      // Begin fading the explosion
      const fadeInterval = setInterval(() => {
        setExplosionOpacity((prev) => {
          if (prev <= 0.01) {
            clearInterval(fadeInterval);
            return 0;
          }
          return prev - 0.02;
        });
      }, 50);

      setTimeout(onFinish, 2400); // Index fades in while explosion fades
    }, 400);
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
        background: "radial-gradient(circle, rgba(128, 0, 128, 0.8), black)",
      }}
    >
      {/* Canvas explosion layer */}
      <canvas
        id="explosion-canvas"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 2,
          pointerEvents: "none",
          opacity: explosionOpacity,
          transition: "opacity 0.2s ease-out",
        }}
      />

      {/* GOAT */}
      {!exploded && (
        <div
          onClick={handleGoatClick}
          onDoubleClick={handleDoubleClick}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 10,
            width: "200px",
            height: "200px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            boxShadow: `0 0 ${glowIntensity}px ${glowIntensity / 2}px black`,
            borderRadius: "50%",
            animation: `${shrinking ? "shrink" : "bounce"} 2s ease-in-out infinite`,
            transition: "box-shadow 0.5s ease",
          }}
        >
          <img
            src="/ram.svg"
            alt="Goat"
            style={{
              width: "100%",
              height: "100%",
              transition: "filter 0.5s ease",
            }}
          />
        </div>
      )}

      {/* Orbiting snakes & dragons */}
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
                transformOrigin: "50% 50%",
                animation: "orbit 10s linear infinite",
                animationDelay: `${(index / 8) * -10}s`,
                transform: `translate(-50%, -50%) rotate(${angle}deg) translate(150px) rotate(-${angle}deg)`,
                width: "clamp(40px, 8vw, 60px)",
                height: "clamp(40px, 8vw, 60px)",
                zIndex: 5,
              }}
            />
          );
        })}

      {/* Quote */}
      {!exploded && (
        <div className="splash-quote">
          "The world was too heavy so I became light"
        </div>
      )}

      <style jsx>{`
        .splash-quote {
          position: absolute;
          top: calc(50% + clamp(120px, 20vh, 180px));
          left: 50%;
          transform: translateX(-50%);
          font-size: clamp(1rem, 3vw, 1.2rem);
          font-family: 'Cormorant Garamond', 'Georgia', serif;
          font-weight: 600;
          letter-spacing: 0.1em;
          z-index: 30;
          pointer-events: none;
          user-select: none;
          background: linear-gradient(90deg, #FFD700, #ffffff, #FFD700);
          background-size: 300%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 3s infinite ease-in-out;
          text-align: center;
          padding: 0 20px;
          white-space: nowrap;
        }

        @media (max-width: 480px) {
          .splash-quote {
            white-space: normal;
            max-width: 90vw;
          }
        }

        @keyframes orbit {
          0% {
            transform: translate(-50%, -50%) rotate(0deg) translate(clamp(100px, 20vw, 150px)) rotate(0deg);
          }
          100% {
            transform: translate(-50%, -50%) rotate(360deg) translate(clamp(100px, 20vw, 150px)) rotate(-360deg);
          }
        }

        @keyframes shimmer {
          0% {
            background-position: 0%;
          }
          50% {
            background-position: 100%;
          }
          100% {
            background-position: 0%;
          }
        }

        @keyframes bounce {
          0%, 100% {
            transform: translate(-50%, -50%) scale(1);
          }
          50% {
            transform: translate(-50%, -60%) scale(1.1);
          }
        }

        @keyframes shrink {
          0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) scale(0.1);
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
};

export default SplashLoader;

function triggerExplosion() {
  const canvas = document.getElementById("explosion-canvas") as HTMLCanvasElement;
  const ctx = canvas?.getContext("2d");
  if (!canvas || !ctx) return;

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;

  let stars: any[] = [];
  let frame = 0;
  const maxFrames = 300;

  const createStars = (count = 100) => {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 15 + 5;
      const length = Math.random() * 50 + 20;
      stars.push({
        x: centerX,
        y: centerY,
        angle,
        speed,
        length,
        alpha: 1,
      });
    }
  };

  const updateStars = () => {
    stars = stars.map((star) => {
      const vx = Math.cos(star.angle) * star.speed;
      const vy = Math.sin(star.angle) * star.speed;
      star.x += vx;
      star.y += vy;
      star.length *= 0.98;
      star.alpha *= 0.985;
      return star;
    });
    stars = stars.filter((star) => star.alpha > 0);
  };

  const drawStars = () => {
    for (const star of stars) {
      const vx = Math.cos(star.angle) * star.speed;
      const vy = Math.sin(star.angle) * star.speed;
      ctx.beginPath();
      ctx.strokeStyle = `rgba(255, 255, 255, ${star.alpha})`;
      ctx.lineWidth = 1.3;
      ctx.moveTo(star.x, star.y);
      ctx.lineTo(star.x - vx * star.length * 0.1, star.y - vy * star.length * 0.1);
      ctx.stroke();
    }
  };

  const render = () => {
    frame++;
    ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    if (frame < maxFrames && frame % 2 === 0) createStars(80);
    updateStars();
    drawStars();
    if (frame < maxFrames || stars.length > 0) requestAnimationFrame(render);
  };

  render();
}