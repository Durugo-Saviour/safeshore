import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot } from 'lucide-react';
import { company, clients, certifications, projects } from '../../data/content';

type Message = {
  id: string;
  type: 'bot' | 'user';
  text: string;
  quickReplies?: string[];
};

const QUICK_TOPICS = [
  'Services',
  'Contact Info',
  'Projects',
  'Certifications',
  'Clients',
  'Get a Quote',
];

const KNOWLEDGE: Record<string, { patterns: RegExp[]; answer: string; context?: string | null }> = {
  services: {
    patterns: [/\b(service|services|what do you do|offer|capabilities|provide|solutions)\b/i],
    answer: `We specialize in Marine & Offshore Safety Asset Integrity. Our core services include:\n\n1. **Life-Saving Appliances (LSA)** — Liferafts, lifeboats, rescue boats, life jackets, immersion suits, SCBA units, EEBDs, oxygen cylinders, load testing & recertification.\n\n2. **Fire Fighting Equipment (FFE)** — CO₂ systems, fire pumps, fire extinguishers, fire detection systems, fire alarms, fire blankets, fireman suits.\n\n3. **Marine, NDT & Industrial** — Statutory surveys, non-destructive testing, vessel modifications, tank cleaning.\n\n4. **Platform Revamp** — Onshore/offshore upgrades, modifications, fabrication & commissioning.\n\n5. **Operations & Maintenance** — Facility audits, equipment maintenance schedules, recertification.\n\nWhich service would you like to know more about?`,
    context: 'services',
  },
  lsa: {
    patterns: [/\b(lsa|life.?saving|life.?raft|life.?boat|rescue.?boat|life.?jacket|immersion|scba|eebd)\b/i],
    answer: `Our **Life-Saving Appliances (LSA)** services include:\n\n• Full inspection, servicing, load testing, and statutory recertification of:\n  — Liferafts\n  — Lifeboats (free-fall & davit-launched)\n  — Rescue boats\n  — Life jackets & immersion suits\n• **SCBA units** (Self-Contained Breathing Apparatus) — servicing & testing\n• **EEBDs** (Emergency Escape Breathing Devices) — servicing & hydro-testing\n• Medical oxygen cylinders\n• Deployment systems: Davits and winches\n• Compliance with SOLAS, LSA Code, and flag state requirements\n• We handle both annual and 5-yearly certification cycles\n\nWould you like to know about a specific LSA type or our FFE services?`,
    context: 'lsa',
  },
  ffe: {
    patterns: [/\b(ffe|fire.?fight|fire.?equipment|fire.?extinguisher|co.?2|suppression)\b/i],
    answer: `Our **Fire Fighting Equipment (FFE)** services cover:\n\n• Portable & wheeled fire extinguishers (servicing & recertification)\n• Engine room fixed CO₂ suppression systems\n• Fire pumps & nozzles — testing & recertification\n• Fire detection systems & alarm networks\n• Fire blankets & fireman suits\n• Fire hoses, nozzles, and couplings\n• Annual & 5-yearly statutory servicing\n\nAll work meets SOLAS, IMO, and flag state standards. Need a quote?`,
    context: 'ffe',
  },
  marine: {
    patterns: [/\b(marine|ndt|non.?destructive|survey|vessel|tank.?clean|fabrication)\b/i],
    answer: `Our **Marine, NDT & Industrial** services include:\n\n• Statutory marine surveys & vessel registrations\n• Non-Destructive Testing (NDT) — UT, MT, PT, VT\n• Vessel repairs, modifications & fabrications\n• Tank and barge cleaning services\n• Hull inspections & thickness measurements\n• Structural integrity assessments\n\nWe work with majorClassification Societies and flag states. Want more details?`,
    context: 'marine',
  },
  platform: {
    patterns: [/\b(platform|revamp|upgrade|modification|engineering|commissioning)\b/i],
    answer: `Our **Platform Revamp** services include:\n\n• Engineering assessment & modifications\n• Structural fabrication & installation\n• Testing & commissioning\n• Project management & QA/QC\n• Onshore and offshore facility upgrades\n• Extending or modifying existing platforms\n\nWe've completed major revamp projects for FPSO facilities and production platforms. Interested in a specific project type?`,
    context: 'platform',
  },
  om: {
    patterns: [/\b(operations?.?&? ?maintenance|o&m|facility|audit|inspection|shutdown)\b/i],
    answer: `Our **Operations & Maintenance** services include:\n\n• Facility safety audits & inspections\n• Equipment maintenance schedules & programs\n• Safety equipment recertification management\n• Minimizing unplanned shutdowns\n• Ongoing support for production facilities\n\nWe help keep your operations safe and efficient with proactive maintenance strategies. Would you like to discuss a specific facility?`,
    context: 'om',
  },
  contact: {
    patterns: [/\b(contact|contact.?info|reach|email|phone|call|number|get.?in.?touch|enquiry)\b/i],
    answer: `Here's how to reach us:\n\n📧 **Email:**\n• ${company.emails[0]}\n• ${company.emails[1]}\n\n📞 **Phone:**\n• ${company.phones.join('\n• ')}\n\n📍 **Office:**\n${company.address}\n\n⏰ **Hours:** ${company.hours}\n\nWould you like directions to our office?`,
    context: 'contact',
  },
  address: {
    patterns: [/\b(address|location|where|direction|office|located|find.?you|map)\b/i],
    answer: `We have two locations in Port Harcourt:\n\n📍 **Main Office:**\n${company.address}\n\n📍 **Alternative:**\n${company.addressAlt}\n\nBoth are in Rivers State, Nigeria — the heart of the Oil & Gas sector. Would you like our contact numbers?`,
    context: 'address',
  },
  clients: {
    patterns: [/\b(clients?|customers?|who|worked.?with|partner|served|trusted.?by)\b/i],
    answer: `We're proud to serve leading companies in Nigeria's Oil & Gas and Maritime sectors:\n\n${clients.map(c => `• ${c.name}`).join('\n')}\n\n...and many more regional maritime operators. Our clients trust us for critical safety compliance and zero-downtime operations.`,
    context: 'clients',
  },
  projects: {
    patterns: [/\b(projects?|portfolio|experience|track.?record|done|completed|case)\b/i],
    answer: `We've delivered ${projects.length}+ notable projects including:\n\n${projects.slice(0, 5).map(p => `• **${p.title}** — ${p.desc.slice(0, 60)}...`).join('\n')}\n\n...and many more. Our portfolio covers FPSO facilities, production platforms, and multi-vessel campaigns across Nigeria's major oil-producing regions. Want to see more?`,
    context: 'projects',
  },
  certifications: {
    patterns: [/\b(certifications?|iso|nimasa|nuprc|nmdpra|solas|ncdmb|approval|compliance|accredit)\b/i],
    answer: `We hold the following certifications and registrations:\n\n${certifications.map(c => `• **${c.title}** — ${c.desc}`).join('\n')}\n\nAdditionally:\n• NUPRC Registered\n• NIMASA Compliant\n• NCDMB Registered\n• Full SOLAS compliance\n• CAC Reg: ${company.cac}\n\nCompliance is the foundation of everything we do.`,
    context: 'certifications',
  },
  quote: {
    patterns: [/\b(quote|get.?a.?quote|pricing|cost|price|how.?much|budget|estimate|proposal)\b/i],
    answer: `For custom quotes and pricing, please contact our team directly:\n\n📧 ${company.emails[0]}\n📞 ${company.phones[0]}\n\nWe provide tailored proposals based on your vessel type, equipment inventory, and scope of work. Response time is typically within 24 hours.`,
    context: 'quote',
  },
  team: {
    patterns: [/\b(team|staff|employees|personnel|workers|engineers|technician|expert|people|workforce)\b/i],
    answer: `Our team consists of OEM-trained technicians and certified engineers with deep expertise in:\n\n• Life-Saving Appliances maintenance\n• Fire Fighting Equipment servicing\n• Non-Destructive Testing (NDT)\n• Marine survey & inspection\n• Project management\n\nAll technicians hold valid certifications and undergo continuous safety training. We maintain a zero-harm safety culture across all operations.`,
    context: 'team',
  },
  safety: {
    patterns: [/\b(safety|hse|health|environment|zero.?harm|incident|accident|record)\b/i],
    answer: `Safety is our foundation. Our HSE commitment includes:\n\n• **Zero Harm Objective** — Eliminating workplace injuries and environmental incidents\n• **Regulatory Compliance** — Strict adherence to IMS, SOLAS, NIMASA, NUPRC/NMDPRA, and NCDMB\n• **Competency & Accountability** — Continuous safety training with hazard-awareness\n• **Environmental Stewardship** — Eco-friendly procedures and waste management\n\nWe maintain an impeccable safety record across all project sites.`,
    context: 'safety',
  },
  experience: {
    patterns: [/\b(year|experience|how.?long|establish|founded|since|history|background)\b/i],
    answer: `Shoresafe Services Ltd was established in **${company.established}** — that's over 7 years of dedicated service in Nigeria's marine and offshore safety sector.\n\n• CAC Reg: ${company.cac}\n• Based in Port Harcourt, Nigeria's Oil & Gas hub\n• 50+ projects completed\n• 8+ major clients served\n• 3 ISO certifications held\n\nWe were founded to bridge the safety gap in Nigeria's Marine and Oil & Gas sectors.`,
    context: 'experience',
  },
  about: {
    patterns: [/\b(about|who are|tell me|company|shoresafe|overview|introduction)\b/i],
    answer: `${company.name} is a premier Nigerian marine and safety asset integrity specialist, based in Port Harcourt.\n\n**What we do:**\nEnd-to-end inspection, maintenance, testing, and statutory recertification for Life-Saving Appliances and Fire Fighting Equipment.\n\n**Sectors:**\nOil & Gas and Maritime\n\n**Established:** ${company.established}\n**CAC:** ${company.cac}\n\nOur mission is to eliminate operational downtime, guarantee regulatory compliance, and safeguard offshore personnel and infrastructure.\n\nWhat would you like to know more about?`,
    context: 'about',
  },
  hours: {
    patterns: [/\b(hour|time|open|close|working|schedule|business.?day)\b/i],
    answer: `Our business hours are:\n\n⏰ **${company.hours}**\n\nFor urgent out-of-hours emergencies, please call ${company.phones[0]}.`,
    context: undefined,
  },
  thanks: {
    patterns: [/\b(thank|thanks|thx|appreciate|helpful|great|awesome|perfect)\b/i],
    answer: `You're welcome! Is there anything else I can help you with? I'm here to answer questions about our services, projects, certifications, or how to get in touch.`,
    context: undefined,
  },
  greeting: {
    patterns: [/\b(hi|hello|hey|greetings|good.?morning|good.?afternoon|good.?evening|yo|sup)\b/i],
    answer: `Hello! Welcome to ${company.name}. I'm here to help you with:\n\n• Our services & capabilities\n• Company information\n• Certifications & compliance\n• Contact details & location\n• Past projects & clients\n\nWhat would you like to know?`,
    context: undefined,
  },
  goodbye: {
    patterns: [/\b(bye|goodbye|see.?you|later|take.?care|cya|night)\b/i],
    answer: `Goodbye! Thanks for visiting ${company.name}. Feel free to reach out anytime at ${company.phones[0]} or ${company.emails[0]}. Have a great day!`,
    context: undefined,
  },
  help: {
    patterns: [/\b(help|assist|support|what can you|options|menu|guide)\b/i],
    answer: `I can help you with:\n\n🔹 **Services** — LSA, FFE, NDT, Platform Revamp, O&M\n🔹 **Contact** — Phone, email, address, office hours\n🔹 **Projects** — Our portfolio and track record\n🔹 **Certifications** — ISO, NUPRC, NIMASA, SOLAS\n🔹 **Clients** — Who we work with\n🔹 **About Us** — Company overview and history\n🔹 **Get a Quote** — How to request pricing\n\nJust ask me anything!`,
    context: undefined,
  },
};

