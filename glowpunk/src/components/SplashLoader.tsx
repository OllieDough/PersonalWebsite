"use client";

import React, { useState, useEffect, useRef } from "react";

const SplashLoader = ({ onFinish }: { onFinish: () => void }) => {
  const [glowIntensity, setGlowIntensity] = useState(0);
  const [exploded, setExploded] = useState(false);
  const [shrinking, setShrinking] = useState(false);
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
      setTimeout(onFinish, 1200); // allow fade to complete
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
                top: "45.5%",
                left: "48.0%",
                transformOrigin: "center",
                animation: "orbit 10s linear infinite",
                animationDelay: `${(index / 8) * -10}s`,
                transform: `rotate(${angle}deg) translate(150px)`,
                width: "60px",
                height: "60px",
                zIndex: 5,
              }}
            />
          );
        })}

      {/* Quote */}
      {!exploded && (
        <div className="splash-quote">
          "The World was too heavy so I became light"
        </div>
      )}

      {/* Fade Overlay */}
      {exploded && (
        <div
          className="fade-overlay"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "black",
            zIndex: 100,
            animation: "fadeToBlack 3s ease-in forwards",
          }}
        />
      )}

      <style jsx>{`
        .splash-quote {
          position: absolute;
          top: calc(50% + 180px);
          left: 50%;
          transform: translateX(-50%);
          font-size: 1.2rem;
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
        }

        @keyframes orbit {
          0% {
            transform: rotate(0deg) translate(150px);
          }
          100% {
            transform: rotate(360deg) translate(150px);
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

        @keyframes fadeToBlack {
          from {
            opacity: 0;
            backdrop-filter: blur(0px);
          }
          to {
            opacity: 1;
            backdrop-filter: blur(6px);
          }
        }
        
        .fade-overlay {
          animation: fadeToBlack 1.4s cubic-bezier(0.645, 0.045, 0.355, 1) forwards;
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

  const config = {
    particleNumber: 600,
    maxParticleSize: 6,
    maxSpeed: 20,
  };

  let particles: any[] = [];
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;

  function Particle(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.r = Math.random() * config.maxParticleSize + 1;
    this.s = Math.random() * config.maxSpeed;
    this.d = Math.random() * 2 * Math.PI;
    this.alpha = 1;
  }

  const update = (p: any) => {
    p.x += p.s * Math.cos(p.d);
    p.y += p.s * Math.sin(p.d);
    p.r *= 0.96;
    p.alpha -= 0.01;
    return p;
  };

  const draw = (p: any) => {
    ctx.beginPath();
    ctx.fillStyle = `rgba(255,255,255,${Math.max(0, p.alpha)})`;
    ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
  };

  const render = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles = particles.map(update);
    particles.forEach(draw);
    particles = particles.filter((p) => p.alpha > 0);
    if (particles.length > 0) requestAnimationFrame(render);
  };

  for (let i = 0; i < config.particleNumber; i++) {
    particles.push(new (Particle as any)(centerX, centerY));
  }

  render();
}