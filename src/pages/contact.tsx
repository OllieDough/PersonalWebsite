"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ReCAPTCHA from "react-google-recaptcha";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: ""
  });
  const [charCount, setCharCount] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showValidationModal, setShowValidationModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState("");

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "message" && value.length > 1000) return;
  
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  
    if (name === "message") {
      setCharCount(value.length);
    }
  };
  

  const handleSubmit = async () => {
    if (isSubmitting) return;
  
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.message) {
      setShowValidationModal(true);
      return;
    }
  
    if (!recaptchaToken) {
      setShowErrorModal(true);
      return;
    }
  
    setIsSubmitting(true);
  
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          recaptchaToken,
        }),
      });
  
      const data = await res.json();
  
      if (res.ok && data.success) {
        setShowSuccessModal(true);
        setFormData({ firstName: "", lastName: "", email: "", message: "" });
        setCharCount(0);
        setRecaptchaToken("");
      } else {
        throw new Error(data.error || "Failed");
      }
    } catch (error) {
      setShowErrorModal(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    type: "success" | "validation" | "error";
  }
  const Modal: React.FC<ModalProps> = ({ isOpen, onClose, type }) => {
    useEffect(() => {
      if (isOpen) {
        // Prevent body scroll when modal is open
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'unset';
      }
      
      return () => {
        document.body.style.overflow = 'unset';
      };
    }, [isOpen]);
    
    if (!isOpen) return null;

    const isSuccess = type === 'success';
    const isValidation = type === 'validation';
    
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
        
        {/* Modal Content */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: "spring", damping: 15 }}
          className="relative max-w-md w-full"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative bg-black/90 backdrop-blur-xl rounded-3xl p-8 border border-purple-500/30 shadow-2xl overflow-hidden">
            {/* Gradient glow effect */}
            <div className={`absolute inset-0 bg-gradient-to-br ${
              isValidation ? 'from-amber-500/20 to-purple-500/20' : 
              isSuccess ? 'from-green-500/20 to-purple-500/20' : 
              'from-red-500/20 to-purple-500/20'
            } opacity-50`} />
            
            {/* Content */}
            <div className="relative z-10 text-center">
              {/* Animated Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", damping: 10 }}
                className="text-6xl mb-4"
              >
                {isValidation ? '⚠️' : isSuccess ? '✨' : '😔'}
              </motion.div>
              
              {/* Title */}
              <h3 className="text-2xl font-bold mb-3">
                <span className={`bg-gradient-to-r ${
                  isValidation ? 'from-amber-400 to-yellow-400' :
                  isSuccess ? 'from-green-400 to-yellow-400' : 
                  'from-red-400 to-pink-400'
                } bg-clip-text text-transparent`}>
                  {isValidation ? 'Missing Information' : 
                   isSuccess ? 'Message Sent!' : 
                   'Oops, Something Went Wrong'}
                </span>
              </h3>
              
              {/* Message */}
              <p className="text-purple-200 mb-6">
                {isValidation 
                  ? "Please fill in all required fields before sending your message."
                  : isSuccess 
                  ? "Your message has been successfully delivered. I'll get back to you within 48 hours!"
                  : "There was an error sending your message. Please try again or reach out directly via email."}
              </p>
              
              {/* Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className={`px-8 py-3 rounded-xl font-semibold text-white transition-all ${
                  isValidation 
                    ? 'bg-gradient-to-r from-amber-500 to-purple-500 hover:from-amber-400 hover:to-purple-400' :
                  isSuccess 
                    ? 'bg-gradient-to-r from-green-500 to-purple-500 hover:from-green-400 hover:to-purple-400' 
                    : 'bg-gradient-to-r from-red-500 to-purple-500 hover:from-red-400 hover:to-purple-400'
                } shadow-lg`}
              >
                {isValidation ? 'Got it!' : isSuccess ? 'Awesome!' : 'Try Again'}
              </motion.button>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 text-4xl animate-float opacity-50">
              {isValidation ? '📝' : isSuccess ? '🌟' : '💔'}
            </div>
            <div className="absolute -bottom-4 -left-4 text-3xl animate-float opacity-50" style={{ animationDelay: '1s' }}>
              {isValidation ? '✏️' : isSuccess ? '💫' : '😢'}
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  if (!isLoaded) {
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
          50% { transform: translateY(-20px) rotate(2deg); }
        }
        
        @keyframes pulse-glow {
          0%, 100% { 
            box-shadow: 0 0 20px rgba(251, 191, 36, 0.5);
          }
          50% { 
            box-shadow: 0 0 40px rgba(251, 191, 36, 0.8), 0 0 60px rgba(147, 51, 234, 0.5);
          }
        }
        
        @keyframes shimmer {
          0% { background-position: 0%; }
          50% { background-position: 100%; }
          100% { background-position: 0%; }
        }
        
        @keyframes twinkle {
          0%, 100% { opacity: 0; transform: scale(0); }
          50% { opacity: 1; transform: scale(1); }
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
        
        .twinkle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: #fbbf24;
          border-radius: 50%;
          animation: twinkle 3s ease-in-out infinite;
        }
        
        .cosmic-input {
          background: rgba(147, 51, 234, 0.1);
          border: 1px solid rgba(251, 191, 36, 0.3);
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
        }
        
        .cosmic-input:focus {
          outline: none;
          border-color: rgba(251, 191, 36, 0.8);
          box-shadow: 0 0 20px rgba(251, 191, 36, 0.3);
          background: rgba(147, 51, 234, 0.15);
        }
        
        .cosmic-button {
          background: linear-gradient(135deg, #fbbf24, #9333ea);
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
        }
        
        .cosmic-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          transition: left 0.5s ease;
        }
        
        .cosmic-button:hover::before {
          left: 100%;
        }
        
        .cosmic-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(251, 191, 36, 0.5);
        }
      `}</style>

      {/* Purple glow background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(128,_0,_128,_0.8),_black)]" />
        
        {/* Animated gradient orbs */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-purple-500/50 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-pink-500/50 rounded-full blur-[150px] animate-pulse delay-700" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-600/40 rounded-full blur-[180px] animate-pulse delay-1000" />
        
        {/* Golden accent orbs */}
        <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-yellow-400/20 to-amber-500/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-br from-purple-400/30 to-pink-400/30 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
        
        {/* Twinkling stars removed for cleaner look */}
      </div>

      <div className="relative z-10 px-6 md:px-20 lg:px-32 py-16 pt-32">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-4">
            <span className="bg-gradient-to-r from-yellow-400 via-purple-400 to-yellow-400 bg-clip-text text-transparent animate-shimmer bg-300%">
              Get In Touch
            </span>
          </h1>
          <p className="text-xl text-purple-200 max-w-2xl mx-auto">
            Have a project in mind or want to discuss software engineering opportunities? 
            I'd love to hear from you. Send me a message and I'll get back to you within 48 hours.
          </p>
          
          {/* Floating emojis */}
          <div className="absolute -top-10 left-10 text-4xl animate-float">💫</div>
          <div className="absolute -top-5 right-20 text-3xl animate-float" style={{ animationDelay: "2s" }}>✨</div>
          <div className="absolute top-20 right-10 text-4xl animate-float" style={{ animationDelay: "1s" }}>🌟</div>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left Column - Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-8"
            >
              {/* Let's Connect */}
              <div className="relative">
                <h2 className="text-2xl font-bold mb-6">
                  <span className="bg-gradient-to-r from-purple-400 to-yellow-400 bg-clip-text text-transparent">
                    Let's Connect
                  </span>
                </h2>
                <div className="space-y-4">
                  <motion.div 
                    className="flex items-center gap-3 text-purple-100"
                    whileHover={{ x: 10 }}
                  >
                    <span className="text-2xl">🌍</span>
                    <span>Remote (Available Worldwide)</span>
                  </motion.div>
                  <motion.div 
                    className="flex items-center gap-3 text-purple-100"
                    whileHover={{ x: 10 }}
                  >
                    <span className="text-2xl">⏰</span>
                    <span>Usually responds within 24 hours</span>
                  </motion.div>
                  <motion.div 
                    className="flex items-center gap-3 text-purple-100"
                    whileHover={{ x: 10 }}
                  >
                    <span className="text-2xl">💼</span>
                    <span>Available for contract and part-time roles</span>
                  </motion.div>
                </div>
              </div>

              {/* What I Can Help With */}
              <div>
                <h2 className="text-2xl font-bold mb-6">
                  <span className="bg-gradient-to-r from-yellow-400 to-purple-400 bg-clip-text text-transparent">
                    What I Can Help With
                  </span>
                </h2>
                <div className="space-y-3">
                  {[
                    { icon: "🚀", text: "Full-stack web application development" },
                    { icon: "📱", text: "Mobile application development" },
                    { icon: "🎨", text: "UI/UX design and implementation" },
                    { icon: "🔌", text: "Third-party integrations and APIs" },
                    { icon: "☁️", text: "Cloud infrastructure and DevOps" }
                  ].map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + idx * 0.1 }}
                      whileHover={{ x: 10 }}
                      className="flex items-center gap-3 text-purple-100"
                    >
                      <span className="text-xl">{item.icon}</span>
                      <span>{item.text}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right Column - Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="relative"
            >
              <div className="absolute -top-4 -right-4 text-4xl animate-float">💌</div>
              
              {/* Form Box */}
              <div className="bg-purple-900/10 backdrop-blur-md border border-purple-500/30 rounded-3xl p-8 shadow-2xl hover:border-purple-400/50 transition-all duration-300">
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold mb-6">
                    <span className="bg-gradient-to-r from-purple-400 to-yellow-400 bg-clip-text text-transparent">
                      Send me a message
                    </span>
                  </h2>

                  {/* Name Fields */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-purple-300 mb-2">
                        First Name <span className="text-yellow-400">*</span>
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="Enter your first name"
                        className="w-full px-4 py-3 rounded-xl cosmic-input text-white placeholder-purple-300/50"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-purple-300 mb-2">
                        Last Name <span className="text-yellow-400">*</span>
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Enter your last name"
                        className="w-full px-4 py-3 rounded-xl cosmic-input text-white placeholder-purple-300/50"
                        required
                      />
                    </div>
                  </div>

                  {/* Email Field */}
                  <div>
                    <label className="block text-purple-300 mb-2">
                      Email Address <span className="text-yellow-400">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email address"
                      className="w-full px-4 py-3 rounded-xl cosmic-input text-white placeholder-purple-300/50"
                      required
                    />
                  </div>

                  {/* Message Field */}
                  <div>
                    <label className="block text-purple-300 mb-2">
                      Message <span className="text-yellow-400">*</span>
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell me about your project or just say hi! ✨"
                      rows={6}
                      className="w-full px-4 py-3 rounded-xl cosmic-input text-white placeholder-purple-300/50 resize-none"
                      required
                    />
                    <div className="text-right mt-2 text-purple-400 text-sm">
                      {charCount}/1000
                    </div>
                  </div>

                  {/* reCAPTCHA notice */}
                  <p className="text-purple-400/60 text-xs">
                    This form is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.
                  </p>

                  <ReCAPTCHA
                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
                    onChange={(token: any) => setRecaptchaToken(token || "")}
                  />
                  
                  {/* Submit Button */}
                  <motion.button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className={`w-full py-4 rounded-xl cosmic-button text-white font-bold text-lg relative overflow-hidden cursor-pointer ${
                      isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                    whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message ✨'}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Success Modal */}
        <Modal 
          isOpen={showSuccessModal} 
          onClose={() => setShowSuccessModal(false)} 
          type="success" 
        />
        
        {/* Error Modal */}
        <Modal 
          isOpen={showErrorModal} 
          onClose={() => setShowErrorModal(false)} 
          type="error" 
        />
        
        {/* Validation Modal */}
        <Modal 
          isOpen={showValidationModal} 
          onClose={() => setShowValidationModal(false)} 
          type="validation" 
        />
      </div>
    </main>
  );
}