import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Github } from 'lucide-react';

const Projects = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const projects = [
    {
      name: 'symptom_disease_prediction.py',
      title: 'Symptom-to-Disease Prediction System',
      role: 'Gen AI Developer',
      description: 'Hybrid AI architecture integrating traditional ML with LLM reasoning to analyze symptoms and generate disease predictions with explanatory context',
      achievements: [
        'Fine-tuned 3B parameter open-source language model for medical domain',
        'Achieved 50% accuracy improvement (60% to 90%) through systematic dataset curation and hyperparameter tuning',
        'Created custom training dataset through data augmentation and medical literature extraction',
        'Implemented contextual reasoning generating personalized precautions and treatment suggestions'
      ],
      tech: ['Python', 'PyTorch', 'HuggingFace', 'Transfer Learning', 'Gen AI', 'NLP'],
      demo: '#',
      github: '#',
      color: 'electric'
    },
    {
      name: 'trend_intelligence.py',
      title: 'AI-Powered Trend Intelligence Platform',
      role: 'Agentic AI Developer',
      description: 'Automated web scraping and NLP system identifying trending topics 24-48 hours before mainstream adoption',
      achievements: [
        'Architected automated web scraping system processing 10,000+ daily data points from social media and news sources',
        'Implemented transformer-based topic categorization with 85% accuracy across multiple domains',
        'Developed time-series forecasting model analyzing engagement metrics and growth patterns',
        'Created dynamic dashboard displaying trend trajectories and prediction confidence scores'
      ],
      tech: ['Python', 'Transformers', 'Web Scraping', 'Time-Series', 'NLP', 'Data Visualization'],
      demo: '#',
      github: '#',
      color: 'neon-purple'
    },
    {
      name: 'research_paper_rag.py',
      title: 'Self-Hosted Research Paper Query System',
      role: 'NLP Developer',
      description: 'Built conversational AI system enabling natural language querying across research paper collection with complete data privacy',
      achievements: [
        'Engineered custom embedding pipeline transforming research papers into vector representations',
        'Implemented retrieval-augmented generation (RAG) architecture with section-level citations',
        'Deployed entirely on local infrastructure without external API dependencies',
        'Integrated chatbot interface reducing research paper navigation time by 80%'
      ],
      tech: ['Python', 'LangChain', 'Vector DB', 'Open-source LLM', 'RAG', 'NLP'],
      demo: '#',
      github: '#',
      color: 'neon'
    }
  ];

  return (
    <section id="projects" className="relative py-20 px-4 bg-white">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          {/* Section Header */}
          <div className="font-mono mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-charcoal-900 mb-4">
              <span className="syntax-comment">// </span>
              Selected Projects
            </h2>
            <p className="text-charcoal-800 font-mono text-sm">
              <span className="syntax-comment">// Building intelligent systems that solve real problems</span>
            </p>
          </div>

          {/* Projects List - Two Columns */}
          <div className="grid lg:grid-cols-2 gap-x-12 gap-y-12">
            {projects.map((project, index) => (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group border-l-2 border-charcoal-800/20 hover:border-electric transition-colors pl-6 py-4"
              >
                {/* Project Number and Title */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-grow">
                    <div className="flex items-baseline gap-3 mb-2">
                      <span className="text-electric font-mono text-sm font-bold">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <h3 className="text-xl lg:text-2xl font-bold text-charcoal-900 font-mono group-hover:text-electric transition-colors">
                        {project.title}
                      </h3>
                    </div>
                    {project.role && (
                      <p className="text-xs text-neon-purple font-mono mb-2">
                        • Role: {project.role}
                      </p>
                    )}
                    <p className="text-sm text-charcoal-800 font-mono mb-4">
                      {project.description}
                    </p>
                  </div>
                </div>

                {/* Achievements */}
                {project.achievements && (
                  <div className="mb-4">
                    <p className="text-xs font-mono text-electric mb-2">Achievements:</p>
                    <ul className="space-y-1">
                      {project.achievements.map((achievement, i) => (
                        <li key={i} className="text-xs font-mono text-charcoal-800 pl-4 relative before:content-['-'] before:absolute before:left-0 before:text-electric">
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Tech Stack - Inline */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="text-xs font-mono text-charcoal-800 px-3 py-1 border border-charcoal-800/30 rounded-full hover:border-electric hover:text-electric transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-4 font-mono text-sm">
                  <motion.a
                    href={project.github}
                    whileHover={{ x: 3 }}
                    className="flex items-center gap-2 text-charcoal-800 hover:text-electric transition-colors"
                    aria-label="View source code"
                  >
                    <Github className="w-4 h-4" />
                    <span>View Code</span>
                  </motion.a>
                  <motion.a
                    href={project.demo}
                    whileHover={{ x: 3 }}
                    className="flex items-center gap-2 text-charcoal-800 hover:text-neon-purple transition-colors"
                    aria-label="Open project"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Live Demo</span>
                  </motion.a>
                </div>
              </motion.div>
            ))}
          </div>

          {/* View More */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.8 }}
            className="text-center pt-12 font-mono"
          >
            <motion.a
              href="https://github.com/Rytnix"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ x: 5 }}
              className="inline-flex items-center gap-2 text-charcoal-800 hover:text-electric transition-colors text-sm"
            >
              <span>View all projects on GitHub</span>
              <Github className="w-4 h-4" />
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
