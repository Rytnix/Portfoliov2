import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Code2, Sparkles, ArrowDown } from 'lucide-react';
import Brain3D from './Brain3D';
import TypeWriter from './TypeWriter';
import ResumeChat from './ResumeChat';

const Hero = () => {
  const [bootComplete, setBootComplete] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [showResumeChat, setShowResumeChat] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setBootComplete(true);
      setTimeout(() => setShowContent(true), 500);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden py-12 md:py-20 px-4">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(#2D3748 1px, transparent 1px), linear-gradient(90deg, #2D3748 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left side - Terminal content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4 md:space-y-6"
          >
            {/* AI Resume Analyzer Button */}
            {bootComplete && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <motion.button
                  onClick={() => setShowResumeChat(true)}
                  whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(0, 217, 255, 0.6)' }}
                  whileTap={{ scale: 0.98 }}
                  className="relative w-full group"
                >
                  {/* Animated gradient border */}
                  <div className="absolute inset-0 bg-gradient-to-r from-electric via-neon-purple to-neon rounded-xl blur-sm group-hover:blur-md transition-all duration-300 opacity-75"></div>
                  
                  {/* Button content */}
                  <div className="relative bg-charcoal-900 rounded-xl p-4 md:p-6 border-2 border-electric/50">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-3 md:gap-4">
                        {/* AI icon with pulse animation */}
                        <div className="relative">
                          <motion.div
                            animate={{ 
                              scale: [1, 1.2, 1],
                              opacity: [0.5, 0.8, 0.5]
                            }}
                            transition={{ 
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                            className="absolute inset-0 bg-electric rounded-full blur-xl"
                          />
                          <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-electric relative z-10" />
                        </div>
                        
                        {/* Text content */}
                        <div className="text-left">
                          <h3 className="text-base md:text-xl font-bold font-mono text-cream-100 mb-1">
                            Cyron - AI Assistant
                          </h3>
                          <p className="text-xs md:text-sm font-mono text-electric">
                            Ask me anything about my experience
                          </p>
                        </div>
                      </div>
                      
                      {/* Arrow with animation */}
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ 
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        className="hidden sm:block"
                      >
                        <ArrowDown className="w-5 h-5 md:w-6 md:h-6 text-neon rotate-[-90deg]" />
                      </motion.div>
                    </div>
                    
                    {/* Decorative code-like elements */}
                    <div className="mt-4 flex flex-wrap gap-2 text-xs font-mono text-cream-100/40">
                      <span className="text-neon-purple">class</span>
                      <span>Cyron</span>
                      <span className="text-electric">{'{'}</span>
                      <span className="text-neon">type: "AI_Assistant"</span>
                      <span className="text-electric">{'}'}</span>
                    </div>
                  </div>
                </motion.button>
              </motion.div>
            )}

            {/* Resume Chat Modal */}
            <ResumeChat isOpen={showResumeChat} onClose={() => setShowResumeChat(false)} />

            {/* Main content */}
            {showContent && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-4 md:space-y-6"
              >
                <div>
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-3 md:mb-4 font-mono leading-tight">
                    <span className="bg-gradient-to-r from-charcoal-900 via-charcoal-800 to-charcoal-900 bg-clip-text text-transparent">
                      UTKARSH YADAV
                    </span>
                  </h1>
                  <div className="text-base sm:text-lg md:text-2xl lg:text-3xl font-semibold text-charcoal-800 space-y-2">
                    <div className="flex items-center gap-2">
                      <Code2 className="w-4 h-4 md:w-6 md:h-6 text-electric flex-shrink-0" />
                      <TypeWriter text="SDE1 | ML/Gen_AI_Engineer" delay={50} />
                    </div>
                    <div className="flex items-center gap-2 text-sm sm:text-base md:text-xl text-charcoal-800">
                      <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-neon flex-shrink-0" />
                      <TypeWriter text="Building_Intelligent_Systems.py" delay={40} />
                    </div>
                  </div>
                </div>

                {/* Command line style description */}
                <div className="font-mono text-xs md:text-sm space-y-1 text-charcoal-800 opacity-80">
                  <p className="syntax-comment">// Passionate about artificial intelligence</p>
                  <p className="syntax-comment hidden sm:block">// Transforming ideas into intelligent solutions</p>
                  <p className="syntax-comment">// ML | Deep Learning | Gen AI | NLP</p>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-4">
                  <motion.a
                    href="#projects"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full sm:w-auto text-center px-6 md:px-8 py-2.5 md:py-3 bg-charcoal-900 text-cream-100 font-mono font-semibold rounded-lg hover:bg-electric hover:text-charcoal-900 transition-all duration-300 shadow-glow-blue text-sm md:text-base"
                  >
                    [View_Projects]
                  </motion.a>
                  <motion.a
                    href="#contact"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full sm:w-auto text-center px-6 md:px-8 py-2.5 md:py-3 border-2 border-charcoal-900 text-charcoal-900 font-mono font-semibold rounded-lg hover:bg-charcoal-900 hover:text-cream-100 transition-all duration-300 text-sm md:text-base"
                  >
                    [Connect]
                  </motion.a>
                </div>

                {/* Tech stack badges */}
                <div className="flex flex-wrap gap-2 pt-2 md:pt-4">
                  {['Python', 'Java', 'TensorFlow', 'PyTorch', 'OpenCV'].map((tech, index) => (
                    <motion.span
                      key={tech}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 + 1 }}
                      className="px-3 py-1 bg-cream-200 border border-charcoal-800 rounded text-xs font-mono font-semibold"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Scroll indicator */}
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden lg:block"
            >
              <ArrowDown className="w-6 h-6 text-electric" />
            </motion.div>
          </motion.div>

          {/* Right side - 3D Brain */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-[300px] md:h-[400px] lg:h-[600px] relative hidden sm:block"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-electric/20 via-neon-purple/20 to-neon/20 rounded-lg blur-3xl"></div>
            <Brain3D />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
