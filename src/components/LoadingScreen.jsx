import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal } from 'lucide-react';

const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState([]);

  const bootSequence = [
    '> Initializing system...',
    '> Loading neural networks...',
    '> Compiling ML models...',
    '> Starting AI engines...',
    '> Connecting to matrix...',
    '> Booting portfolio interface...',
    '> System ready ✓'
  ];

  useEffect(() => {
    let logIndex = 0;
    const logInterval = setInterval(() => {
      if (logIndex < bootSequence.length) {
        setLogs(prev => [...prev, bootSequence[logIndex]]);
        logIndex++;
      } else {
        clearInterval(logInterval);
      }
    }, 300);

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => onComplete(), 500);
          return 100;
        }
        return prev + 2;
      });
    }, 40);

    return () => {
      clearInterval(logInterval);
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[100] bg-cream-100 flex items-center justify-center"
    >
        <div className="w-full max-w-2xl px-4">
          <div className="terminal-window">
            <div className="terminal-header">
              <div className="terminal-button red"></div>
              <div className="terminal-button yellow"></div>
              <div className="terminal-button green"></div>
              <span className="text-cream-100 text-xs ml-2">boot_sequence.sh</span>
            </div>
            <div className="p-8 space-y-6">
              {/* Logo */}
              <div className="flex items-center justify-center gap-3 mb-8">
                <Terminal className="w-12 h-12 text-electric" />
                <h1 className="text-3xl font-bold font-mono gradient-text">
                  UTKARSH.SYS
                </h1>
              </div>

              {/* Boot logs */}
              <div className="space-y-2 font-mono text-sm min-h-[200px]">
                {logs.map((log, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`${
                      log.includes('✓')
                        ? 'text-neon'
                        : log.includes('>')
                        ? 'text-electric'
                        : 'text-charcoal-800'
                    }`}
                  >
                    {log}
                  </motion.div>
                ))}
                {progress < 100 && (
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                    className="inline-block w-2 h-4 bg-electric ml-1"
                  />
                )}
              </div>

              {/* Progress bar */}
              <div className="space-y-2">
                <div className="flex justify-between font-mono text-xs text-charcoal-800">
                  <span>Loading...</span>
                  <span>{progress}%</span>
                </div>
                <div className="h-3 bg-cream-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.2 }}
                    className="h-full bg-gradient-to-r from-electric via-neon-purple to-neon"
                  />
                </div>
              </div>

              {/* System info */}
              <div className="font-mono text-xs text-charcoal-800 pt-4 border-t border-charcoal-800/20">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-electric">OS:</span> Portfolio v2.0
                  </div>
                  <div>
                    <span className="text-electric">Build:</span> 2024.10.18
                  </div>
                  <div>
                    <span className="text-electric">Mode:</span> Production
                  </div>
                  <div>
                    <span className="text-electric">Status:</span>{' '}
                    <span className="text-neon">Active</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </motion.div>
  );
};

export default LoadingScreen;
