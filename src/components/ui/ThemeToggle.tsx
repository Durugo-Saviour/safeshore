import { Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';

interface ThemeToggleProps {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

export default function ThemeToggle({ theme, toggleTheme }: ThemeToggleProps) {
  return (
    <button
      onClick={toggleTheme}
      className="relative p-2 text-slate-400 hover:text-brand-gold dark:hover:text-brand-gold transition-colors rounded-lg hover:bg-black/5 dark:hover:bg-white/5"
      aria-label="Toggle theme"
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        <motion.div
          initial={false}
          animate={{ scale: theme === 'dark' ? 1 : 0, opacity: theme === 'dark' ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          className="absolute"
        >
          <Moon size={20} />
        </motion.div>
        <motion.div
          initial={false}
          animate={{ scale: theme === 'light' ? 1 : 0, opacity: theme === 'light' ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          className="absolute"
        >
          <Sun size={20} />
        </motion.div>
      </div>
    </button>
  );
}