function findBestMatch(query: string, conversationContext: string | null): { answer: string; context: string | null; quickReplies?: string[] } {
  const q = query.toLowerCase().trim();

  // Check context-sensitive follow-ups first
  if (conversationContext) {
    // Generic "tell me more" / "yes" / "elaborate"
    if (/\b(more|detail|elaborate|tell.?me|explain|yes|sure|please|ok|yep|yeah)\b/.test(q)) {
      const contextKey = conversationContext;
      if (KNOWLEDGE[contextKey]) {
        return { answer: KNOWLEDGE[contextKey].answer, context: KNOWLEDGE[contextKey].context || null };
      }
    }
    // "no" / "nope" / "nah" — reset context
    if (/\b(no|nope|nah|nothing|never.?mind|cancel)\b/.test(q)) {
      return {
        answer: 'No problem! Is there anything else you\'d like to know about Shoresafe?',
        context: null,
        quickReplies: QUICK_TOPICS,
      };
    }
    // "what about X" / "and X" / "how about X" — may reference new topic
    const aboutMatch = q.match(/(?:what about|and|how about|also|plus|tell me about)\s+(.+)/);
    if (aboutMatch) {
      // Re-enter normal matching with the extracted topic
      return findBestMatch(aboutMatch[1], null);
    }
  }

  // Direct topic matching
  let bestMatch: string | null = null;
  let bestScore = 0;

  for (const [key, entry] of Object.entries(KNOWLEDGE)) {
    for (const pattern of entry.patterns) {
      const match = q.match(pattern);
      if (match) {
        const score = match[0].length;
        if (score > bestScore) {
          bestScore = score;
          bestMatch = key;
        }
      }
    }
  }

  if (bestMatch && KNOWLEDGE[bestMatch]) {
    const entry = KNOWLEDGE[bestMatch];
    const quickReplies = bestMatch === 'services'
      ? ['LSA', 'FFE', 'Marine & NDT', 'Platform Revamp', 'O&M']
      : bestMatch === 'contact'
      ? ['Get Directions', 'Call Now', 'Send Email']
      : bestMatch === 'projects'
      ? ['View All Projects', 'Fire Safety', 'Maintenance']
      : undefined;
    return { answer: entry.answer, context: entry.context || null, quickReplies };
  }

  // Fuzzy fallback — try partial word matches
  const words = q.split(/\s+/).filter(w => w.length > 3);
  for (const word of words) {
    for (const [key, entry] of Object.entries(KNOWLEDGE)) {
      for (const pattern of entry.patterns) {
        if (pattern.test(word)) {
          const entry2 = KNOWLEDGE[key];
          return { answer: entry2.answer, context: entry2.context || null };
        }
      }
    }
  }

  // Intelligent fallback
  return {
    answer: `I'm not sure I understood that. I can help you with:\n\n• **Services** — What we do\n• **Contact** — How to reach us\n• **Projects** — Our work\n• **Certifications** — Our approvals\n• **Clients** — Who we serve\n• **About** — Company overview\n• **Quote** — Get pricing\n\nTry asking about any of these!`,
    context: null,
    quickReplies: QUICK_TOPICS,
  };
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      text: `Hello! I'm the ${company.name} virtual assistant. I can help with information about our services, projects, certifications, and how to contact us.\n\nWhat would you like to know?`,
      quickReplies: QUICK_TOPICS,
    },
  ]);
  const [input, setInput] = useState('');
  const [context, setContext] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen, scrollToBottom]);

  const processMessage = (text: string) => {
    const userMessage: Message = { id: Date.now().toString(), type: 'user', text };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    const typingDelay = 500 + Math.min(text.length * 15, 800);

    setTimeout(() => {
      const result = findBestMatch(text, context);
      setContext(result.context);

      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        text: result.answer,
        quickReplies: result.quickReplies,
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, typingDelay);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    processMessage(input.trim());
  };

  const handleQuickReply = (reply: string) => {
    processMessage(reply);
  };

  return (
    <div className="fixed bottom-20 right-4 md:bottom-6 md:right-6 z-[9999]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-16 right-0 w-[calc(100vw-2rem)] md:w-[380px] glass-strong rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-white/10"
            style={{ height: '520px', maxHeight: '75vh' }}
          >
            {/* Header */}
            <div className="bg-brand-blue/20 border-b border-white/10 text-white p-4 flex justify-between items-center shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-brand-blue/20 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-brand-blue" />
                </div>
                <div>
                  <span className="font-semibold text-sm block">Shoresafe Assistant</span>
                  <span className="text-[10px] text-green-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
                    Online
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white transition-colors p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-navy-950/50">
              {messages.map((msg) => (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={msg.id}
                  className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.type === 'bot' && (
                    <div className="w-6 h-6 rounded-full bg-brand-blue/20 flex items-center justify-center shrink-0 mr-2 mt-1">
                      <Bot className="w-3 h-3 text-brand-blue" />
                    </div>
                  )}
                  <div className="max-w-[80%]">
                    <div className={`rounded-2xl p-3 text-sm whitespace-pre-wrap leading-relaxed ${
                      msg.type === 'user'
                        ? 'bg-brand-blue text-white rounded-br-sm'
                        : 'bg-navy-800 text-slate-200 shadow-sm border border-white/5 rounded-bl-sm'
                    }`}>
                      {msg.text.split('\n').map((line, i) => {
                        // Simple bold rendering for **text**
                        const parts = line.split(/(\*\*[^*]+\*\*)/g);
                        return (
                          <span key={i}>
                            {parts.map((part, j) => {
                              if (part.startsWith('**') && part.endsWith('**')) {
                                return <strong key={j} className="text-white font-semibold">{part.slice(2, -2)}</strong>;
                              }
                              return <span key={j}>{part}</span>;
                            })}
                            {i < msg.text.split('\n').length - 1 && <br />}
                          </span>
                        );
                      })}
                    </div>
                    {/* Quick replies */}
                    {msg.quickReplies && msg.type === 'bot' && (
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {msg.quickReplies.map((reply) => (
                          <button
                            key={reply}
                            onClick={() => handleQuickReply(reply)}
                            className="px-3 py-1 text-xs font-medium bg-brand-blue/10 text-brand-blue border border-brand-blue/20 rounded-full hover:bg-brand-blue/20 transition-colors"
                          >
                            {reply}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2"
                >
                  <div className="w-6 h-6 rounded-full bg-brand-blue/20 flex items-center justify-center shrink-0">
                    <Bot className="w-3 h-3 text-brand-blue" />
                  </div>
                  <div className="bg-navy-800 border border-white/5 rounded-2xl rounded-bl-sm px-4 py-3">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSend} className="p-3 bg-navy-900 border-t border-white/10 flex gap-2 shrink-0">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about our services..."
                className="flex-1 px-4 py-2.5 bg-navy-950 border border-white/10 rounded-full text-sm focus:outline-none focus:border-brand-blue/50 text-slate-200 placeholder:text-slate-400 transition-colors"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="p-2.5 bg-brand-blue text-white rounded-full hover:bg-brand-blue/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shrink-0"
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
          <span className="absolute top-0 right-0 w-3 h-3 bg-brand-red rounded-full border-2 border-navy-950" />
        )}
      </motion.button>
    </div>
  );
}
