import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Send, Mail, Github, Linkedin, Twitter, MapPin, Terminal } from 'lucide-react';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [executing, setExecuting] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setExecuting(true);
    setError(null);
    
    try {
      // EmailJS configuration
      const serviceId = 'service_s37gyj6';  // Your EmailJS service ID
      const templateId = 'template_3wzqsnb';  // Your EmailJS template ID
      const publicKey = '8-9ne1ZHmiq7GqASO';  // Your EmailJS public key

      // Send email using EmailJS
      const result = await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message + '\n\n' + formData.name + '\n' + formData.email,
          to_email: 'work.utkarsh19@gmail.com'
        },
        publicKey
      );

      if (result.status === 200) {
        setExecuting(false);
        setSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
        console.log('Email sent successfully');
        
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        throw new Error('Failed to send email');
      }
    } catch (err) {
      setExecuting(false);
      setError(err.text || 'Failed to send email. Please try again.');
      console.error('Error sending email:', err);
    }
  };

  const socialLinks = [
    {
      name: 'GitHub',
      icon: Github,
      url: 'https://github.com/Rytnix',
      path: '/home/utkarsh/github'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: 'https://www.linkedin.com/in/utkarsh1510/',
      path: '/home/utkarsh/linkedin'
    },
    {
      name: 'X',
      icon: Twitter,
      url: 'https://x.com/_utkarsh_y',
      path: '/home/utkarsh/x'
    },
    {
      name: 'Email',
      icon: Mail,
      url: 'mailto:work.utkarsh19@gmail.com',
      path: '/home/utkarsh/email'
    }
  ];

  return (
    <section id="contact" className="relative py-20 px-4 bg-cream-200/50">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          {/* Section Header */}
          <div className="font-mono text-center">
            <div className="text-electric text-sm mb-2 flex items-center justify-center gap-2">
              <Terminal className="w-4 h-4" />
              {'>'} bash send_message.sh
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-charcoal-900 mb-4">
              <span className="syntax-comment">// </span>
              Get In Touch
            </h2>
            <p className="text-charcoal-800 font-mono text-sm max-w-2xl mx-auto">
              <span className="syntax-comment">
                // Let's build something amazing together. Drop me a message and I'll get back to you ASAP!
              </span>
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="terminal-window">
                <div className="terminal-header">
                  <div className="terminal-button red"></div>
                  <div className="terminal-button yellow"></div>
                  <div className="terminal-button green"></div>
                  <span className="text-cream-100 text-xs ml-2">message_form.sh</span>
                </div>
                <div className="p-6">
                  {!submitted ? (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      {/* Name */}
                      <div>
                        <label className="block text-sm font-mono text-electric mb-2">
                          {'>'} const name = 
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-cream-100 border-2 border-charcoal-800 rounded font-mono text-sm focus:border-electric focus:outline-none transition-colors"
                          placeholder="Your Name"
                        />
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-sm font-mono text-neon-purple mb-2">
                          {'>'} const email = 
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-cream-100 border-2 border-charcoal-800 rounded font-mono text-sm focus:border-electric focus:outline-none transition-colors"
                          placeholder="your.email@example.com"
                        />
                      </div>

                      {/* Message */}
                      <div>
                        <label className="block text-sm font-mono text-neon mb-2">
                          {'>'} const message = 
                        </label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          rows="5"
                          className="w-full px-4 py-3 bg-cream-100 border-2 border-charcoal-800 rounded font-mono text-sm focus:border-electric focus:outline-none transition-colors resize-none"
                          placeholder="Your message here..."
                        />
                      </div>

                      {/* Error Message */}
                      {error && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="p-4 bg-red-100 border-2 border-red-500 rounded font-mono text-sm text-red-700"
                        >
                          <span className="font-bold">Error:</span> {error}
                        </motion.div>
                      )}

                      {/* Submit Button */}
                      <motion.button
                        type="submit"
                        disabled={executing}
                        whileHover={{ scale: executing ? 1 : 1.02 }}
                        whileTap={{ scale: executing ? 1 : 0.98 }}
                        className="w-full px-6 py-3 bg-charcoal-900 text-cream-100 font-mono font-semibold rounded-lg hover:bg-electric hover:text-charcoal-900 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {executing ? (
                          <>
                            <div className="w-4 h-4 border-2 border-cream-100 border-t-transparent rounded-full animate-spin" />
                            <span>Executing...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            <span>{'>'} Execute Command</span>
                          </>
                        )}
                      </motion.button>
                    </form>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="py-12 text-center space-y-4"
                    >
                      <div className="text-6xl">✓</div>
                      <div className="font-mono space-y-2">
                        <p className="text-neon text-lg">{'>'} Message sent successfully!</p>
                        <p className="text-charcoal-800 text-sm">
                          <span className="syntax-comment">// I'll get back to you soon</span>
                        </p>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Social Links & Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-6"
            >
              {/* Info Terminal */}
              <div className="terminal-window">
                <div className="terminal-header">
                  <div className="terminal-button red"></div>
                  <div className="terminal-button yellow"></div>
                  <div className="terminal-button green"></div>
                  <span className="text-cream-100 text-xs ml-2">contact_info.txt</span>
                </div>
                <div className="p-6 space-y-4 font-mono text-sm">
                  <div>
                    <p className="text-electric mb-2">{'>'} whoami</p>
                    <p className="text-charcoal-800 pl-4">Utkarsh Yadav - ML/Gen AI Engineer</p>
                  </div>
                  <div>
                    <p className="text-neon-purple mb-2">{'>'} pwd</p>
                    <p className="text-charcoal-800 pl-4 flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      /home/utkarsh/india
                    </p>
                  </div>
                  <div>
                    <p className="text-neon mb-2">{'>'} cat status.txt</p>
                    <p className="text-charcoal-800 pl-4">
                      <span className="text-neon">●</span> Available for full-time & freelance
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="terminal-window">
                <div className="terminal-header">
                  <div className="terminal-button red"></div>
                  <div className="terminal-button yellow"></div>
                  <div className="terminal-button green"></div>
                  <span className="text-cream-100 text-xs ml-2">social_links.sh</span>
                </div>
                <div className="p-6 space-y-3">
                  <p className="text-electric font-mono text-sm mb-4">{'>'} ls -la ~/social/</p>
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, x: -20 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      whileHover={{ x: 10, backgroundColor: 'rgba(0, 217, 255, 0.1)' }}
                      className="flex items-center gap-3 p-3 rounded-lg border border-transparent hover:border-electric transition-all duration-300 group"
                    >
                      <social.icon className="w-5 h-5 text-charcoal-800 group-hover:text-electric transition-colors" />
                      <div className="flex-grow font-mono text-sm">
                        <div className="text-charcoal-900 group-hover:text-electric transition-colors">
                          {social.name}
                        </div>
                        <div className="text-xs text-charcoal-800 opacity-70">
                          {social.path}
                        </div>
                      </div>
                      <span className="text-neon opacity-0 group-hover:opacity-100 transition-opacity">
                        →
                      </span>
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
