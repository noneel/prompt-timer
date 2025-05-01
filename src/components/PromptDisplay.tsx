import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Prompt } from '../types';

interface PromptDisplayProps {
  prompt: Prompt;
  isCompleted: boolean;
}

const PromptDisplay: React.FC<PromptDisplayProps> = ({ prompt, isCompleted }) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={prompt.prompt}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className={`w-full max-w-2xl mx-auto ${isCompleted ? 'mt-12' : 'mb-4'}`}
      >
        <div className="bg-white rounded-xl shadow-md p-8 sm:p-10">
          <h2 className="text-sm font-semibold text-primary-600 uppercase tracking-wider mb-2">
            Your Prompt
          </h2>
          <p className="text-xl sm:text-2xl text-gray-800 font-medium leading-relaxed">
            {prompt.prompt}
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PromptDisplay;