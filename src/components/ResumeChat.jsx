import { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, FileText, MessageSquare, Sparkles, Download, ZoomIn, ZoomOut } from 'lucide-react';
import { Document, Page, pdfjs } from 'react-pdf';

// Set up PDF.js worker using local file
pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';

const ResumeChat = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hi! I\'m Cyron, Utkarsh\'s AI resume assistant. I can help you learn about his skills, experience, projects, education, and contact information. What would you like to know?'
    }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);
  const [genAiEndpoint] = useState('https://45.194.47.156:11434');
  const [ollamaModel] = useState('mistral-nemo:latest');
  
  // PDF viewer state
  const [numPages, setNumPages] = useState(null);
  const [scale, setScale] = useState(1.1);
  const [pdfError, setPdfError] = useState(false);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setPdfError(false);
  };

  const onDocumentLoadError = (error) => {
    console.error('Error loading PDF:', error);
    setPdfError(true);
  };

  const zoomIn = () => {
    setScale(prevScale => Math.min(prevScale + 0.2, 2.0));
  };

  const zoomOut = () => {
    setScale(prevScale => Math.max(prevScale - 0.2, 0.6));
  };

  const downloadPDF = () => {
    const link = document.createElement('a');
    link.href = '/UtkarshML.pdf';
    link.download = 'Utkarsh_Yadav_Resume.pdf';
    link.click();
  };

  // Memoize PDF options to prevent unnecessary reloads
  const pdfOptions = useMemo(() => ({
    cMapUrl: `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjs.version}/cmaps/`,
    cMapPacked: true,
  }), []);

  // Predefined responses for common questions
  const predefinedResponses = {
    skills: "Utkarsh is proficient in:\n\n**Programming Languages**: Python, Java, C++, SQL, Bash\n\n**Frameworks & Libraries**: OpenCV, Scikit-learn, NLTK, SpaCy, TensorFlow, Keras, Flask, Springboot\n\n**Tools & Technologies**: Kubernetes, Docker, Git, PostgreSQL, MySQL, SQLite, LAMP Stack, N8N\n\n**Cloud Platforms**: AWS, Google Cloud Platform, IBM Cloud\n\n**Operating Systems**: Linux, Raspberry Pi, NVIDIA Jetson Nano",
    
    experience: "**Proeffico Solutions Private Limited - Noida, India**\n\n**Software Development Engineer - ML & Gen AI** (March 2024 - Present)\n• Redesigned facial recognition pipeline reducing latency from 40+ seconds to under 1 second\n• Engineered Redis-based vector storage retrieving embeddings from 100K+ database in <200ms\n• Built production-grade REST APIs handling 1000+ daily requests with 99.5% uptime\n• Architected Gen AI document generator achieving 70% accuracy on technical specifications\n• Led cross-functional team of 5 engineers on Gen AI-powered solutions\n\n**Software Engineer Intern** (September 2023 - March 2024)\n• Built backend for Edhanam mutual fund platform serving Striment Technologies\n• Reduced API response times by 80% (from 3-4 seconds to under 800ms)\n• Implemented multi-layer caching mechanism with Redis and database indexing\n• Integrated StarMF APIs for fund discovery, NAV updates, and transaction processing",
    
    projects: "Here are Utkarsh's notable projects:\n\n**1. Symptom-to-Disease Prediction System** (Gen AI, 2025)\n• Tech Stack: Python, PyTorch, HuggingFace, Transfer Learning, Gen AI\n• Achievements:\n  - Hybrid AI architecture integrating ML with LLM reasoning for disease prediction\n  - Fine-tuned 3B parameter model for medical domain\n  - Achieved 50% accuracy improvement (60% to 90%)\n  - Created custom training dataset from medical literature\n  - Implemented personalized precautions and treatment suggestions\n\n**2. AI-Powered Trend Intelligence Platform** (Agentic AI, 2025)\n• Tech Stack: Python, Transformers, Web Scraping, Time-Series, NLP\n• Achievements:\n  - Automated web scraping processing 10,000+ daily data points\n  - Transformer-based topic categorization with 85% accuracy\n  - Time-series forecasting identifying trends 24-48 hours before mainstream\n  - Created dynamic dashboard with trend trajectories\n\n**3. Self-Hosted Research Paper Query System** (NLP, 2024)\n• Tech Stack: Python, LangChain, Vector DB, Open-source LLM, RAG\n• Achievements:\n  - Conversational AI for natural language querying of research papers\n  - Custom embedding pipeline with vector representations\n  - RAG architecture with section-level citations\n  - Local infrastructure without external API dependencies\n  - Reduced navigation time by 80%",
    
    education: "**IIMT Engineering College, Meerut, India**\nBachelor of Technology in Computer Science Engineering\nGPA: 8.57/10.0\nJuly 2019 - June 2023",
    
    contact: "You can reach out to Utkarsh through:\n\nGitHub: Check out his projects and contributions\nLinkedIn: Connect professionally\nEmail: Send him a message\n\nNavigate to the Contact section below for more details!",
    
    about: "Utkarsh Yadav is a passionate ML/Gen AI Engineer who specializes in:\n\nBuilding intelligent systems that solve real problems\nTransforming ideas into production-ready AI solutions\nExploring cutting-edge AI technologies\nCreating end-to-end machine learning pipelines\n\nAvailability:\n✅ Available for Full-Time roles\n✅ Available for Freelance projects\n\nHe's constantly learning, experimenting, and building with the latest AI technologies.",
  };

  // Suggested questions
  const suggestedQuestions = [
    "What are Utkarsh's skills?",
    "Tell me about his experience",
    "What projects has he built?",
    "How can I contact him?",
    "What technologies does he use?",
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const parseMarkdown = (text) => {
    if (!text) return '';
    
    let parsed = text;
    
    // Convert **text** to bold
    parsed = parsed.replace(/\*\*([^*]+)\*\*/g, '<strong class="font-bold">$1</strong>');
    
    // Convert *text* to italic (only if not part of **)
    parsed = parsed.replace(/(?<!\*)\*([^*]+)\*(?!\*)/g, '<em class="italic">$1</em>');
    
    // Convert `code` to inline code
    parsed = parsed.replace(/`([^`]+)`/g, '<code class="bg-gray-200 px-1 rounded text-xs">$1</code>');
    
    // Convert bullet points (- item or • item)
    parsed = parsed.replace(/^[-•]\s(.+)$/gm, '<span class="flex gap-2"><span class="text-electric">•</span><span>$1</span></span>');
    
    return parsed;
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const isResumeRelated = (query) => {
    const lowerQuery = query.toLowerCase();
    const resumeKeywords = [
      'skill', 'experience', 'project', 'work', 'job', 'education', 'degree',
      'contact', 'email', 'phone', 'linkedin', 'github', 'portfolio',
      'technology', 'tech', 'programming', 'language', 'framework', 'tool',
      'achievement', 'qualification', 'certificate', 'training',
      'utkarsh', 'yadav', 'developer', 'engineer', 'ml', 'ai', 'machine learning',
      'deep learning', 'python', 'java', 'about', 'who', 'what', 'tell me',
      'built', 'created', 'developed', 'worked', 'proficient',
      'available', 'availability', 'hire', 'hiring', 'freelance', 'full-time', 'full time'
    ];
    
    return resumeKeywords.some(keyword => lowerQuery.includes(keyword));
  };

  const findBestMatch = (query) => {
    const lowerQuery = query.toLowerCase();
    
    // Check if question is resume-related
    if (!isResumeRelated(query)) {
      return "I can only answer questions about Utkarsh's professional profile, skills, experience, and projects. Please ask something related to his resume.";
    }
    
    if (lowerQuery.includes('skill') || lowerQuery.includes('technology') || lowerQuery.includes('tech stack')) {
      return predefinedResponses.skills;
    }
    if (lowerQuery.includes('experience') || lowerQuery.includes('work') || lowerQuery.includes('job')) {
      return predefinedResponses.experience;
    }
    if (lowerQuery.includes('project') || lowerQuery.includes('portfolio') || lowerQuery.includes('built')) {
      return predefinedResponses.projects;
    }
    if (lowerQuery.includes('education') || lowerQuery.includes('degree') || lowerQuery.includes('study')) {
      return predefinedResponses.education;
    }
    if (lowerQuery.includes('contact') || lowerQuery.includes('reach') || lowerQuery.includes('email')) {
      return predefinedResponses.contact;
    }
    if (lowerQuery.includes('about') || lowerQuery.includes('who is') || lowerQuery.includes('tell me')) {
      return predefinedResponses.about;
    }
    if (lowerQuery.includes('available') || lowerQuery.includes('availability') || lowerQuery.includes('hire') || lowerQuery.includes('hiring') || lowerQuery.includes('freelance') || lowerQuery.includes('full-time') || lowerQuery.includes('full time')) {
      return "Utkarsh is currently available for:\n\n✅ Full-Time Roles - Open to exciting full-time opportunities in ML/AI Engineering\n✅ Freelance Projects - Available for consulting and project-based work\n\nHe's actively looking for opportunities to work on challenging AI/ML problems and build innovative solutions. Feel free to reach out through the Contact section!";
    }
    
    return "I can help you learn about Utkarsh's skills, experience, projects, and how to contact him. Try asking:\n\n" + 
           suggestedQuestions.map(q => `• ${q}`).join('\n');
  };

  const simulateStreaming = async (text) => {
    const words = text.split(' ');
    let currentText = '';
    
    for (let i = 0; i < words.length; i++) {
      currentText += words[i] + ' ';
      setMessages(prev => {
        const newMessages = [...prev];
        if (newMessages[newMessages.length - 1].role === 'assistant' && newMessages[newMessages.length - 1].streaming) {
          newMessages[newMessages.length - 1].content = currentText.trim();
        }
        return newMessages;
      });
      await new Promise(resolve => setTimeout(resolve, 40));
    }
    
    setMessages(prev => {
      const newMessages = [...prev];
      if (newMessages[newMessages.length - 1].streaming) {
        delete newMessages[newMessages.length - 1].streaming;
      }
      return newMessages;
    });
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput('');

    // Add placeholder for streaming response
    setMessages(prev => [...prev, { role: 'assistant', content: '', streaming: true }]);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Get response
    let response;
    if (genAiEndpoint) {
      try {
        // Check if question is resume-related first
        if (!isResumeRelated(currentInput)) {
          response = "I can only answer questions about Utkarsh's professional profile, skills, experience, projects, and contact information. Please ask something related to his professional background.";
          await simulateStreaming(response);
          return;
        }

        // Prepare system prompt with strict instructions
        const systemPrompt = `You are Cyron, a STRICT resume assistant for Utkarsh Yadav. You MUST ONLY answer questions about his professional profile.

IMPORTANT RULES:
- ONLY answer questions about Utkarsh's skills, experience, projects, education, contact, or availability
- If asked about ANY unrelated topic, politely redirect: "I can only answer questions about Utkarsh's professional profile."
- Do NOT mention specific topics you cannot discuss (like politics, news, etc.) - just redirect to professional topics
- Do NOT provide information outside the resume context below
- Keep responses concise and professional

RESUME INFORMATION:

Name: Utkarsh Yadav
Contact: +91-7007663578 | utkarshxp19@gmail.com | karsh.dev | github.com/Rytnix

Education:
IIMT Engineering College, Meerut, India
Bachelor of Technology in Computer Science Engineering
GPA: 8.57/10.0 (July 2019 - June 2023)

Skills:
- Programming Languages: Python, Java, C++, SQL, Bash
- Frameworks & Libraries: OpenCV, Scikit-learn, NLTK, SpaCy, TensorFlow, Keras, Flask, Springboot
- Tools & Technologies: Kubernetes, Docker, Git, PostgreSQL, MySQL, SQLite, LAMP Stack, N8N
- Cloud Platforms: AWS, Google Cloud Platform, IBM Cloud
- Operating Systems: Linux, Raspberry Pi, NVIDIA Jetson Nano

Professional Experience:

1. Proeffico Solutions Private Limited, Noida (March 2024 - Present)
   Software Development Engineer - ML & Gen AI
   - Redesigned facial recognition pipeline reducing latency from 40+ seconds to under 1 second
   - Engineered Redis-based vector storage retrieving embeddings from 100K+ database in <200ms
   - Built production-grade REST APIs handling 1000+ daily requests with 99.5% uptime
   - Architected Gen AI document generator achieving 70% accuracy on technical specifications
   - Led cross-functional team of 5 engineers on Gen AI-powered solutions

2. Proeffico Solutions Private Limited, Noida (September 2023 - March 2024)
   Software Engineer Intern
   - Built backend for Edhanam mutual fund platform serving Striment Technologies
   - Reduced API response times by 80% (from 3-4 seconds to under 800ms)
   - Implemented multi-layer caching with Redis and database indexing
   - Integrated StarMF APIs for fund discovery and transaction processing

Projects:

1. Symptom-to-Disease Prediction System (Gen AI, 2025)
   Tech Stack: Python, PyTorch, HuggingFace, Transfer Learning
   - Hybrid AI architecture integrating ML with LLM reasoning
   - Fine-tuned 3B parameter model for medical domain
   - Achieved 50% accuracy improvement (60% to 90%)
   - Created custom training dataset from medical literature
   - Implemented personalized precautions and treatment suggestions

2. AI-Powered Trend Intelligence Platform (Agentic AI, 2025)
   Tech Stack: Python, Transformers, Web Scraping, Time-Series, NLP
   - Automated web scraping processing 10,000+ daily data points
   - Transformer-based topic categorization with 85% accuracy
   - Time-series forecasting identifying trends 24-48 hours before mainstream
   - Created dynamic dashboard with trend trajectories

3. Self-Hosted Research Paper Query System (NLP, 2024)
   Tech Stack: Python, LangChain, Vector DB, Open-source LLM, RAG
   - Built conversational AI for natural language querying of research papers
   - Engineered custom embedding pipeline with vector representations
   - Implemented RAG architecture with section-level citations
   - Deployed on local infrastructure without external APIs
   - Reduced navigation time by 80%

Remember: Stay strictly within Utkarsh's professional context. If asked unrelated questions, politely redirect without listing what you cannot discuss.`;

        // Call Ollama API endpoint with streaming (using /api/chat for proper message format)
        const ollamaUrl = genAiEndpoint.endsWith('/api/chat') 
          ? genAiEndpoint 
          : `${genAiEndpoint.replace(/\/$/, '')}/api/chat`;
        
        const res = await fetch(ollamaUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: ollamaModel,
            messages: [
              {
                role: 'system',
                content: systemPrompt
              },
              {
                role: 'user',
                content: currentInput
              }
            ],
            stream: true
          })
        });
        
        if (res.ok) {
          const reader = res.body.getReader();
          const decoder = new TextDecoder();
          let fullResponse = '';

          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value);
            const lines = chunk.split('\n').filter(line => line.trim());

            for (const line of lines) {
              try {
                const json = JSON.parse(line);
                // Handle both /api/chat (message.content) and /api/generate (response) formats
                const content = json.message?.content || json.response;
                if (content) {
                  fullResponse += content;
                  
                  // Update message in real-time
                  setMessages(prev => {
                    const newMessages = [...prev];
                    if (newMessages[newMessages.length - 1].streaming) {
                      newMessages[newMessages.length - 1].content = fullResponse;
                    }
                    return newMessages;
                  });
                }
              } catch (e) {
                // Skip invalid JSON lines
              }
            }
          }

          // Mark streaming as complete
          setMessages(prev => {
            const newMessages = [...prev];
            if (newMessages[newMessages.length - 1].streaming) {
              delete newMessages[newMessages.length - 1].streaming;
            }
            return newMessages;
          });
          return;
        } else {
          const errorText = await res.text();
          console.error('Ollama error:', errorText);
          response = `Error connecting to Ollama (${res.status}). Using local responses instead.\n\n` + findBestMatch(currentInput);
        }
      } catch (error) {
        console.error('Ollama connection error:', error);
        response = `Failed to connect to Ollama: ${error.message}. Using local responses instead.\n\n` + findBestMatch(currentInput);
      }
    } else {
      response = findBestMatch(currentInput);
    }

    await simulateStreaming(response);
  };

  const handleSuggestedQuestion = (question) => {
    setInput(question);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] flex items-center justify-center p-4 backdrop-blur-xl bg-white/10"
        onClick={onClose}
        style={{ backdropFilter: 'blur(20px)' }}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-7xl h-[85vh] bg-cream-100 rounded-lg overflow-hidden shadow-2xl flex flex-col"
        >
          {/* Header */}
          <div className="bg-white border-b-2 border-gray-200 text-charcoal-900 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Sparkles className="w-6 h-6 text-electric" />
              <div>
                <h2 className="text-xl font-bold font-mono">Cyron - AI Resume Assistant</h2>
                <p className="text-xs text-electric">
                  🟢 AI-Powered Resume Assistant
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={onClose}
                className="p-2 hover:bg-charcoal-800/10 rounded-lg transition-colors"
                aria-label="Close"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div className="flex-grow flex overflow-hidden">
            {/* Left side - Resume PDF viewer */}
            <div className="w-1/2 border-r-2 border-gray-200 bg-gray-50 flex flex-col">
              <div className="h-full flex flex-col">
                {/* PDF Header with controls */}
                <div className="bg-charcoal-900 px-4 py-3 flex items-center justify-between border-b-2 border-gray-200">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-electric" />
                    <span className="text-cream-100 text-sm font-mono">UtkarshML.pdf</span>
                    {numPages && (
                      <span className="text-xs text-gray-400 font-mono ml-2">
                        {numPages} {numPages === 1 ? 'page' : 'pages'}
                      </span>
                    )}
                  </div>
                  
                  {/* PDF Controls */}
                  <div className="flex items-center gap-2">
                    {/* Zoom Controls */}
                    <button
                      onClick={zoomOut}
                      className="p-1.5 hover:bg-gray-700 rounded transition-colors"
                      title="Zoom Out"
                    >
                      <ZoomOut className="w-4 h-4 text-cream-100" />
                    </button>
                    <span className="text-xs text-cream-100 font-mono min-w-[45px] text-center">
                      {Math.round(scale * 100)}%
                    </span>
                    <button
                      onClick={zoomIn}
                      className="p-1.5 hover:bg-gray-700 rounded transition-colors"
                      title="Zoom In"
                    >
                      <ZoomIn className="w-4 h-4 text-cream-100" />
                    </button>
                    
                    <div className="w-px h-5 bg-gray-600 mx-1"></div>
                    
                    {/* Download Button */}
                    <button
                      onClick={downloadPDF}
                      className="p-1.5 hover:bg-electric hover:text-charcoal-900 rounded transition-colors"
                      title="Download Resume"
                    >
                      <Download className="w-4 h-4 text-cream-100 hover:text-charcoal-900" />
                    </button>
                  </div>
                </div>

                {/* PDF Viewer - All pages scrollable */}
                <div className="flex-grow overflow-auto bg-gray-100 py-4">
                  {!pdfError ? (
                    <div className="flex flex-col items-center gap-4">
                      <Document
                        file="/UtkarshML.pdf"
                        onLoadSuccess={onDocumentLoadSuccess}
                        onLoadError={onDocumentLoadError}
                        options={pdfOptions}
                        loading={
                          <div className="flex items-center justify-center min-h-[500px]">
                            <div className="text-center">
                              <div className="w-12 h-12 border-4 border-electric border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                              <p className="text-sm text-gray-600 font-mono">Loading Resume PDF...</p>
                            </div>
                          </div>
                        }
                        error={
                          <div className="flex items-center justify-center min-h-[500px]">
                            <div className="text-center bg-red-50 p-8 rounded-lg border-2 border-red-200">
                              <p className="text-red-600 font-mono mb-2">⚠️ Failed to load PDF</p>
                              <button
                                onClick={downloadPDF}
                                className="px-4 py-2 bg-electric text-white rounded hover:bg-charcoal-900 transition-colors font-mono text-sm mt-4"
                              >
                                Download PDF Instead
                              </button>
                            </div>
                          </div>
                        }
                        className="flex flex-col items-center gap-4"
                      >
                        {/* Render all pages */}
                        {Array.from(new Array(numPages), (el, index) => (
                          <Page
                            key={`page_${index + 1}`}
                            pageNumber={index + 1}
                            scale={scale}
                            renderTextLayer={false}
                            renderAnnotationLayer={false}
                            className="border border-gray-300 shadow-xl bg-white"
                          />
                        ))}
                      </Document>
                    </div>
                  ) : (
                    <div className="p-8 space-y-6 overflow-y-auto max-h-[calc(85vh-200px)]">
                  {/* Resume Content Preview */}
                  <div className="font-mono text-sm space-y-6">
                    <div>
                      <h3 className="text-2xl font-bold text-electric mb-2">UTKARSH YADAV</h3>
                      <p className="text-charcoal-800">SDE1 | ML/Gen AI Engineer</p>
                    </div>

                    <div>
                      <h4 className="text-lg font-bold text-charcoal-900 mb-2 border-b border-electric pb-1">SKILLS</h4>
                      <div className="space-y-2 text-xs">
                        <p><span className="text-neon-purple font-bold">AI & ML:</span> Deep Learning, Neural Networks, Computer Vision, NLP</p>
                        <p><span className="text-neon-purple font-bold">ML Frameworks:</span> PyTorch, TensorFlow, Keras, Scikit-learn, HuggingFace</p>
                        <p><span className="text-neon-purple font-bold">Gen AI:</span> LangChain, OpenAI API, RAG Systems, Fine-tuning</p>
                        <p><span className="text-neon-purple font-bold">Languages:</span> Python, Java, SQL, C++, Bash</p>
                        <p><span className="text-neon-purple font-bold">Backend:</span> Spring Boot, FastAPI, Flask, REST APIs, Microservices</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-lg font-bold text-charcoal-900 mb-2 border-b border-electric pb-1">EXPERIENCE</h4>
                      <div className="space-y-3 text-xs">
                        <div>
                          <p className="font-bold text-charcoal-900">Software Development Engineer - ML & Gen AI</p>
                          <p className="text-neon-purple">Proeffico Solutions • March 2024 - Present</p>
                          <p className="text-charcoal-800 mt-1">• Facial recognition: 40s to 1s latency • Redis vector storage under 200ms • 1000+ daily requests</p>
                        </div>
                        <div>
                          <p className="font-bold text-charcoal-900">Software Engineer Intern</p>
                          <p className="text-neon-purple">Proeffico Solutions • Sept 2023 - March 2024</p>
                          <p className="text-charcoal-800 mt-1">• Mutual fund platform backend • 80% faster APIs • Redis caching & indexing</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-lg font-bold text-charcoal-900 mb-2 border-b border-electric pb-1">PROJECTS</h4>
                      <div className="space-y-4 text-xs">
                        <div>
                          <p className="font-bold text-charcoal-900">Self-Hosted Research Paper Query System</p>
                          <p className="text-neon-purple">NLP Developer (2024)</p>
                          <p className="text-charcoal-800">Tech: Python, LangChain, Vector DB, RAG</p>
                          <p className="text-charcoal-800 mt-1">• Conversational AI • Custom embeddings • 80% faster navigation</p>
                        </div>
                        <div>
                          <p className="font-bold text-charcoal-900">LLM Fine-tuning Framework</p>
                          <p className="text-neon-purple">Gen AI Developer (2025)</p>
                          <p className="text-charcoal-800">Tech: PyTorch, HuggingFace, LoRA</p>
                          <p className="text-charcoal-800 mt-1">• Medical diagnosis • 60% to 90% accuracy • 3B parameter model</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-lg font-bold text-charcoal-900 mb-2 border-b border-electric pb-1">EDUCATION</h4>
                      <div className="text-xs">
                        <p className="font-bold text-charcoal-900">IIMT Engineering College, Meerut</p>
                        <p className="text-charcoal-800">B.Tech in Computer Science • GPA: 8.57/10.0</p>
                        <p className="text-neon-purple">July 2019 - June 2023</p>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-charcoal-800/20">
                      <p className="text-xs text-charcoal-800 italic">
                        💡 PDF failed to load. Ask the AI assistant about any section for detailed information
                      </p>
                    </div>
                  </div>
                </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right side - Chat interface */}
            <div className="w-1/2 flex flex-col bg-white">
              {/* Chat messages */}
              <div className="flex-grow overflow-y-auto p-6 space-y-4 bg-gray-50">
                {messages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-4 rounded-lg font-mono text-sm leading-relaxed ${
                        message.role === 'user'
                          ? 'bg-electric/10 text-charcoal-900 border-l-4 border-electric'
                          : 'bg-gray-100 text-charcoal-900 border-l-4 border-gray-400'
                      }`}
                    >
                      <div 
                        className="whitespace-pre-wrap"
                        dangerouslySetInnerHTML={{ __html: parseMarkdown(message.content) }}
                      />
                      {message.streaming && (
                        <span className="inline-block w-2 h-4 bg-electric ml-1 animate-pulse"></span>
                      )}
                    </div>
                  </motion.div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Suggested questions */}
              {messages.length === 1 && (
                <div className="px-6 pb-4">
                  <p className="text-xs text-charcoal-800 mb-2 font-mono">💡 Try asking:</p>
                  <div className="flex flex-wrap gap-2">
                    {suggestedQuestions.slice(0, 3).map((question, index) => (
                      <button
                        key={index}
                        onClick={() => handleSuggestedQuestion(question)}
                        className="px-3 py-1 text-xs font-mono bg-white hover:bg-electric hover:text-charcoal-900 border border-gray-300 rounded-full transition-colors"
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input area */}
              <div className="p-6 border-t-2 border-gray-200 bg-white">
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Ask about skills, experience, projects..."
                    className="flex-grow px-4 py-3 bg-gray-50 border-2 border-gray-300 rounded-lg font-mono text-sm text-charcoal-900 placeholder-gray-500 focus:border-electric focus:outline-none"
                  />
                  <motion.button
                    onClick={handleSend}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={!input.trim()}
                    className="px-6 py-3 bg-electric text-white rounded-lg hover:bg-charcoal-900 hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span className="font-mono font-semibold">Send</span>
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ResumeChat;
