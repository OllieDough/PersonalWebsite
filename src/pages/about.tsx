"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function AboutPage() {
  const [showPage, setShowPage] = useState(false);

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

  // Show page immediately - no waiting
  useEffect(() => {
    setShowPage(true);
  }, []);

  if (!showPage) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-purple-400 border-t-yellow-400 rounded-full"
        />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden">
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(1deg); }
        }
        
        @keyframes shimmer {
          0% { background-position: 0%; }
          50% { background-position: 100%; }
          100% { background-position: 0%; }
        }
        
        @keyframes pulse-glow {
          0%, 100% { 
            filter: brightness(1) drop-shadow(0 0 20px rgba(251, 191, 36, 0.5)); 
          }
          50% { 
            filter: brightness(1.1) drop-shadow(0 0 40px rgba(251, 191, 36, 0.8)); 
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-shimmer {
          animation: shimmer 3s infinite ease-in-out;
        }
        
        .animate-pulse-glow {
          animation: pulse-glow 3s ease-in-out infinite;
        }
        
        .bg-300\\% {
          background-size: 300%;
        }

        .magic-card {
          background: rgba(147, 51, 234, 0.1);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(251, 191, 36, 0.3);
          position: relative;
          overflow: hidden;
        }
        
        .magic-card::before {
          content: '';
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          background: linear-gradient(45deg, #fbbf24, #9333ea, #fbbf24);
          border-radius: inherit;
          opacity: 0;
          transition: opacity 0.3s;
          z-index: -1;
        }
        
        .magic-card:hover::before {
          opacity: 0.7;
        }
        
        .image-hover {
          transition: all 0.3s ease;
        }
        
        .image-hover:hover {
          transform: scale(1.05) rotate(-2deg);
          filter: brightness(1.1);
          box-shadow: 0 20px 40px rgba(251, 191, 36, 0.4);
        }
      `}</style>

      {/* Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(128,_0,_128,_0.8),_black)]" />
        
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-purple-500/50 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-pink-500/50 rounded-full blur-[150px] animate-pulse delay-700" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-600/40 rounded-full blur-[180px] animate-pulse delay-1000" />
        
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-yellow-400/20 to-amber-500/20 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-br from-purple-400/30 to-pink-400/30 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
        </div>
      </div>

      <div className="relative z-10 px-6 md:px-20 lg:px-32 py-16 font-mono">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-4">
            <span className="bg-gradient-to-r from-yellow-400 via-purple-400 to-yellow-400 bg-clip-text text-transparent animate-shimmer bg-300%">
              Oliver Do
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-purple-200 italic animate-float">
            Engineer. Soul-Builder. Lover of Light.
          </p>
          <motion.p 
            className="mt-4 text-lg bg-gradient-to-r from-amber-300 to-purple-300 bg-clip-text text-transparent italic font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            "The world was too heavy, so I became light."
          </motion.p>
        </motion.div>

        {/* About Me */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="magic-card p-10 max-w-5xl mx-auto mb-20 rounded-3xl"
        >
          <div className="grid md:grid-cols-3 gap-10 items-start">
            <motion.div 
              className="relative"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-yellow-400 to-purple-400 rounded-xl blur-xl opacity-50" />
              <img
                src={images.me}
                alt="Oliver Do"
                className="relative rounded-xl shadow-xl border border-purple-400 animate-pulse-glow"
                loading="eager"
              />
            </motion.div>
            <div className="md:col-span-2 space-y-6">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-purple-400 bg-clip-text text-transparent">
                Welcome to Glowpunk
              </h2>
              <p className="text-purple-100 text-lg leading-relaxed">
                I'm a full-stack software engineer—but also a dreamer, a reader, a lover of life. I've helped scale early-stage startups from nothing into products serving hundreds of thousands of people, writing systems that handle real money and real people's trust. I love that kind of work.
              </p>
              <p className="text-purple-100 text-lg leading-relaxed">
                But under the surface, I'm always chasing something deeper: joy, clarity, connection. I drink filtered water from my favorite glass like it's a sacred ritual. My mattress is so dialed in it's basically a spaceship. I rearranged my desk so the sunlight hits just right when I'm journaling in the morning. I believe these details matter—because how we live is how we love.
              </p>
              <p className="text-purple-100 text-lg leading-relaxed">
                I read constantly—spirituality, philosophy, the occasional strange book on neuroplasticity—and I try to turn every insight into something I live. Every line of code I write, every moment I share with people I love, is part of a bigger painting: one where I become someone soft, strong, and free.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Photos & Videos */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <h2 className="text-center text-3xl font-bold mb-12">
            <span className="bg-gradient-to-r from-purple-400 to-yellow-400 bg-clip-text text-transparent">
              Glimpses of the Life I Love
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <motion.div 
              whileHover={{ scale: 1.03, rotate: -1 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img 
                src={images.paris} 
                alt="Paris" 
                className="rounded-xl shadow-xl image-hover cursor-pointer w-full h-96 object-cover"
                loading="lazy"
              />
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.03, rotate: 1 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="relative"
            >
              <img 
                src={images.yosemite} 
                alt="Yosemite" 
                className="rounded-xl shadow-xl image-hover cursor-pointer w-full h-96 object-cover"
                loading="lazy"
              />
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.03, rotate: -0.5 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="relative"
            >
              <img 
                src={images.luna} 
                alt="Luna" 
                className="rounded-xl shadow-xl image-hover cursor-pointer w-full h-96 object-cover"
                loading="lazy"
              />
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.03, rotate: 0.5 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="relative"
            >
              <img 
                src={images.carryingLuna} 
                alt="Carrying Luna" 
                className="rounded-xl shadow-xl image-hover cursor-pointer w-full h-96 object-cover"
                loading="lazy"
              />
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.03, rotate: -0.8 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="relative md:col-span-2 max-w-2xl mx-auto"
            >
              <img 
                src={images.children} 
                alt="Children" 
                className="rounded-xl shadow-xl image-hover cursor-pointer w-full h-96 object-cover"
                loading="lazy"
              />
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.03, rotate: 0.3 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="relative md:col-span-2 max-w-2xl mx-auto"
            >
              <img 
                src={images.travisWedding} 
                alt="Wedding" 
                className="rounded-xl shadow-xl image-hover cursor-pointer w-full h-96 object-cover"
                loading="lazy"
              />
            </motion.div>
          </div>
          <motion.div 
            className="mt-12 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="relative rounded-xl overflow-hidden">
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-400/30 to-yellow-400/30 rounded-xl blur-xl" />
              <video
                src={images.niece}
                controls
                muted
                loop
                className="relative rounded-xl shadow-2xl w-full"
                preload="metadata"
              />
            </div>
            <p className="mt-4 text-center text-purple-300 italic">
              A moment with my niece that melted me.
            </p>
          </motion.div>
        </motion.section>

        {/* Philosophy */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="magic-card p-10 max-w-4xl mx-auto text-center rounded-3xl"
        >
          <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-purple-400 bg-clip-text text-transparent">
            The Philosophy
          </h2>
          <p className="text-purple-100 text-lg leading-relaxed mb-4">
            I'm building more than software—I'm building a soul. I believe love is the best technology we've got. I believe joy is a skill. And I believe that
            healing—true, slow, raw healing—is worth more than any product you can ship.
          </p>
          <p className="text-purple-100 text-lg leading-relaxed mb-4">
            I don't always get it right. I fall into overworking, distraction, ego, self-doubt. But I always come back. I come back to breath. To people I care about. To long walks. To books that change me. To my cats. To the sunlight that spills on my floor at 7:30am.
          </p>
          <p className="text-purple-100 text-lg leading-relaxed">
            This is the life I'm creating—one full of play, presence, purpose, and peace. If you're here reading this, I just want to say: I'm glad we crossed paths.
          </p>
          
          <motion.div
            className="mt-8"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <span className="text-5xl">✨</span>
          </motion.div>
        </motion.section>
      </div>
    </main>
  );
}