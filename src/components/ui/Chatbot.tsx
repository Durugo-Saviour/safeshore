import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot } from 'lucide-react';
import { company, services, clients } from '../../data/content';

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
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const generateResponse = (query: string): string => {
    const q = query.toLowerCase();
    
    if (q.includes('service') || q.includes('what do you do') || q.includes('offer')) {
      const serviceList = services.map(s => `- ${s.title}`).join('\n');
      return `We offer a range of services including:\n\n${serviceList}\n\nCan I provide more details on any of these?`;
    }
    
    if (q.includes('contact') || q.includes('phone') || q.includes('email') || q.includes('address') || q.includes('reach') || q.includes('call')) {
      return `You can reach us at:\n\nPhone: ${company.phones.join(', ')}\nEmail: ${company.emails.join('\n')}\nAddress: ${company.address}\nHours: ${company.hours}`;
    }

    if (q.includes('client') || q.includes('who have you worked with') || q.includes('customers')) {
      return `We have proudly worked with clients such as:\n\n${clients.slice(0, 5).join(', ')} and more.`;
    }

    if (q.includes('where') || q.includes('location')) {
      return `We are located at:\n${company.address}\n\nAlternative Address:\n${company.addressAlt}`;
    }

    if (q.includes('hello') || q.includes('hi') || q.includes('hey')) {
      return `Hello! How can I assist you today?`;
    }

    if (q.includes('name') || q.includes('who are you')) {
      return `I am the virtual assistant for ${company.name}.`;
    }

    if (q.includes('hour') || q.includes('time') || q.includes('open')) {
      return `Our business hours are: ${company.hours}.`;
    }
    
    if (q.includes('cac') || q.includes('registration')) {
      return `Our CAC Registration Number is ${company.cac}.`;
    }

    return "I'm sorry, I couldn't quite understand that. You can ask me about our services, contact details, operating hours, or clients.";
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { id: Date.now().toString(), type: 'user', text: input.trim() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Simulate thinking delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        text: generateResponse(userMessage.text),
      };
      setMessages(prev => [...prev, botResponse]);
    }, 600);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-16 right-0 w-[350px] glass-strong rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-white/10"
            style={{ height: '500px' }}
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
