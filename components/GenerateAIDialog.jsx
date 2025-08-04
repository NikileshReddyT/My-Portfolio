"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { FaMagic, FaSpinner, FaTimes } from 'react-icons/fa';

export default function GenerateAIDialog({ 
  isOpen, 
  onClose, 
  onGenerate, 
  idea, 
  setIdea, 
  isGenerating, 
  generateError 
}) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, y: -20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: -20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="relative w-full max-w-2xl bg-[var(--card-bg)] rounded-xl shadow-2xl border-2 border-white/10 p-8"
          onClick={(e) => e.stopPropagation()}
        >
          <button 
            onClick={onClose} 
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            aria-label="Close dialog"
          >
            <FaTimes size={20} />
          </button>
          
          <h2 className="text-2xl font-bold mb-2 text-[var(--neon-color)]">Generate with AI</h2>
          <p className="text-gray-400 mb-6">Start with a simple idea, and let AI generate a full blog post draft for you.</p>
          
          <div className="mb-4">
            <label htmlFor="idea-dialog" className="block text-sm font-bold text-gray-300 mb-2">
              Your Idea
            </label>
            <textarea
              id="idea-dialog"
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              placeholder="e.g., 'How to use Next.js server components with AI for a portfolio blog'"
              className="w-full px-4 py-3 rounded-lg bg-[var(--input-bg)] border-2 border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-[var(--neon-color)] focus:border-[var(--neon-color)] transition-all font-mono text-sm"
              rows={4}
            />
          </div>

          <button
            type="button"
            onClick={onGenerate}
            disabled={isGenerating || !idea.trim()}
            className="w-full px-4 py-3 font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
          >
            {isGenerating ? <FaSpinner className="animate-spin" /> : <FaMagic />}
            {isGenerating ? 'Generating...' : 'Generate Post'}
          </button>

          {generateError && <p className="text-red-400 text-sm mt-3 text-center">{generateError}</p>}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
