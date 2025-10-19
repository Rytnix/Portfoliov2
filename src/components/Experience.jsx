import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { GitBranch, GitCommit, Calendar, Briefcase } from 'lucide-react';

const Experience = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const experiences = [
    {
      hash: 'a3f5c21',
      role: 'SDE1 - ML/Gen AI',
      company: 'Tech Company',
      period: '2023 - Present',
      description: 'Building and deploying production-ready ML models and Gen AI applications',
      achievements: [
        'Developed LLM-powered chatbot improving customer engagement by 40%',
        'Implemented RAG pipeline for document processing with 95% accuracy',
        'Optimized ML inference reducing latency by 60%',
        'Led team of 3 engineers in AI feature development'
      ],
      tech: ['Python', 'TensorFlow', 'LangChain', 'AWS', 'Docker']
    },
    {
      hash: 'b7e2d89',
      role: 'ML Engineer Intern',
      company: 'AI Startup',
      period: '2022 - 2023',
      description: 'Developed computer vision and NLP solutions for various client projects',
      achievements: [
        'Built image classification model with 92% accuracy',
        'Implemented sentiment analysis system for social media data',
        'Created data pipeline processing 1M+ records daily',
        'Contributed to open-source ML libraries'
      ],
      tech: ['PyTorch', 'OpenCV', 'FastAPI', 'PostgreSQL']
    },
    {
      hash: 'c9a1f44',
      role: 'Research Assistant',
      company: 'University AI Lab',
      period: '2021 - 2022',
      description: 'Conducted research in deep learning and neural architecture search',
      achievements: [
        'Published paper on efficient neural architecture search',
        'Experimented with novel attention mechanisms',
        'Developed custom PyTorch implementations',
        'Mentored junior researchers'
      ],
      tech: ['PyTorch', 'NumPy', 'Pandas', 'Jupyter']
    }
  ];

  return (
    <section id="experience" className="relative py-20 px-4">
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
            <div className="text-electric text-sm mb-2 flex items-center gap-2">
              <GitBranch className="w-4 h-4" />
              {'>'} git log --author="Utkarsh" --oneline
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-charcoal-900 mb-4">
              <span className="syntax-comment">// </span>
              Experience
            </h2>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-0 lg:left-1/2 transform lg:-translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-electric via-neon-purple to-neon"></div>

            {/* Experience items */}
            <div className="space-y-12">
              {experiences.map((exp, index) => (
                <motion.div
                  key={exp.hash}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className={`relative lg:w-1/2 ${index % 2 === 0 ? 'lg:pr-12' : 'lg:pl-12 lg:ml-auto'}`}
                >
                  {/* Commit dot */}
                  <div className={`absolute top-6 ${index % 2 === 0 ? 'lg:right-0' : 'lg:left-0'} left-0 lg:transform lg:-translate-x-1/2`}>
                    <GitCommit className="w-6 h-6 text-electric bg-cream-100 rounded-full" />
                  </div>

                  {/* Card */}
                  <div className="terminal-window ml-8 lg:ml-0 hover:shadow-glow-blue transition-all duration-300">
                    <div className="terminal-header">
                      <div className="terminal-button red"></div>
                      <div className="terminal-button yellow"></div>
                      <div className="terminal-button green"></div>
                      <span className="text-cream-100 text-xs ml-2">commit_{exp.hash}</span>
                    </div>
                    <div className="p-6 space-y-4">
                      {/* Header */}
                      <div>
                        <div className="flex items-center gap-2 text-electric font-mono text-sm mb-1">
                          <Briefcase className="w-4 h-4" />
                          <span className="syntax-string">{exp.hash}</span>
                        </div>
                        <h3 className="text-2xl font-bold text-charcoal-900 mb-2">{exp.role}</h3>
                        <div className="flex items-center gap-4 text-sm text-charcoal-800 font-mono">
                          <span className="font-semibold">{exp.company}</span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {exp.period}
                          </span>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-charcoal-800 font-mono text-sm">
                        <span className="syntax-comment">// </span>
                        {exp.description}
                      </p>

                      {/* Achievements */}
                      <div className="space-y-2">
                        <div className="text-xs font-mono text-electric">
                          {'>'} git diff --stat
                        </div>
                        <ul className="space-y-1 text-sm font-mono text-charcoal-800">
                          {exp.achievements.map((achievement, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-neon">+</span>
                              <span>{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Tech stack */}
                      <div className="flex flex-wrap gap-2 pt-2">
                        {exp.tech.map((tech, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 bg-cream-200 border border-charcoal-800 rounded text-xs font-mono"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
