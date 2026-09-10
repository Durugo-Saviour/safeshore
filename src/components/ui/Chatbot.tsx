import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot } from 'lucide-react';
import { company, clients } from '../../data/content';

type Message = {
  id: string;
  type: 'bot' | 'user';
  text: string;
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      text: `Hello! I am the ${company.name} assistant. How can I help you today?\n\nYou can ask me about our services, contact info, or clients.`,
    },
  ]);
  const [input, setInput] = useState('');
  const [context, setContext] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const generateResponse = (query: string, currentContext: string | null): { text: string, newContext: string | null } => {
    const q = query.toLowerCase();
    
    // Greeting
    if (/\b(hi|hello|hey|greetings)\b/.test(q)) {
      return { text: `Hello! How can I assist you today? I can help with information about our services, projects, certifications, or how to contact us.`, newContext: null };
    }

    // Follow-up context checking
    if (currentContext === 'services') {
      if (q.includes('more') || q.includes('detail') || q.includes('explain')) {
        return { text: `Our core services include:\n1. Life-Saving Appliances (LSA)\n2. Fire Fighting Equipment (FFE)\n3. Marine & NDT\n4. SCBA & EEBD Servicing\nWe guarantee OEM compliance. Which one interests you?`, newContext: 'services' };
      }
      if (q.includes('fire') || q.includes('ffe')) {
        return { text: `For Fire Fighting Equipment, we do turnkey testing, servicing of CO2 systems, fire pumps, extinguishers, and detection systems.`, newContext: 'services' };
      }
      if (q.includes('lsa') || q.includes('life')) {
        return { text: `Our LSA services cover full inspection, servicing, load testing, and recertification of liferafts, lifeboats, rescue boats, and davits.`, newContext: 'services' };
      }
    }

    if (currentContext === 'contact') {
      if (q.includes('where') || q.includes('address') || q.includes('location')) {
        return { text: `We are located at ${company.address}.`, newContext: 'contact' };
      }
      if (q.includes('phone') || q.includes('call') || q.includes('number')) {
        return { text: `You can call us at ${company.phones.join(' or ')}.`, newContext: 'contact' };
      }
    }

    // Primary Intent Matching
    if (q.includes('service') || q.includes('what do you do') || q.includes('offer')) {
      return { text: `We specialize in Marine and Safety Asset Integrity. We offer LSA, FFE, NDT, and more. Would you like details on a specific service?`, newContext: 'services' };
    }

    if (q.includes('contact') || q.includes('reach') || q.includes('email') || q.includes('phone')) {
      return { text: `You can reach us via email at ${company.emails[0]} or call ${company.phones[0]}. Do you need our physical address?`, newContext: 'contact' };
    }

    if (q.includes('address') || q.includes('location') || q.includes('where')) {
      return { text: `Our main office is at:\n${company.address}\nLet me know if you need our alternative address.`, newContext: 'contact' };
    }

    if (q.includes('client') || q.includes('who have you worked with') || q.includes('customers')) {
      return { text: `We have proudly served industry leaders like ${clients.slice(0, 4).join(', ')}, among others.`, newContext: 'clients' };
    }

    if (q.includes('project') || q.includes('work') || q.includes('portfolio') || q.includes('experience')) {
      return { text: `We have a strong track record of complex maintenance campaigns. For example, we recently completed projects for FPSO facilities and multi-vessel FFE campaigns.`, newContext: 'projects' };
    }

    if (q.includes('certif') || q.includes('approval') || q.includes('nimasa') || q.includes('nuprc')) {
      return { text: `We are fully certified by NUPRC, NIMASA, and adhere strictly to SOLAS and NCDMB standards. Compliance is our foundation.`, newContext: 'certifications' };
    }

    if (q.includes('hour') || q.includes('time') || q.includes('open')) {
      return { text: `Our operating hours are: ${company.hours}.`, newContext: null };
    }
    
    if (q.includes('cac') || q.includes('registration')) {
      return { text: `Our CAC Registration Number is ${company.cac}.`, newContext: null };
    }

    if (q.includes('cost') || q.includes('price') || q.includes('quote')) {
      return { text: `For pricing and custom quotes, please contact our sales team at ${company.emails[0]} or call ${company.phones[0]}.`, newContext: 'contact' };
    }

    if (q.includes('thank')) {
      return { text: `You're very welcome! Let me know if there's anything else I can assist you with.`, newContext: null };
    }

    return { 
      text: `I'm an automated assistant and might not have the specific answer. However, I can easily help you with:\n- Our Services & Capabilities\n- Contact & Location\n- Past Projects & Clients\n- Certifications\n\nWhat would you like to know?`, 
      newContext: currentContext 
    };
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { id: Date.now().toString(), type: 'user', text: input.trim() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Simulate thinking delay
    setTimeout(() => {
      const response = generateResponse(userMessage.text, context);
      setContext(response.newContext);
      
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        text: response.text,
      };
      setMessages(prev => [...prev, botResponse]);
    }, 600);
  };

  return (
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-[60]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-16 right-0 w-[calc(100vw-2rem)] md:w-[350px] glass-strong rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-white/10"
            style={{ height: '500px', maxHeight: '75vh' }}
          >
            {/* Header */}
            <div className="bg-brand-blue/20 border-b border-white/10 text-white p-4 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-brand-blue" />
                <span className="font-semibold text-sm">Shoresafe Assistant</span>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-navy-950/50">
              {messages.map((msg) => (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={msg.id}
                  className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] rounded-2xl p-3 text-sm whitespace-pre-wrap ${
                    msg.type === 'user' 
                      ? 'bg-brand-blue text-white rounded-br-sm' 
                      : 'bg-navy-800 text-slate-200 shadow-sm border border-white/5 rounded-bl-sm'
                  }`}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSend} className="p-3 bg-navy-900 border-t border-white/10 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about our services..."
                className="flex-1 px-4 py-2 bg-navy-950 border border-white/10 rounded-full text-sm focus:outline-none focus:border-brand-blue/50 text-slate-200 placeholder:text-slate-500 transition-colors"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="p-2 bg-brand-blue text-white rounded-full hover:bg-brand-blue/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-brand-blue text-white rounded-full shadow-lg shadow-brand-blue/20 flex items-center justify-center hover:bg-brand-blue/90 transition-colors relative"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
        {!isOpen && (
          <span className="absolute top-0 right-0 w-3 h-3 bg-brand-red rounded-full border-2 border-navy-950"></span>
        )}
      </motion.button>
    </div>
  );
}
