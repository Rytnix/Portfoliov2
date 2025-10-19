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
      name: 'ai_chatbot_rag.py',
      title: 'RAG-Powered AI Chatbot',
      role: 'Primary Developer & Architect',
      description: 'Production-ready chatbot using Retrieval Augmented Generation for accurate, context-aware responses',
      achievements: [
        'Seamless integration of LangChain for interactive chat functionality',
        'Implemented vector databases (Pinecone/Weaviate) for efficient retrieval and storage',
        'Fine-tuned and deployed as production-ready application using FastAPI',
        'Built multi-document ingestion pipeline for diverse data sources'
      ],
      tech: ['Python', 'LangChain', 'Pinecone/Weaviate', 'PyTorch', 'FastAPI', 'Docker'],
      demo: '#',
      github: '#',
      color: 'electric'
    },
    {
      name: 'sentiment_analyzer.py',
      title: 'Real-time Sentiment Analysis',
      role: 'ML Engineer & Developer',
      description: 'Fine-tuned BERT model for multi-class sentiment analysis with 95%+ accuracy',
      achievements: [
        'Fine-tuned DistilBERT achieving 95%+ accuracy on custom dataset',
        'Built real-time inference API with low-latency responses',
        'Created interactive dashboard with real-time visualizations',
        'Implemented batch processing for handling large-scale datasets'
      ],
      tech: ['PyTorch', 'Transformers', 'DistilBERT', 'Flask', 'React', 'MongoDB'],
      demo: '#',
      github: '#',
      color: 'neon-purple'
    },
    {
      name: 'image_classifier.py',
      title: 'Computer Vision Classifier',
      role: 'AI Developer',
      description: 'Transfer learning-based image classification system for custom object detection',
      achievements: [
        'Implemented transfer learning with EfficientNet architecture and custom head',
        'Developed comprehensive data augmentation pipeline',
        'Applied model quantization for efficient edge deployment',
        'Built REST API with automated image preprocessing'
      ],
      tech: ['TensorFlow', 'Keras', 'EfficientNet', 'OpenCV', 'FastAPI', 'AWS S3'],
      demo: '#',
      github: '#',
      color: 'neon'
    },
    {
      name: 'llm_finetuning.py',
      title: 'LLM Fine-tuning Framework',
      description: 'Efficient fine-tuning framework for LLMs using LoRA and QLoRA techniques',
      features: [
        'Parameter-efficient fine-tuning with LoRA',
        'Multi-GPU training support',
        'Automated hyperparameter tuning',
        'Model evaluation and comparison tools'
      ],
      tech: ['Python', 'PyTorch', 'HuggingFace', 'WandB', 'PEFT'],
      demo: '#',
      github: '#',
      color: 'electric'
    },
    {
      name: 'ml_pipeline.py',
      title: 'MLOps Pipeline',
      description: 'End-to-end ML pipeline with experiment tracking, model versioning, and automated deployment',
      features: [
        'MLflow for experiment tracking',
        'DVC for data versioning',
        'CI/CD with GitHub Actions',
        'Automated model monitoring and retraining'
      ],
      tech: ['Python', 'MLflow', 'DVC', 'Docker', 'Kubernetes'],
      demo: '#',
      github: '#',
      color: 'neon-purple'
    },
    {
      name: 'neural_style_transfer.py',
      title: 'Neural Style Transfer',
      description: 'Real-time artistic style transfer using convolutional neural networks',
      features: [
        'VGG19-based style transfer',
        'Real-time video processing',
        'Custom style training',
        'Interactive web interface'
      ],
      tech: ['PyTorch', 'OpenCV', 'Streamlit', 'NumPy'],
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
