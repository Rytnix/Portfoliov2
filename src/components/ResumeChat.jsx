import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, FileText, MessageSquare, Sparkles } from 'lucide-react';

const ResumeChat = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hi! I\'m Cyron, Utkarsh\'s AI resume assistant. I can help you learn about his skills, experience, projects, education, and contact information. What would you like to know?'
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const [genAiEndpoint] = useState('http://45.194.47.156:11434');
  const [ollamaModel] = useState('mistral-nemo:latest');

  // Predefined responses for common questions
  const predefinedResponses = {
    skills: "Utkarsh is proficient in:\n\nAI & ML: Deep Learning, Neural Networks, Computer Vision, NLP, Reinforcement Learning\n\nML Frameworks: PyTorch, TensorFlow, Keras, Scikit-learn, HuggingFace, ONNX\n\nGen AI: LangChain, OpenAI API, Prompt Engineering, RAG Systems, Fine-tuning, Vector DBs\n\nLanguages: Python, Java, SQL, C++, Bash\n\nBackend: Spring Boot, FastAPI, Flask, REST APIs, Microservices, JPA/Hibernate\n\nData & Ops: Docker, Kubernetes, AWS, PostgreSQL, MongoDB, Git",
    
    experience: "Utkarsh Yadav is an SDE1 and ML/Gen AI Engineer with expertise in:\n\nBuilding intelligent systems using machine learning and deep learning\n\nDeveloping production-ready AI applications with RAG architecture\n\nCreating real-time sentiment analysis systems with 95%+ accuracy\n\nImplementing computer vision classifiers using transfer learning\n\nFine-tuning LLMs using LoRA and QLoRA techniques\n\nBuilding end-to-end MLOps pipelines with CI/CD\n\nHe's passionate about transforming ideas into intelligent solutions.",
    
    projects: "Here are Utkarsh's notable projects:\n\n**Project 1: RAG-Powered AI Chatbot**\n• Role: Primary Developer & Architect\n• Tech Stack: LangChain, Pinecone/Weaviate, PyTorch/Transformers, FastAPI, Python\n• Achievements:\n  - Seamless integration of LangChain for interactive chat functionality\n  - Implemented vector databases (Pinecone/Weaviate) for efficient retrieval\n  - Fine-tuned and deployed as production-ready application using FastAPI\n\n**Project 2: Real-time Sentiment Analysis**\n• Role: ML Engineer & Developer\n• Tech Stack: PyTorch, Transformers, DistilBERT, Flask, Python\n• Achievements:\n  - Fine-tuned DistilBERT achieving 95%+ accuracy\n  - Built interactive dashboard with real-time visualizations\n  - Deployed scalable sentiment analysis API\n\n**Project 3: Computer Vision Classifier**\n• Role: AI Developer\n• Tech Stack: TensorFlow, Keras, EfficientNet, OpenCV, FastAPI\n• Achievements:\n  - Implemented transfer learning with EfficientNet architecture\n  - Applied model quantization for edge deployment\n  - Achieved high accuracy with optimized inference speed",
    
    education: "While specific education details aren't provided in this portfolio, Utkarsh has demonstrated strong expertise in:\n\nMachine Learning & Deep Learning\nSoftware Development\nAI & Gen AI Technologies\nData Science & Analytics",
    
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
    setIsTyping(true);

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
          setIsTyping(false);
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
Role: SDE1 | ML/Gen AI Engineer

Availability:
✅ Available for Full-Time roles
✅ Available for Freelance projects

Skills:
- AI & ML: Deep Learning, Neural Networks, Computer Vision, NLP, Reinforcement Learning
- ML Frameworks: PyTorch, TensorFlow, Keras, Scikit-learn, HuggingFace, ONNX
- Gen AI: LangChain, OpenAI API, Prompt Engineering, RAG Systems, Fine-tuning, Vector DBs
- Languages: Python, Java, SQL, C++, Bash
- Backend: Spring Boot, FastAPI, Flask, REST APIs, Microservices
- DevOps: Docker, Kubernetes, AWS, Git

Experience: SDE1 and ML/Gen AI Engineer specializing in building intelligent systems, RAG architectures, fine-tuning LLMs, creating sentiment analysis systems with 95%+ accuracy

Projects:

Project 1: RAG-Powered AI Chatbot
• Role: Primary Developer & Architect
• Tech Stack: LangChain, Pinecone/Weaviate, PyTorch/Transformers, FastAPI, Python
• Achievements:
  - Seamless LangChain integration for interactive chat
  - Implemented vector databases for efficient retrieval
  - Production-ready deployment with FastAPI

Project 2: Real-time Sentiment Analysis
• Role: ML Engineer & Developer
• Tech Stack: PyTorch, Transformers, DistilBERT, Flask, Python
• Achievements:
  - Fine-tuned DistilBERT with 95%+ accuracy
  - Interactive real-time dashboard
  - Scalable sentiment analysis API

Project 3: Computer Vision Classifier
• Role: AI Developer
• Tech Stack: TensorFlow, Keras, EfficientNet, OpenCV, FastAPI
• Achievements:
  - Transfer learning with EfficientNet
  - Model quantization for edge deployment
  - Optimized inference speed

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
          setIsTyping(false);
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

    setIsTyping(false);
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
            {/* Left side - Resume PDF placeholder */}
            <div className="w-1/2 border-r-2 border-gray-200 p-6 overflow-y-auto bg-gray-50">
              <div className="terminal-window h-full">
                <div className="terminal-header">
                  <div className="terminal-button red"></div>
                  <div className="terminal-button yellow"></div>
                  <div className="terminal-button green"></div>
                  <span className="text-cream-100 text-xs ml-2 flex items-center gap-1">
                    <FileText className="w-3 h-3" />
                    utkarsh_resume.pdf
                  </span>
                </div>
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
                      <h4 className="text-lg font-bold text-charcoal-900 mb-2 border-b border-electric pb-1">PROJECTS</h4>
                      <div className="space-y-4 text-xs">
                        <div>
                          <p className="font-bold text-charcoal-900">RAG-Powered AI Chatbot</p>
                          <p className="text-neon-purple">Role: Primary Developer & Architect</p>
                          <p className="text-charcoal-800">Tech: LangChain, Pinecone/Weaviate, PyTorch, FastAPI</p>
                          <p className="text-charcoal-800 mt-1">• LangChain integration • Vector databases • Production deployment</p>
                        </div>
                        <div>
                          <p className="font-bold text-charcoal-900">Real-time Sentiment Analysis</p>
                          <p className="text-neon-purple">Role: ML Engineer & Developer</p>
                          <p className="text-charcoal-800">Tech: PyTorch, DistilBERT, Flask</p>
                          <p className="text-charcoal-800 mt-1">• 95%+ accuracy • Real-time dashboard • Scalable API</p>
                        </div>
                        <div>
                          <p className="font-bold text-charcoal-900">Computer Vision Classifier</p>
                          <p className="text-neon-purple">Role: AI Developer</p>
                          <p className="text-charcoal-800">Tech: TensorFlow, EfficientNet, OpenCV</p>
                          <p className="text-charcoal-800 mt-1">• Transfer learning • Edge deployment • Optimized inference</p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-charcoal-800/20">
                      <p className="text-xs text-charcoal-800 italic">
                        💡 Ask the AI assistant about any section for detailed information
                      </p>
                    </div>
                  </div>
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
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 text-charcoal-900 p-4 rounded-lg border-l-4 border-gray-400">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-electric rounded-full animate-bounce"></span>
                        <span className="w-2 h-2 bg-electric rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                        <span className="w-2 h-2 bg-electric rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                      </div>
                    </div>
                  </div>
                )}
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
