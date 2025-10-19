import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Brain, Code, Zap, Cpu } from 'lucide-react';

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [displayedCode, setDisplayedCode] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasTypedOnce, setHasTypedOnce] = useState(false);
  const [currentInterval, setCurrentInterval] = useState(null);

  const fullCode = `{
  "name": "Utkarsh Yadav",
  "role": "SDE1 | ML Engineer",
  "location": "India",
  "passion": "Artificial Intelligence",
  "mission": "Building tomorrow's AI today",
  "availability": {
    "fullTime": true,
    "freelance": true
  },
  "interests": [
    "Machine Learning",
    "Generative AI",
    "Natural Language Processing",
    "Computer Vision",
    "MLOps"
  ],
  "currentFocus": "LLMs & Gen AI",
  "status": "Open to opportunities"
}`;

  const startTypewriter = () => {
    // Clear any existing interval first
    if (currentInterval) {
      clearInterval(currentInterval);
    }
    
    setDisplayedCode('');
    setIsTyping(true);
    let index = 0;
    const interval = setInterval(() => {
      if (index < fullCode.length) {
        setDisplayedCode(fullCode.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
        setIsTyping(false);
        setHasTypedOnce(true);
        setCurrentInterval(null);
      }
    }, 20);
    setCurrentInterval(interval);
    return interval;
  };

  useEffect(() => {
    if (inView && !hasTypedOnce) {
      startTypewriter();
    }
    return () => {
      if (currentInterval) {
        clearInterval(currentInterval);
      }
    };
  }, [inView, hasTypedOnce]);

  const handleHover = () => {
    startTypewriter();
  };

  const techStack = [
    { name: 'Machine Learning', icon: Brain, color: 'electric' },
    { name: 'Deep Learning', icon: Cpu, color: 'neon-purple' },
    { name: 'Python', icon: Code, color: 'neon' },
    { name: 'Gen AI', icon: Zap, color: 'electric' },
  ];

  return (
    <section id="about" className="relative py-32 px-4 bg-cream-200/50 mt-12">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          {/* Section Header */}
          <div className="font-mono">
            <div className="text-electric text-sm mb-2">
              {'>'} cat about_me.json
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-charcoal-900 mb-4">
              <span className="syntax-comment">// </span>
              About Me
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* JSON-style About with Typewriter in Terminal */}
            <div className="flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, x: -30, rotate: 0 }}
                animate={inView ? { opacity: 1, x: 0, rotate: -2 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                whileHover={{ rotate: 0, scale: 1.02 }}
                className={`terminal-window cursor-pointer transition-all group w-full ${
                  isTyping ? 'shadow-glow-blue' : 'hover:shadow-xl'
                }`}
                style={{ 
                  transformStyle: 'preserve-3d',
                  WebkitFontSmoothing: 'subpixel-antialiased',
                  MozOsxFontSmoothing: 'grayscale',
                  backfaceVisibility: 'hidden',
                  willChange: 'transform',
                  imageRendering: 'crisp-edges'
                }}
                onMouseEnter={handleHover}
              >
                <div className="terminal-header">
                  <div className="terminal-button red"></div>
                  <div className="terminal-button yellow"></div>
                  <div className="terminal-button green"></div>
                  <span className="text-cream-100 text-xs ml-2">about_me.json</span>
                </div>
                
                <div className="p-6 font-mono text-sm relative" style={{
                  WebkitFontSmoothing: 'subpixel-antialiased',
                  MozOsxFontSmoothing: 'grayscale',
                  textRendering: 'optimizeLegibility'
                }}>
                  <pre className="text-charcoal-800 leading-relaxed m-0" style={{
                    WebkitFontSmoothing: 'subpixel-antialiased',
                    fontSmooth: 'always',
                    textRendering: 'geometricPrecision'
                  }}>
                  {displayedCode.split('\n').map((line, i) => {
                    let highlighted = line;
                    
                    // Highlight keys (property names)
                    highlighted = highlighted.replace(/"([^"]+)":/g, (match, key) => {
                      return `<span class="text-neon-purple font-semibold">"${key}"</span>:`;
                    });
                    
                    // Highlight string values (using coral/orange)
                    highlighted = highlighted.replace(/: "([^"]+)"/g, (match, value) => {
                      return `: <span class="text-coral">"${value}"</span>`;
                    });
                    
                    // Highlight boolean values
                    highlighted = highlighted.replace(/: (true|false|null)/g, (match, bool) => {
                      return `: <span class="text-electric font-semibold">${bool}</span>`;
                    });
                    
                    return (
                      <div key={i} dangerouslySetInnerHTML={{ __html: highlighted }} />
                    );
                  })}
                  {isTyping && (
                    <span className="inline-block w-2 h-5 bg-electric ml-1 animate-pulse" />
                  )}
                </pre>
                
                {/* Hover hint */}
                <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-xs font-mono text-charcoal-800/50">hover to replay →</span>
                </div>
              </div>
              </motion.div>
            </div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-6"
            >
              <div className="font-mono space-y-4 text-charcoal-800">
                <p className="text-lg leading-relaxed">
                  <span className="syntax-comment">// </span>
                  Passionate ML Engineer specializing in building intelligent systems that solve real-world problems.
                </p>
                <p className="leading-relaxed">
                  With expertise in machine learning, deep learning, and generative AI, I transform complex data into actionable insights and innovative solutions. My focus lies in developing scalable AI systems that push the boundaries of what's possible.
                </p>
                <p className="leading-relaxed">
                  Currently exploring the frontiers of Large Language Models, prompt engineering, and AI agent systems. Always eager to learn, experiment, and contribute to the AI community.
                </p>
              </div>

              {/* Tech Stack Icons */}
              <div className="grid grid-cols-2 gap-4 pt-4">
                {techStack.map((tech, index) => (
                  <motion.div
                    key={tech.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    whileHover={{ scale: 1.05, rotate: 2 }}
                    className="glass-card p-4 rounded-lg flex items-center gap-3 border-l-4 border-electric"
                  >
                    <tech.icon className={`w-6 h-6 text-${tech.color}`} />
                    <span className="font-mono font-semibold text-sm">{tech.name}</span>
                  </motion.div>
                ))}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 pt-6">
                {[
                  { label: 'Projects', value: '20+' },
                  { label: 'Experience', value: '2+ Yrs' },
                  { label: 'Coffee', value: '∞' },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    className="text-center"
                  >
                    <div className="text-xl sm:text-2xl md:text-3xl font-bold gradient-text font-mono whitespace-nowrap overflow-hidden text-ellipsis [word-spacing:-0.3em]">
                      {stat.value}
                    </div>
                    <div className="text-sm text-charcoal-800 font-mono mt-1">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
