import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FileText, Info } from 'lucide-react';
import PaperChat from './PaperChat';

const Papers = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [selectedPaper, setSelectedPaper] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const papers = [
    {
      id: 1,
      name: 'neural_architecture_search.pdf',
      title: 'Automated Neural Architecture Search for Image Classification',
      authors: 'Utkarsh Yadav, et al.',
      venue: 'International Conference on Machine Learning (ICML) 2024',
      description: 'A novel approach to automated neural architecture search using reinforcement learning and evolutionary algorithms for optimal image classification performance',
      abstract: 'This paper presents a comprehensive framework for automated neural architecture search (NAS) that combines reinforcement learning with evolutionary algorithms. Our method achieves state-of-the-art results on ImageNet classification while reducing computational costs by 40%. We demonstrate the effectiveness of our approach across multiple benchmark datasets and provide insights into the discovered architectures.',
      keyFindings: [
        '40% reduction in computational costs compared to baseline NAS methods',
        'State-of-the-art accuracy on ImageNet (96.2% top-1 accuracy)',
        'Novel hybrid search strategy combining RL and evolutionary algorithms',
        'Discovered architectures show excellent transfer learning capabilities'
      ],
      tech: ['PyTorch', 'Reinforcement Learning', 'Evolutionary Algorithms', 'Computer Vision', 'NAS'],
      citations: 145,
      year: 2024,
      color: 'electric'
    },
    {
      id: 2,
      name: 'efficient_transformers.pdf',
      title: 'Efficient Transformers: Memory-Optimized Attention Mechanisms',
      authors: 'Utkarsh Yadav, J. Smith',
      venue: 'Neural Information Processing Systems (NeurIPS) 2023',
      description: 'Memory-efficient attention mechanisms for transformers enabling 10x larger batch sizes while maintaining performance on long-sequence tasks',
      abstract: 'Traditional transformer models face significant memory constraints when processing long sequences. We introduce a memory-efficient attention mechanism that reduces memory consumption by 90% while preserving model performance. Our approach enables processing sequences up to 32K tokens on standard GPUs, making transformers more accessible for resource-constrained environments.',
      keyFindings: [
        '90% reduction in memory consumption during training',
        'Support for sequences up to 32K tokens on single GPU',
        'No degradation in model performance across multiple benchmarks',
        'Applicable to both encoder and decoder transformer architectures'
      ],
      tech: ['Transformers', 'Attention Mechanisms', 'NLP', 'Deep Learning', 'PyTorch'],
      citations: 203,
      year: 2023,
      color: 'neon-purple'
    },
    {
      id: 3,
      name: 'federated_learning_privacy.pdf',
      title: 'Privacy-Preserving Federated Learning with Differential Privacy',
      authors: 'Utkarsh Yadav, M. Johnson, A. Chen',
      venue: 'IEEE Symposium on Security and Privacy 2024',
      description: 'A framework for federated learning that ensures differential privacy guarantees while maintaining model accuracy across distributed edge devices',
      abstract: 'We present a comprehensive framework for privacy-preserving federated learning that integrates differential privacy mechanisms at both local and global aggregation stages. Our approach achieves provable privacy guarantees while maintaining competitive model performance. Extensive experiments on healthcare and financial datasets demonstrate the practical applicability of our method.',
      keyFindings: [
        'Provable (ε, δ)-differential privacy guarantees across all training stages',
        'Less than 2% accuracy drop compared to centralized training',
        'Robust to gradient inversion and membership inference attacks',
        'Successfully deployed in real-world healthcare applications'
      ],
      tech: ['Federated Learning', 'Differential Privacy', 'Distributed Systems', 'Security', 'TensorFlow'],
      citations: 178,
      year: 2024,
      color: 'neon'
    },
    {
      id: 4,
      name: 'multimodal_fusion.pdf',
      title: 'Cross-Modal Fusion for Enhanced Medical Diagnosis',
      authors: 'Utkarsh Yadav, R. Patel',
      venue: 'Medical Image Computing and Computer Assisted Intervention (MICCAI) 2023',
      description: 'Advanced multimodal fusion techniques combining medical images, patient records, and genomic data for improved diagnostic accuracy',
      abstract: 'This work introduces a novel multimodal fusion architecture that integrates medical imaging, electronic health records, and genomic data for comprehensive disease diagnosis. Our attention-based fusion mechanism learns optimal combinations of modalities, achieving 94% diagnostic accuracy on a cohort of 50,000 patients across multiple disease categories.',
      keyFindings: [
        '94% diagnostic accuracy across multiple disease categories',
        'Attention-based fusion outperforms traditional concatenation by 12%',
        'Successfully handles missing modalities with adaptive weighting',
        'Interpretable attention maps for clinical decision support'
      ],
      tech: ['Multimodal Learning', 'Medical AI', 'Computer Vision', 'NLP', 'PyTorch'],
      citations: 167,
      year: 2023,
      color: 'electric'
    },
    {
      id: 5,
      name: 'continual_learning.pdf',
      title: 'Continual Learning without Catastrophic Forgetting',
      authors: 'Utkarsh Yadav, L. Wang, S. Kumar',
      venue: 'International Conference on Learning Representations (ICLR) 2024',
      description: 'A novel approach to continual learning that eliminates catastrophic forgetting through dynamic network expansion and knowledge distillation',
      abstract: 'We propose a continual learning framework that dynamically expands network capacity while preserving previously learned knowledge through knowledge distillation. Our method achieves zero forgetting on sequential task benchmarks while maintaining constant inference time. This work bridges the gap between continual learning and practical deployment scenarios.',
      keyFindings: [
        'Zero catastrophic forgetting across 20+ sequential tasks',
        'Constant inference time regardless of number of tasks learned',
        '15% higher accuracy compared to state-of-the-art methods',
        'Applicable to both supervised and reinforcement learning settings'
      ],
      tech: ['Continual Learning', 'Knowledge Distillation', 'Neural Networks', 'Deep Learning'],
      citations: 89,
      year: 2024,
      color: 'neon-purple'
    },
    {
      id: 6,
      name: 'graph_neural_networks.pdf',
      title: 'Scalable Graph Neural Networks for Drug Discovery',
      authors: 'Utkarsh Yadav, T. Lee',
      venue: 'Nature Machine Intelligence 2023',
      description: 'Scalable GNN architecture for molecular property prediction and drug-target interaction modeling in pharmaceutical research',
      abstract: 'This paper presents a scalable graph neural network architecture specifically designed for drug discovery applications. Our model efficiently processes molecular graphs with millions of atoms, predicting drug-target interactions and molecular properties with high accuracy. Validation on multiple pharmaceutical datasets shows superior performance compared to traditional cheminformatics approaches.',
      keyFindings: [
        '92% accuracy in drug-target interaction prediction',
        'Scales to molecular graphs with 1M+ atoms',
        'Discovered 3 novel drug candidates validated in wet-lab experiments',
        'Interpretable attention mechanism highlights key molecular substructures'
      ],
      tech: ['Graph Neural Networks', 'Drug Discovery', 'Molecular Modeling', 'PyTorch Geometric'],
      citations: 234,
      year: 2023,
      color: 'neon'
    }
  ];

  const handleMoreInfo = (paper) => {
    if (!paper) return;
    setSelectedPaper(paper);
    setIsChatOpen(true);
  };

  return (
    <>
      <section id="papers" className="relative py-20 px-4 bg-white">
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
                Research Papers
              </h2>
              <p className="text-charcoal-800 font-mono text-sm">
                <span className="syntax-comment">// Published research in machine learning and AI</span>
              </p>
            </div>

            {/* Papers List - Two Columns */}
            <div className="grid lg:grid-cols-2 gap-x-12 gap-y-12">
              {papers.map((paper, index) => (
                <motion.div
                  key={paper.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group border-l-2 border-charcoal-800/20 hover:border-electric transition-colors pl-6 py-4"
                >
                  {/* Paper Number and Title */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-grow">
                      <div className="flex items-baseline gap-3 mb-2">
                        <span className="text-electric font-mono text-sm font-bold">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <h3 className="text-xl lg:text-2xl font-bold text-charcoal-900 font-mono group-hover:text-electric transition-colors">
                          {paper.title}
                        </h3>
                      </div>
                      <div className="space-y-1 mb-3">
                        <p className="text-xs text-neon-purple font-mono">
                          • {paper.authors}
                        </p>
                        <p className="text-xs text-charcoal-800 font-mono">
                          • {paper.venue}
                        </p>
                        <p className="text-xs text-charcoal-800 font-mono">
                          • Citations: {paper.citations} | Year: {paper.year}
                        </p>
                      </div>
                      <p className="text-sm text-charcoal-800 font-mono mb-4">
                        {paper.description}
                      </p>
                    </div>
                  </div>

                  {/* Key Findings */}
                  {paper.keyFindings && (
                    <div className="mb-4">
                      <p className="text-xs font-mono text-electric mb-2">Key Findings:</p>
                      <ul className="space-y-1">
                        {paper.keyFindings.slice(0, 3).map((finding, i) => (
                          <li key={i} className="text-xs font-mono text-charcoal-800 pl-4 relative before:content-['-'] before:absolute before:left-0 before:text-electric">
                            {finding}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Tech Stack - Inline */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {paper.tech && paper.tech.map((tech, i) => (
                      <span
                        key={i}
                        className="text-xs font-mono text-charcoal-800 px-3 py-1 border border-charcoal-800/30 rounded-full hover:border-electric hover:text-electric transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* More Info Button */}
                  <div className="flex gap-4 font-mono text-sm">
                    <motion.button
                      onClick={() => handleMoreInfo(paper)}
                      whileHover={{ x: 3 }}
                      className="flex items-center gap-2 text-charcoal-800 hover:text-electric transition-colors"
                      aria-label="More information"
                    >
                      <Info className="w-4 h-4" />
                      <span>More Info</span>
                    </motion.button>
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
              <p className="text-charcoal-800 text-sm">
                <span className="syntax-comment">// More publications coming soon...</span>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Paper Chat Modal */}
      <PaperChat 
        isOpen={isChatOpen}
        onClose={() => {
          setIsChatOpen(false);
          setSelectedPaper(null);
        }}
        paper={selectedPaper}
      />
    </>
  );
};

export default Papers;
