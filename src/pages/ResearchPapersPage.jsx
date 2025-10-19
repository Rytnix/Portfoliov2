import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import Papers from '../components/Papers';
import MatrixRain from '../components/MatrixRain';
import NeuralNetwork from '../components/NeuralNetwork';

const ResearchPapersPage = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Background Effects */}
      <MatrixRain />
      <NeuralNetwork />
      
      {/* Scanlines overlay */}
      <div className="scanlines"></div>

      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main className="pt-20">
        <Papers />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ResearchPapersPage;
