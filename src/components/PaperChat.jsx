import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, FileText, MessageSquare, Sparkles } from 'lucide-react';

const PaperChat = ({ isOpen, onClose, paper }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const [genAiEndpoint] = useState('https://45.194.47.156:11434');
  const [ollamaModel] = useState('mistral-nemo:latest');

  // Reset state when paper changes
  useEffect(() => {
    if (paper && isOpen) {
      setMessages([
        {
          role: 'assistant',
          content: `Hi! I'm an AI assistant specialized in discussing this research paper: "${paper.title}". I can help you understand the methodology, findings, implications, and technical details. What would you like to know?`
        }
      ]);
    }
  }, [paper, isOpen]);

  const suggestedQuestions = paper ? [
    "Explain the main methodology",
    "What are the key findings?",
    "What are the practical applications?",
    "How does this compare to prior work?",
  ] : [];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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

  const isPaperRelated = (query) => {
    if (!paper || !query) return false;
    const lowerQuery = query?.toLowerCase() || '';
    const paperKeywords = [
      'paper', 'research', 'methodology', 'method', 'approach', 'result', 'finding',
      'experiment', 'data', 'model', 'algorithm', 'performance', 'accuracy',
      'conclusion', 'limitation', 'future work', 'contribution', 'novelty',
      'comparison', 'baseline', 'evaluation', 'metric', 'dataset',
      'implementation', 'technical', 'detail', 'explain', 'how', 'what', 'why',
      'application', 'implication', 'significance', 'impact'
    ];
    
    return paperKeywords.some(keyword => lowerQuery.includes(keyword));
  };

  const findBestMatch = (query) => {
    if (!paper) return "No paper selected.";
    if (!query) return "Please ask a question about the paper.";
    
    const lowerQuery = query?.toLowerCase() || '';
    
    // Check if question is paper-related
    if (!isPaperRelated(query)) {
      return `I can only answer questions about the research paper "${paper.title}". Please ask something related to this paper's content, methodology, or findings.`;
    }
    
    if (lowerQuery.includes('methodology') || lowerQuery.includes('method') || lowerQuery.includes('approach')) {
      return `**Methodology Overview:**\n\n${paper.abstract}\n\nThe paper employs advanced ${paper.tech.join(', ')} techniques. For more specific technical details, feel free to ask about particular aspects of the methodology.`;
    }
    if (lowerQuery.includes('finding') || lowerQuery.includes('result') || lowerQuery.includes('key')) {
      return `**Key Findings:**\n\n${paper.keyFindings.map((f, i) => `${i + 1}. ${f}`).join('\n\n')}\n\nThese findings represent significant advances in the field. Would you like me to elaborate on any specific finding?`;
    }
    if (lowerQuery.includes('application') || lowerQuery.includes('practical') || lowerQuery.includes('use')) {
      return `**Practical Applications:**\n\nThis research has several important applications:\n\n${paper.description}\n\nThe techniques presented can be applied to real-world problems in ${paper.tech[0]} and related fields. The work has already garnered ${paper.citations} citations, indicating strong interest from the research community.`;
    }
    if (lowerQuery.includes('compare') || lowerQuery.includes('prior') || lowerQuery.includes('previous') || lowerQuery.includes('state-of-the-art')) {
      return `**Comparison with Prior Work:**\n\nThis paper advances the state-of-the-art with ${paper.keyFindings[0]}. The research builds upon previous work in ${paper.tech.join(', ')} while introducing novel contributions.\n\nPublished at ${paper.venue}, a top-tier venue, the work has been recognized with ${paper.citations} citations since ${paper.year}, demonstrating its impact on the research community.`;
    }
    if (lowerQuery.includes('abstract') || lowerQuery.includes('summary') || lowerQuery.includes('overview')) {
      return `**Paper Overview:**\n\n**Title:** ${paper.title}\n\n**Authors:** ${paper.authors}\n\n**Venue:** ${paper.venue}\n\n**Abstract:** ${paper.abstract}\n\nFeel free to ask about specific aspects of the paper!`;
    }
    
    return `I can help you understand various aspects of "${paper.title}". Try asking about:\n\n` + 
           suggestedQuestions.map(q => `• ${q}`).join('\n') + 
           `\n\nOr ask me anything else about this paper's content, methodology, or findings!`;
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
      await new Promise(resolve => setTimeout(resolve, 30));
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
    if (!input.trim() || !paper) return;

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
        // Check if question is paper-related first
        if (!isPaperRelated(currentInput)) {
          response = `I can only answer questions about the research paper "${paper.title}". Please ask something related to this paper's methodology, findings, or technical details.`;
          setIsTyping(false);
          await simulateStreaming(response);
          return;
        }

        // Prepare system prompt with paper context
        const systemPrompt = `You are a specialized AI assistant for discussing the research paper "${paper.title}".

IMPORTANT RULES:
- ONLY answer questions about this specific research paper
- If asked about unrelated topics, politely redirect to paper-related questions
- Provide detailed, technical explanations when appropriate
- Reference specific findings and methodology from the paper
- Keep responses informative and academically rigorous

PAPER INFORMATION:

Title: ${paper.title}
Authors: ${paper.authors}
Venue: ${paper.venue}
Year: ${paper.year}
Citations: ${paper.citations}

Abstract:
${paper.abstract}

Key Findings:
${paper.keyFindings.map((f, i) => `${i + 1}. ${f}`).join('\n')}

Technologies/Methods Used:
${paper.tech.join(', ')}

Description:
${paper.description}

Remember: Stay strictly within this paper's context. Provide accurate, detailed information about the methodology, findings, implications, and technical details.`;

        // Call Ollama API endpoint with streaming
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
          response = `Error connecting to AI. Using local responses instead.\n\n` + findBestMatch(currentInput);
        }
      } catch (error) {
        console.error('AI connection error:', error);
        response = findBestMatch(currentInput);
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

  if (!isOpen || !paper) return null;

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
                <h2 className="text-xl font-bold font-mono">Research Paper Assistant</h2>
                <p className="text-xs text-electric">
                  🟢 AI-Powered Paper Discussion
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
            {/* Left side - Paper content */}
            <div className="w-1/2 border-r-2 border-gray-200 bg-gray-50">
              {/* Paper content */}
              <div className="p-6 overflow-y-auto h-full">
                    <div className="terminal-window h-full">
                      <div className="terminal-header">
                        <div className="terminal-button red"></div>
                        <div className="terminal-button yellow"></div>
                        <div className="terminal-button green"></div>
                        <span className="text-cream-100 text-xs ml-2 flex items-center gap-1">
                          <FileText className="w-3 h-3" />
                          {paper.name}
                        </span>
                      </div>
                      <div className="p-8 space-y-6 overflow-y-auto max-h-[calc(85vh-250px)]">
                        {/* Paper Content Preview */}
                        <div className="font-mono text-sm space-y-6">
                          <div>
                            <h3 className="text-2xl font-bold text-electric mb-3">{paper.title}</h3>
                            <p className="text-charcoal-800 mb-1">{paper.authors}</p>
                            <p className="text-neon-purple mb-1">{paper.venue}</p>
                            <p className="text-charcoal-800 text-xs">
                              Year: {paper.year} | Citations: {paper.citations}
                            </p>
                          </div>

                          <div>
                            <h4 className="text-lg font-bold text-charcoal-900 mb-2 border-b border-electric pb-1">ABSTRACT</h4>
                            <p className="text-xs leading-relaxed">{paper.abstract}</p>
                          </div>

                          <div>
                            <h4 className="text-lg font-bold text-charcoal-900 mb-2 border-b border-electric pb-1">KEY FINDINGS</h4>
                            <div className="space-y-2 text-xs">
                              {paper.keyFindings.map((finding, i) => (
                                <p key={i} className="flex gap-2">
                                  <span className="text-electric font-bold">{i + 1}.</span>
                                  <span>{finding}</span>
                                </p>
                              ))}
                            </div>
                          </div>

                          <div>
                            <h4 className="text-lg font-bold text-charcoal-900 mb-2 border-b border-electric pb-1">METHODS & TECHNOLOGIES</h4>
                            <div className="flex flex-wrap gap-2">
                              {paper.tech.map((tech, i) => (
                                <span
                                  key={i}
                                  className="text-xs px-2 py-1 border border-electric/50 rounded-full text-charcoal-800"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="pt-4 border-t border-charcoal-800/20">
                            <p className="text-xs text-charcoal-800 italic">
                              💬 Use the chat panel on the right to discuss this paper with AI
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
            </div>

            {/* Right side - Chat interface (desktop view) */}
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
                    {suggestedQuestions.map((question, index) => (
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
                    placeholder="Ask about methodology, findings, applications..."
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

export default PaperChat;
