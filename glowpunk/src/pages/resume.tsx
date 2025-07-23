"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ResumePage() {
  const [activeSection, setActiveSection] = useState("experience");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const technologies = [
    { name: "React", color: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20" },
    { name: "Next.js", color: "bg-white/10 text-white border-white/20" },
    { name: "TypeScript", color: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
    { name: "Node.js", color: "bg-green-500/10 text-green-400 border-green-500/20" },
    { name: "AWS", color: "bg-orange-500/10 text-orange-400 border-orange-500/20" },
    { name: "PostgreSQL", color: "bg-blue-600/10 text-blue-500 border-blue-600/20" },
    { name: "MongoDB", color: "bg-green-600/10 text-green-500 border-green-600/20" },
    { name: "Docker", color: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
    { name: "Redux", color: "bg-purple-500/10 text-purple-400 border-purple-500/20" },
    { name: "Express", color: "bg-gray-500/10 text-gray-400 border-gray-500/20" },
    { name: "Stripe", color: "bg-purple-600/10 text-purple-500 border-purple-600/20" },
    { name: "GCP", color: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
    { name: "Figma", color: "bg-pink-500/10 text-pink-400 border-pink-500/20" },
    { name: "Material-UI", color: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
    { name: "Vercel", color: "bg-white/10 text-white border-white/20" },
  ];
  const experiences = [
    {
      title: "Founder & Engineer",
      company: "Ember&Tide",
      duration: "July 2025 – Present",
      location: "Irvine, CA",
      highlights: [
        "Founded boutique web development agency specializing in high-performance web applications",
        "Part of development team that uses Next.js, React, and modern cloud architectures",
        "Implemented scalable solutions and following SEO protocols to generate new customer acquisition",
        "Built custom e-commerce platforms transactions",
        "Established partnerships with local businesses and startups"
      ],
      tech: ["Next.js", "React", "AWS", "Vercel", "TypeScript"],
      impact: "Generated over 30k revenue working with small business",
      gradient: "from-purple-600 to-pink-600"
    },
    {
      title: "Founding Software Engineer",
      company: "Hedge",
      duration: "Feb 2025 – July 2025",
      location: "Newport Beach",
      highlights:[
        "Built cross-platform features using React, React Native, Figma, and Luna",
        "Developed and maintained backend services with AWS Lambda, API Gateway, PostgreSQL, and DynamoDB",
        "Integrated APIs to visualize user portfolios and debugged issues using CloudWatch, Xcode, and Sentry",
        "Streamed real-time symbol data to ensure accurate pricing; implemented financial graphs for historical performance",
        "Developed and maintained real-time chat services to support instant user communication",
        "Diagnosed and fixed critical bugs affecting data accuracy, chart rendering, and app stability",
      ],
      tech: ["React", "React Native", "AWS", "PostgreSQL", "DynamoDB","Mobile Development"],
      impact: "Founding member building fintech infrastructure",
      gradient: "from-blue-600 to-cyan-600"
    },
    {
      title: "Freelance Software Engineer",
      company: "Self-Employed",
      duration: "Jan 2024 – Feb 2025",
      location: "Remote",
      highlights: [
        "Delivered custom full-stack apps to clients using Next.js, AWS, and PostgreSQL",
        "Scoped and executed rapid MVPs for AI, e-commerce, and health-tech startups",
        "Built reusable component systems, CI/CD pipelines, and scalable backends"
      ],
      tech: ["Next.js", "AWS", "PostgreSQL", "CI/CD"],
      impact: "Successfully delivered 5+ client projects",
      gradient: "from-emerald-600 to-teal-600"
    },
    {
      title: "Full Stack Engineer",
      company: "Curastory",
      duration: "Aug 2021 – Oct 2023",
      location: "New York",
      highlights: [
        "Created dual-sided marketplace with Stripe payment API for 40k+ users",
        "Built matching algorithms leveraging GCP, Meta, TikTok APIs — generated $75k+ revenue",
        "Enabled influencer video editing via AWS S3, Lambda, and MediaConvert",
        "Created proprietary video analytics portal with AWS Athena, saving $30/video",
        "Cut logging costs from $8k/mo to $700/mo via standardization",
        "Built test suite that reduced bugs by 60%"
      ],
      tech: ["React", "Next.js", "AWS", "Stripe", "GCP", "Heroku","Adtech","DigitalOcean"],
      impact: "$75k+ revenue generated, 91% cost reduction in logging",
      gradient: "from-orange-600 to-red-600"
    },
    {
      title: "Coding Bootcamp Assistant",
      company: "UC Irvine",
      duration: "2017 – 2018",
      location: "Irvine, CA",
      highlights: [
        "Assisted 70+ students with React and Node.js integration"
      ],
      tech: ["React", "Node.js", "JavaScript"],
      impact: "Mentored 70+ aspiring developers",
      gradient: "from-indigo-600 to-purple-600"
    }
  ];

  const projects = [
    {
      name: "AI-Powered Content Platform",
      description: "Built a full-stack platform for Ember&Tide client using Next.js 14, OpenAI API, and Vercel. Features include real-time collaboration, AI content generation, and analytics dashboard.",
      tech: ["Next.js", "OpenAI", "PostgreSQL", "Vercel", "TailwindCSS"],
      gradient: "from-violet-500 to-purple-500"
    },
    {
      name: "E-commerce Marketplace",
      description: "Developed multi-vendor marketplace for Client with Stripe Connect, real-time inventory management, and advanced search using Elasticsearch.",
      tech: ["React", "Node.js", "Stripe", "Elasticsearch", "AWS"],
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      name: "Cloud Resume Challenge",
      description: "Resume project hosted on AWS with full CI/CD pipeline, IAM, S3, Route 53, CloudFront CDN, and HTTPS",
      tech: ["AWS", "CloudFormation", "CI/CD"],
      gradient: "from-orange-500 to-red-500"
    },
    {
      name: "Community Forum Platform",
      description: "Visitor tracker with DynamoDB, community forum with MySQL, Express, Bootstrap",
      tech: ["DynamoDB", "MySQL", "Express", "Bootstrap"],
      gradient: "from-green-500 to-emerald-500"
    },
    {
      name: "Food Waste Matching App",
      description: "Connected restaurants with customers to reduce food waste using React, MySQL, Express",
      tech: ["React", "MySQL", "Express"],
      gradient: "from-pink-500 to-rose-500"
    }
  ];

  const education = [
    {
      degree: "AS in Computer Science",
      school: "Irvine Valley College",
      years: "2018 – 2019",
      gradient: "from-blue-600 to-indigo-600"
    },
    {
      degree: "BS in Business Administration & HR",
      school: "CSU Long Beach",
      years: "2011 – 2016",
      gradient: "from-purple-600 to-pink-600"
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['experience', 'projects', 'technologies', 'education'];
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
      
      // Check if we're at the bottom of the page for education section
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
        setActiveSection('education');
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once to set initial state
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-purple-950 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white relative overflow-x-hidden">
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px) rotate(0deg);
          }
          33% {
            transform: translateY(-30px) translateX(10px) rotate(1deg);
          }
          66% {
            transform: translateY(20px) translateX(-10px) rotate(-1deg);
          }
        }

        @keyframes float-delayed {
          0%, 100% {
            transform: translateY(0px) translateX(0px) rotate(0deg);
          }
          33% {
            transform: translateY(20px) translateX(-15px) rotate(-1deg);
          }
          66% {
            transform: translateY(-25px) translateX(15px) rotate(1deg);
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

        .animate-float {
          animation: float 15s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 20s ease-in-out infinite;
        }
        
        .animate-shimmer {
          animation: shimmer 3s infinite ease-in-out;
        }
        
        .bg-300\\% {
          background-size: 300%;
        }
      `}</style>
      
      {/* Beautiful purple glow background - matching splash loader vibe */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(128,_0,_128,_0.8),_black)]" />
        
        {/* Animated gradient orbs */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-purple-500/50 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-pink-500/50 rounded-full blur-[150px] animate-pulse delay-700" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-600/40 rounded-full blur-[180px] animate-pulse delay-1000" />
        
        {/* Golden accent orbs */}
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-yellow-400/20 to-amber-500/20 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-br from-purple-400/30 to-pink-400/30 rounded-full blur-3xl animate-float-delayed" />
          <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-gradient-to-br from-yellow-300/15 to-purple-400/15 rounded-full blur-2xl animate-float" />
        </div>
        
        {/* Subtle sparkles overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent,_rgba(0,0,0,0.4))]" />
      </div>

      {/* Side Navigation */}
      <AnimatePresence>
        <motion.nav 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="fixed left-8 top-1/2 -translate-y-1/2 z-50 hidden lg:block"
        >
          <ul className="space-y-6">
            {[
              { id: 'experience', label: 'Experience', number: '01', color: 'text-yellow-400' },
              { id: 'projects', label: 'Projects', number: '02', color: 'text-purple-400' },
              { id: 'technologies', label: 'Tech Stack', number: '03', color: 'text-pink-400' },
              { id: 'education', label: 'Education', number: '04', color: 'text-yellow-400' }
            ].map((section) => (
              <li key={section.id}>
                <button
                  onClick={() => scrollToSection(section.id)}
                  className={`group flex items-center gap-4 transition-all duration-300 ${
                    activeSection === section.id
                      ? 'text-white'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  <span className={`text-xs font-mono transition-all duration-300 ${
                    activeSection === section.id
                      ? section.color
                      : 'text-zinc-600'
                  }`}>
                    {section.number}
                  </span>
                  <span className={`block w-8 h-[1px] transition-all duration-300 ${
                    activeSection === section.id
                                              ? `bg-gradient-to-r ${section.color === 'text-yellow-400' ? 'from-yellow-400 to-amber-500' : section.color === 'text-purple-400' ? 'from-purple-400 to-purple-600' : section.color === 'text-pink-400' ? 'from-pink-400 to-pink-600' : 'from-yellow-400 to-amber-500'} w-12`
                      : 'bg-zinc-600 group-hover:w-12'
                  }`} />
                  <span className={`text-sm font-light tracking-wider transition-all duration-300 ${
                    activeSection === section.id
                      ? 'translate-x-1'
                      : 'group-hover:translate-x-1'
                  }`}>
                    {section.label}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </motion.nav>
      </AnimatePresence>

      <div className="relative z-10">
        {/* Hero/Title Section */}
        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="min-h-[70vh] flex items-center justify-center px-6 md:px-20 lg:px-32"
        >
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-6xl md:text-8xl font-light tracking-tight mb-4">
                <span className="bg-gradient-to-r from-yellow-400 via-purple-400 to-yellow-400 bg-clip-text text-transparent animate-shimmer bg-300%">Oliver</span>
                <span className="text-white/90 ml-4">Do</span>
              </h1>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="h-[2px] w-32 bg-gradient-to-r from-transparent via-purple-400 to-transparent mx-auto mb-6"
            />
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-zinc-300 text-lg font-light tracking-widest uppercase"
            >
              Founder · <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Ember&Tide</span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="mt-20"
            >
              <button
                onClick={() => scrollToSection('experience')}
                className="text-white/60 hover:text-yellow-400 transition-colors duration-300"
              >
                <svg className="w-6 h-6 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </button>
            </motion.div>
          </div>
        </motion.section>

        {/* Main Content */}
        <div className="px-6 md:px-20 lg:px-32 max-w-6xl mx-auto">
          {/* Experience Section */}
          <section id="experience" className="mb-32 scroll-mt-20">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-sm font-mono bg-gradient-to-r from-yellow-400 to-purple-400 bg-clip-text text-transparent mb-2">01. Experience</h2>
              <div className="h-[2px] bg-gradient-to-r from-yellow-400/50 via-purple-400/50 to-transparent w-full" />
            </motion.div>
            
            <div className="space-y-8">
              {experiences.map((exp, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="group"
                >
                  <div className="relative bg-black/40 backdrop-blur-md border border-purple-400/40 rounded-3xl p-8 hover:border-yellow-400/60 transition-all duration-500 overflow-hidden shadow-lg shadow-purple-500/20 hover:shadow-yellow-400/20">
                    <div className={`absolute inset-0 bg-gradient-to-br ${exp.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                    <div className="relative z-10">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
                        <div>
                          <h3 className="text-2xl font-light text-white mb-1">{exp.title}</h3>
                          <p className={`bg-gradient-to-r ${exp.gradient} bg-clip-text text-transparent font-medium`}>{exp.company}</p>
                        </div>
                        <div className="text-right mt-2 md:mt-0">
                          <p className="text-sm text-purple-300">{exp.duration}</p>
                          <p className="text-sm text-zinc-400">{exp.location}</p>
                        </div>
                      </div>
                      
                      <ul className="space-y-3 mb-6">
                        {exp.highlights.map((highlight, hidx) => (
                          <li key={hidx} className="text-white/80 flex items-start text-sm leading-relaxed">
                            <span className="text-yellow-400/60 mr-3 mt-1">•</span>
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {exp.tech.map((tech, tidx) => (
                          <span key={tidx} className={`px-3 py-1 bg-gradient-to-r ${exp.gradient} bg-opacity-10 rounded-lg text-xs border border-white/10 text-white/80`}>
                            {tech}
                          </span>
                        ))}
                      </div>
                      
                      <p className="text-sm text-emerald-400/80 font-light">
                        → {exp.impact}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Projects Section */}
          <section id="projects" className="mb-32 scroll-mt-20">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-sm font-mono text-blue-400 mb-2">02. Projects</h2>
              <div className="h-[2px] bg-gradient-to-r from-blue-400/50 via-blue-400/30 to-transparent w-full" />
            </motion.div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {projects.map((project, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="group cursor-pointer"
                >
                  <div className="relative bg-purple-900/20 backdrop-blur-md border border-blue-500/30 rounded-3xl p-6 hover:border-blue-400 transition-all duration-500 overflow-hidden h-full shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20">
                    <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                    <div className="relative z-10">
                      <h3 className={`text-xl font-light mb-3 bg-gradient-to-r ${project.gradient} bg-clip-text text-transparent`}>{project.name}</h3>
                      <p className="text-zinc-300 text-sm mb-4 leading-relaxed">{project.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech, tidx) => (
                          <span key={tidx} className="px-2 py-1 bg-blue-800/30 text-blue-300 rounded text-xs">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Technologies Section */}
          <section id="technologies" className="mb-32 scroll-mt-20">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-sm font-mono text-pink-400 mb-2">03. Tech Stack</h2>
              <div className="h-[2px] bg-gradient-to-r from-pink-400/50 via-pink-400/30 to-transparent w-full" />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <div className="flex flex-wrap gap-3 mb-12">
                {technologies.map((tech, idx) => (
                  <motion.span
                    key={idx}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.03 }}
                    whileHover={{ scale: 1.05 }}
                    className={`px-4 py-2 rounded-lg text-sm border ${tech.color} backdrop-blur-md cursor-pointer transition-all shadow-md hover:shadow-lg`}
                  >
                    {tech.name}
                  </motion.span>
                ))}
              </div>
              
              {/* Additional Skills Grid */}
              <div className="grid md:grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="relative bg-purple-900/20 backdrop-blur-md border border-purple-500/30 rounded-3xl p-6 overflow-hidden group shadow-lg shadow-purple-500/10 hover:shadow-purple-500/20 hover:border-purple-400 transition-all duration-500"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-pink-600 opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
                  <h3 className="text-lg font-light text-white mb-4">Cloud & Infrastructure</h3>
                  <p className="text-sm text-zinc-300 leading-relaxed">
                    AWS (Lambda, S3, DynamoDB, CloudFormation), Docker, CI/CD, Vercel, Heroku, Jenkins, CloudWatch
                  </p>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="relative bg-purple-900/20 backdrop-blur-md border border-blue-500/30 rounded-3xl p-6 overflow-hidden group shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20 hover:border-blue-400 transition-all duration-500"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-cyan-600 opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
                  <h3 className="text-lg font-light text-white mb-4">Development & Tools</h3>
                  <p className="text-sm text-zinc-300 leading-relaxed">
                    REST APIs, GraphQL, JWT, OAuth, Unit/Integration Testing, Agile/Scrum, Postman, Jira
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </section>

          {/* Education Section */}
          <section id="education" className="mb-32 scroll-mt-20">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-sm font-mono text-cyan-400 mb-2">04. Education</h2>
              <div className="h-[2px] bg-gradient-to-r from-cyan-400/50 via-cyan-400/30 to-transparent w-full" />
            </motion.div>
            
            <div className="space-y-6">
              {education.map((edu, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="relative bg-purple-900/20 backdrop-blur-md border border-purple-500/30 rounded-3xl p-6 overflow-hidden group shadow-lg shadow-purple-500/10 hover:shadow-purple-500/20 hover:border-purple-400 transition-all duration-500"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${edu.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                  <h3 className="text-lg font-light text-white mb-1">{edu.degree}</h3>
                  <p className={`bg-gradient-to-r ${edu.gradient} bg-clip-text text-transparent text-sm mb-1`}>{edu.school}</p>
                  <p className="text-sm text-zinc-400">{edu.years}</p>
                </motion.div>
              ))}
              
              {/* Additional Experience */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="mt-8"
              >
                <h3 className="text-lg font-light text-white mb-4">Additional Experience</h3>
                <div className="space-y-3">
                  <div className="bg-purple-900/20 backdrop-blur-md border border-purple-500/30 rounded-2xl p-4 hover:border-purple-400 transition-all shadow-md shadow-purple-500/10 hover:shadow-purple-500/20">
                    <span className="text-zinc-200">Freelance Certified Personal Trainer</span>
                    <span className="text-zinc-500"> • 2012–2017</span>
                  </div>
                  <div className="bg-purple-900/20 backdrop-blur-md border border-purple-500/30 rounded-2xl p-4 hover:border-purple-400 transition-all shadow-md shadow-purple-500/10 hover:shadow-purple-500/20">
                    <span className="text-zinc-200">Marketing Assistant — ANQI</span>
                    <span className="text-zinc-500"> • 2015–2016</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        </div>

      </div>
    </main>
  );
}