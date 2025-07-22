"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function About() {
  const [activeSection, setActiveSection] = useState("intro");
  const [isLoaded, setIsLoaded] = useState(false);
  const canvasRef = useRef(null);

  useEffect(() => {
    setIsLoaded(true);
    
    // Create starfield
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const stars = Array.from({ length: 200 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2,
      speed: Math.random() * 0.5 + 0.1,
      opacity: Math.random()
    }));
    
    function animate() {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      stars.forEach(star => {
        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
        
        star.y += star.speed;
        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
        }
        
        star.opacity = Math.sin(Date.now() * 0.001 + star.x) * 0.5 + 0.5;
      });
      
      requestAnimationFrame(animate);
    }
    
    animate();
    
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const images = {
    bestMan: "/BestMan.jpeg",
    carryingLuna: "/CarryingLuna.jpeg",
    children: "/Children.jpeg",
    childrenCuddling: "/ChildrenCuddling.jpeg",
    jiuJitsu: "/JiuJitsu.jpeg",
    luna: "/LunaInShirt.jpeg",
    me: "/Me.jpeg",
    niece: "/Niece.mp4",
    paris: "/Paris.jpeg",
    travisWedding: "/TravisWedding.jpeg",
    yosemite: "/Yosemite.jpeg"
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-12 h-12 border-3 border-purple-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden">
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(1deg); }
        }
        
        @keyframes pulse-glow {
          0%, 100% { filter: brightness(1) drop-shadow(0 0 20px rgba(147, 51, 234, 0.5)); }
          50% { filter: brightness(1.2) drop-shadow(0 0 40px rgba(147, 51, 234, 0.8)); }
        }
        
        @keyframes shimmer {
          0% { background-position: 0%; }
          50% { background-position: 100%; }
          100% { background-position: 0%; }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-pulse-glow {
          animation: pulse-glow 3s ease-in-out infinite;
        }
        
        .animate-shimmer {
          animation: shimmer 3s infinite ease-in-out;
        }
        
        .bg-300\\% {
          background-size: 300%;
        }
        
        .cosmic-card {
          background: rgba(147, 51, 234, 0.1);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(147, 51, 234, 0.3);
          position: relative;
          overflow: hidden;
        }
        
        .cosmic-card::before {
          content: '';
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          background: linear-gradient(45deg, #ffd700, #9333ea, #ffd700);
          border-radius: inherit;
          opacity: 0;
          transition: opacity 0.3s;
          z-index: -1;
        }
        
        .cosmic-card:hover::before {
          opacity: 1;
        }
      `}</style>

      {/* Starfield Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-0"
        style={{ background: "radial-gradient(circle at center, rgba(128, 0, 128, 0.3) 0%, black 100%)" }}
      />

      {/* Cosmic Background Effects */}
      <div className="fixed inset-0 z-1">
        {/* Central cosmic glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-600/30 rounded-full blur-[200px] animate-pulse" />
        
        {/* Floating orbs */}
        <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-yellow-400/20 to-purple-500/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-full blur-2xl animate-float" style={{ animationDelay: "4s" }} />
      </div>

      {/* Content */}
      <div className="relative z-10 px-6 md:px-20 lg:px-32 py-20">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-20"
        >
          <h1 className="text-6xl md:text-8xl font-bold mb-6">
            <span className="bg-gradient-to-r from-yellow-400 via-purple-400 to-yellow-400 bg-clip-text text-transparent animate-shimmer bg-300%">
              Oliver Do
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-purple-300 font-light tracking-wide">
            Software Engineer · Soul Explorer · Cosmic Wanderer
          </p>
          
          {/* Floating quote */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="mt-8 text-lg text-white/70 italic"
          >
            "The World was too heavy so I became light"
          </motion.div>
        </motion.div>

        {/* Professional Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-32"
        >
          <h2 className="text-3xl font-bold mb-8 text-center">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              The Professional Constellation
            </span>
          </h2>
          
          <div className="cosmic-card rounded-3xl p-8 max-w-4xl mx-auto">
            <p className="text-lg leading-relaxed text-white/90 mb-6">
              I'm a full-stack software engineer who believes that great code isn't just functional—it's <span className="text-yellow-400 font-semibold">felt</span>. 
              I've helped scale early-stage products to six-figure revenue and 100k+ users, led infrastructure efforts from scratch, 
              and worn every hat from founder to team lead.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-purple-900/30 p-4 rounded-2xl border border-purple-500/30"
              >
                <div className="text-3xl mb-2">🚀</div>
                <h3 className="text-yellow-400 font-semibold mb-1">Scalability</h3>
                <p className="text-sm text-white/70">100k+ users served</p>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-purple-900/30 p-4 rounded-2xl border border-purple-500/30"
              >
                <div className="text-3xl mb-2">💎</div>
                <h3 className="text-yellow-400 font-semibold mb-1">Impact</h3>
                <p className="text-sm text-white/70">$150k+ revenue generated</p>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-purple-900/30 p-4 rounded-2xl border border-purple-500/30"
              >
                <div className="text-3xl mb-2">⚡</div>
                <h3 className="text-yellow-400 font-semibold mb-1">Versatility</h3>
                <p className="text-sm text-white/70">Full-stack expertise</p>
              </motion.div>
            </div>
            
            <p className="text-lg text-white/90">
              I move between frontend and backend with ease, with experience across React, TypeScript, PostgreSQL, AWS, and more. 
              But beyond tech, I care deeply about <span className="text-purple-400 italic">how</span> we build. 
              Software is one of the most powerful tools we have to craft a better, more beautiful world.
            </p>
          </div>
        </motion.section>

        {/* Personal Journey Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-32"
        >
          <h2 className="text-3xl font-bold mb-12 text-center">
            <span className="bg-gradient-to-r from-yellow-400 to-purple-400 bg-clip-text text-transparent">
              The Soul's Journey
            </span>
          </h2>
          
          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Left column - Text */}
            <div className="space-y-6">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="cosmic-card rounded-3xl p-6"
              >
                <h3 className="text-2xl font-bold text-yellow-400 mb-4">Mission: Craft Beauty</h3>
                <p className="text-white/80 leading-relaxed">
                  Outside of work, I'm just a soul on a mission: to craft the most honest, loving, and beautiful life I can. 
                  I'm obsessed with growth—not in a hustle way, but in a <span className="text-purple-300 font-semibold">human</span> way.
                </p>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="cosmic-card rounded-3xl p-6"
              >
                <h3 className="text-2xl font-bold text-purple-400 mb-4">Sacred Rituals</h3>
                <p className="text-white/80 leading-relaxed">
                  I thrive on little rituals: my mattress has to be <span className="italic">just right</span>, 
                  my desk has a view of the sun because sunshine is medicine, and I have the 
                  <span className="text-yellow-400"> best</span> office water setup you've ever seen—filtered, chilled, and soul-affirming.
                </p>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="cosmic-card rounded-3xl p-6"
              >
                <h3 className="text-2xl font-bold text-pink-400 mb-4">Love & Connection</h3>
                <p className="text-white/80 leading-relaxed">
                  I love people. I really do. I love watching them light up when they talk about what they love, 
                  I love holding space for hard conversations, and I love when laughter sneaks up on you and refuses to stop. 
                  Life is a collection of these little holy moments.
                </p>
              </motion.div>
            </div>
            
            {/* Right column - Images */}
            <div className="grid grid-cols-2 gap-4 h-fit">
              <motion.div
                whileHover={{ scale: 1.05, rotate: -2 }}
                className="relative overflow-hidden rounded-2xl animate-pulse-glow"
              >
                <img src={images.paris} alt="Paris adventures" className="w-full h-48 object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 to-transparent" />
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05, rotate: 2 }}
                className="relative overflow-hidden rounded-2xl animate-pulse-glow"
              >
                <img src={images.yosemite} alt="Yosemite exploration" className="w-full h-48 object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 to-transparent" />
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05, rotate: -2 }}
                className="relative overflow-hidden rounded-2xl animate-pulse-glow"
              >
                <img src={images.carryingLuna} alt="With Luna" className="w-full h-48 object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 to-transparent" />
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05, rotate: 2 }}
                className="relative overflow-hidden rounded-2xl animate-pulse-glow"
              >
                <img src={images.bestMan} alt="Best man moments" className="w-full h-48 object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 to-transparent" />
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Philosophy Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-32"
        >
          <div className="cosmic-card rounded-3xl p-12 max-w-4xl mx-auto text-center">
            <h3 className="text-3xl font-bold mb-8">
              <span className="bg-gradient-to-r from-yellow-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                The Cosmic Truth
              </span>
            </h3>
            
            <p className="text-xl leading-relaxed text-white/90 mb-8">
              And it's not always easy. I've had to fight for my happiness. I've had to choose healing when anger was easier, 
              softness when shame screamed for silence. But every time I choose love—of self, of others, of the moment—I grow.
            </p>
            
            <p className="text-2xl font-light text-purple-300 italic">
              This life is a canvas for the soul, a playground for the heart, and a chance to become something 
              <span className="text-yellow-400 font-bold"> true</span>.
            </p>
            
            <motion.div
              className="mt-12"
              whileHover={{ scale: 1.1 }}
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
            >
              <span className="text-6xl">✨</span>
            </motion.div>
          </div>
        </motion.section>

        {/* Gallery Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold mb-12 text-center">
            <span className="bg-gradient-to-r from-purple-400 to-yellow-400 bg-clip-text text-transparent">
              Moments in the Cosmos
            </span>
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Object.entries(images).filter(([key]) => key !== 'niece').map(([key, src], idx) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.05, rotate: Math.random() * 6 - 3 }}
                className="relative overflow-hidden rounded-2xl aspect-square"
              >
                <img 
                  src={src} 
                  alt={key} 
                  className="w-full h-full object-cover animate-pulse-glow"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-2xl font-light text-white/80 mb-4">
            So yeah. I'm building software. But I'm also building 
            <span className="text-yellow-400 font-bold"> me</span>.
          </p>
          <p className="text-xl text-purple-300">
            Every day. With curiosity, compassion, and just the right amount of chaos.
          </p>
          
          <motion.div
            className="mt-12"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <span className="text-8xl">🌟</span>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}