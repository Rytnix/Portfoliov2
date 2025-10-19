import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Terminal } from 'lucide-react';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = ['home', 'about', 'experience', 'projects', 'skills', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '#home', command: 'cd ~/', isSection: true },
    { name: 'About', href: '#about', command: 'cat about.md', isSection: true },
    { name: 'Experience', href: '#experience', command: 'git log', isSection: true },
    { name: 'Projects', href: '#projects', command: 'ls projects/', isSection: true },
    { name: 'Papers', href: '/papers', command: 'cat papers/', isSection: false },
    { name: 'Skills', href: '#skills', command: 'npm list', isSection: true },
    { name: 'Contact', href: '#contact', command: './contact.sh', isSection: true },
  ];

  const handleClick = (href, isSection) => {
    if (!href) return;
    setIsOpen(false);
    
    if (isSection) {
      // Handle section navigation on home page
      if (location?.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          const element = document.querySelector(href);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      } else {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    } else {
      // Handle page navigation
      navigate(href);
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-cream-100/95 backdrop-blur-md shadow-lg border-b-2 border-charcoal-800/10'
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <motion.a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                handleClick('#home', true);
              }}
              whileHover={{ scale: 1.05 }}
              className={`flex items-center gap-2 font-mono font-bold text-xl transition-colors ${
                location?.pathname === '/' && activeSection === 'home'
                  ? 'text-electric'
                  : 'text-charcoal-900'
              }`}
            >
              <Terminal className="w-6 h-6 text-electric" />
              <span className="hidden sm:inline">
                <span className="text-electric">utkarsh@</span>
                <span>portfolio</span>
                <span className="text-neon">:~$</span>
              </span>
              <span className="sm:hidden gradient-text">UY</span>
            </motion.a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = item.isSection 
                  ? activeSection === item.href?.slice(1)
                  : location?.pathname === item.href;
                
                return (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleClick(item.href, item.isSection);
                    }}
                    whileHover={{ y: -2 }}
                    className={`px-4 py-2 font-mono text-sm transition-all duration-300 rounded relative group ${
                      isActive
                        ? 'text-electric font-semibold'
                        : 'text-charcoal-800 hover:text-electric'
                    }`}
                  >
                    <span className="relative z-10">{item.name}</span>
                    {isActive && (
                      <motion.div
                        layoutId="activeSection"
                        className="absolute inset-0 bg-electric/10 border border-electric rounded"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    {/* Tooltip */}
                    <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-charcoal-900 text-cream-100 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                      {item.command}
                    </span>
                  </motion.a>
                );
              })}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-charcoal-900 hover:text-electric transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-charcoal-900/50 backdrop-blur-sm"
            />

            {/* Menu */}
            <div className="absolute right-0 top-0 bottom-0 w-64 bg-cream-100 shadow-2xl">
              <div className="terminal-window h-full rounded-none">
                <div className="terminal-header">
                  <div className="terminal-button red"></div>
                  <div className="terminal-button yellow"></div>
                  <div className="terminal-button green"></div>
                  <span className="text-cream-100 text-xs ml-2">navigation.sh</span>
                </div>
                <nav className="p-6 space-y-2">
                  {navItems.map((item, index) => {
                    const isActive = item.isSection 
                      ? activeSection === item.href?.slice(1)
                      : location?.pathname === item.href;
                    
                    return (
                      <motion.a
                        key={item.name}
                        href={item.href}
                        onClick={(e) => {
                          e.preventDefault();
                          handleClick(item.href, item.isSection);
                        }}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={`block px-4 py-3 font-mono text-sm rounded-lg transition-all duration-300 ${
                          isActive
                            ? 'bg-electric/20 text-electric border-l-4 border-electric'
                            : 'text-charcoal-800 hover:bg-cream-200 hover:text-electric'
                        }`}
                      >
                        <div className="text-xs opacity-60 mb-1">{item.command}</div>
                        <div className="font-semibold">{item.name}</div>
                      </motion.a>
                    );
                  })}
                </nav>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
