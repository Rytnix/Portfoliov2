import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const EasterEgg = () => {
  const [activated, setActivated] = useState(false);
  const [sequence, setSequence] = useState([]);

  // Konami code: up, up, down, down, left, right, left, right, b, a
  const konamiCode = [
    'ArrowUp',
    'ArrowUp',
    'ArrowDown',
    'ArrowDown',
    'ArrowLeft',
    'ArrowRight',
    'ArrowLeft',
    'ArrowRight',
    'b',
    'a',
  ];

  useEffect(() => {
    const handleKeyPress = (e) => {
      const newSequence = [...sequence, e.key];
      setSequence(newSequence.slice(-10));

      if (newSequence.slice(-10).join(',') === konamiCode.join(',')) {
        setActivated(true);
        setTimeout(() => setActivated(false), 5000);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [sequence]);

  return (
    <AnimatePresence>
      {activated && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          className="fixed inset-0 z-[200] flex items-center justify-center pointer-events-none"
        >
          {/* Confetti effect */}
          <div className="absolute inset-0">
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  x: window.innerWidth / 2,
                  y: window.innerHeight / 2,
                  opacity: 1,
                }}
                animate={{
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * window.innerHeight,
                  opacity: 0,
                }}
                transition={{ duration: 2, ease: 'easeOut' }}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  backgroundColor: ['#00D9FF', '#39FF14', '#B794F6', '#FF6B6B'][
                    Math.floor(Math.random() * 4)
                  ],
                }}
              />
            ))}
          </div>

          {/* Message */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            className="terminal-window max-w-md mx-4 pointer-events-auto"
          >
            <div className="terminal-header">
              <div className="terminal-button red"></div>
              <div className="terminal-button yellow"></div>
              <div className="terminal-button green"></div>
              <span className="text-cream-100 text-xs ml-2">secret_unlocked.sh</span>
            </div>
            <div className="p-8 text-center space-y-4">
              <Sparkles className="w-16 h-16 mx-auto text-electric animate-pulse" />
              <h2 className="text-2xl font-bold gradient-text font-mono">
                Easter Egg Unlocked! 🎉
              </h2>
              <p className="font-mono text-sm text-charcoal-800">
                <span className="syntax-comment">
                  // You found the secret Konami code!
                  <br />
                  // You must be a true developer 🚀
                </span>
              </p>
              <div className="pt-4 font-mono text-xs text-electric">
                {'>'} console.log("Keep exploring! There might be more...")
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EasterEgg;
