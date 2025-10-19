import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code2 } from 'lucide-react';

const Skills = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const skillSections = [
    {
      title: 'AI_&_ML',
      skills: ['Deep Learning', 'Neural Networks', 'Computer Vision', 'NLP', 'Reinforcement Learning', 'Transfer Learning']
    },
    {
      title: 'ML_Frameworks',
      skills: ['PyTorch', 'TensorFlow', 'Keras', 'Scikit-learn', 'HuggingFace', 'ONNX']
    },
    {
      title: 'Gen_AI',
      skills: ['LangChain', 'OpenAI API', 'Prompt Engineering', 'RAG Systems', 'Fine-tuning', 'Vector DBs']
    },
    {
      title: 'Languages',
      skills: ['Python', 'Java', 'SQL', 'C++', 'Bash']
    },
    {
      title: 'Backend',
      skills: ['Spring Boot', 'FastAPI', 'Flask', 'REST APIs', 'Microservices', 'JPA/Hibernate']
    },
    {
      title: 'Data_&_Ops',
      skills: ['Docker', 'Kubernetes', 'AWS', 'PostgreSQL', 'MongoDB', 'Git']
    }
  ];

  return (
    <section id="skills" className="relative py-20 px-4">
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
              <Code2 className="w-4 h-4" />
              {'>'} cat skills.txt
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-charcoal-900 mb-4">
              <span className="syntax-comment">// </span>
              Skills & Expertise
            </h2>
          </div>

          {/* Skills Grid - Minimalistic Typography */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {skillSections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="space-y-4"
              >
                {/* Category Title */}
                <div className="relative">
                  <h3 className="text-xl font-bold font-mono text-electric mb-1 uppercase tracking-wider">
                    {section.title}
                  </h3>
                  <div className="h-px bg-gradient-to-r from-electric to-transparent"></div>
                </div>

                {/* Skills List */}
                <ul className="space-y-2 font-mono text-sm">
                  {section.skills.map((skill, skillIndex) => (
                    <motion.li
                      key={skill}
                      initial={{ opacity: 0, x: -10 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.3, delay: index * 0.1 + skillIndex * 0.05 }}
                      className="text-charcoal-800 hover:text-electric transition-colors cursor-default flex items-start gap-2"
                    >
                      <span className="text-neon mt-1">▸</span>
                      <span>{skill}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Simple text footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="pt-12 text-center font-mono"
          >
            <p className="text-charcoal-800 text-sm">
              <span className="syntax-comment">
                // Constantly learning, experimenting, and building with cutting-edge AI technologies
              </span>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
