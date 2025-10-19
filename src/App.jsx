import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Insights } from './components/Insights';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';
import MatrixRain from './components/MatrixRain';
import NeuralNetwork from './components/NeuralNetwork';
import CursorTrail from './components/CursorTrail';
import DarkModeToggle from './components/DarkModeToggle';
import EasterEgg from './components/EasterEgg';
import ResearchPapersPage from './pages/ResearchPapersPage';

// ScrollToTop component to handle route changes
function ScrollToTop() {
  const location = useLocation();
  
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);
  
  return null;
}

function App() {
  const [loading, setLoading] = useState(true);

  const handleLoadingComplete = () => {
    setLoading(false);
  };

  return (
    <Router>
      <ScrollToTop />
      {/* Loading Screen */}
      <AnimatePresence mode="wait">
        {loading && <LoadingScreen onComplete={handleLoadingComplete} />}
      </AnimatePresence>

      {/* Main Content */}
      {!loading && (
        <Routes>
          {/* Home Page */}
          <Route path="/" element={
            <div className="relative min-h-screen overflow-x-hidden">
              {/* Background Effects */}
              <MatrixRain />
              <NeuralNetwork />
              {/* <CursorTrail /> */}
              
              {/* Scanlines overlay */}
              <div className="scanlines"></div>

              {/* Navigation */}
              <Navigation />

              {/* Main Sections */}
              <main>
                <Hero />
                <About />
                <Experience />
                <Projects />
                <Skills />
                <Contact />
              </main>

              {/* Footer */}
              <Footer />

              {/* Dark Mode Toggle */}
              {/* <DarkModeToggle /> */}

              {/* Easter Egg */}
              <EasterEgg />
            </div>
          } />

          {/* Research Papers Page */}
          <Route path="/papers" element={<ResearchPapersPage />} />
        </Routes>
      )}
      
      {/* Vercel Speed Insights */}
      {!loading && <Insights />}
    </Router>
  );
}


export default App;
