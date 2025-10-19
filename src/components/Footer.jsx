import { Heart, Terminal, ArrowUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleNavigation = (item) => {
    if (!item) return;
    
    if (item === 'Papers') {
      navigate('/papers');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      if (location?.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          const element = document.getElementById(item.toLowerCase());
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      } else {
        const element = document.getElementById(item.toLowerCase());
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  return (
    <footer className="relative bg-charcoal-900 text-cream-100 py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 font-mono font-bold text-xl">
              <Terminal className="w-6 h-6 text-electric" />
              <span>
                <span className="text-electric">utkarsh@</span>
                <span>portfolio</span>
              </span>
            </div>
            <p className="font-mono text-sm text-cream-200">
              <span className="syntax-comment">
                // Building intelligent systems, one line of code at a time
              </span>
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-mono font-bold text-electric mb-4">Quick Links</h3>
            <nav className="space-y-2 font-mono text-sm">
              {['Home', 'About', 'Experience', 'Projects', 'Papers', 'Skills', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={item === 'Papers' ? '/papers' : `#${item.toLowerCase()}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigation(item);
                  }}
                  className="block text-cream-200 hover:text-neon transition-colors link-underline cursor-pointer"
                >
                  {'>'} {item}
                </a>
              ))}
            </nav>
          </div>

          {/* Status */}
          <div>
            <h3 className="font-mono font-bold text-electric mb-4">System Status</h3>
            <div className="font-mono text-sm space-y-2 text-cream-200">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-neon rounded-full animate-pulse"></span>
                <span>Online & Available</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-electric rounded-full animate-pulse"></span>
                <span>Open to Opportunities</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-neon-purple rounded-full animate-pulse"></span>
                <span>Building Cool Stuff</span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-cream-200/20 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <div className="font-mono text-sm text-cream-200">
              <p>
                © {new Date().getFullYear()} Utkarsh Yadav
              </p>
            </div>

            {/* Terminal command */}
            <div className="font-mono text-sm text-cream-200">
              <code className="text-electric">
                {'>'} cat /etc/motd: "Keep learning, keep building"
              </code>
            </div>

            {/* Scroll to top */}
            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 bg-electric text-charcoal-900 rounded-lg hover:bg-neon transition-colors"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-5 h-5" />
            </motion.button>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
