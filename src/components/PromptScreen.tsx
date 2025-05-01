import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import PromptDisplay from './PromptDisplay';
import CircularTimer from './CircularTimer';
import ControlButtons from './ControlButtons';
import { Prompt } from '../types';

interface PromptScreenProps {
  prompt: Prompt;
  onPauseResume: () => void;
  onAddTime: () => void;
  onNewPrompt: () => void;
  seconds: number;
  isRunning: boolean;
  isPaused: boolean;
  isCompleted: boolean;
}

const PromptScreen: React.FC<PromptScreenProps> = ({
  prompt,
  onPauseResume,
  onAddTime,
  onNewPrompt,
  seconds,
  isRunning,
  isPaused,
  isCompleted,
}) => {
  // Start the timer automatically when this screen is shown
  useEffect(() => {
    if (!isRunning && !isPaused) {
      onPauseResume();
    }
  }, [isRunning, isPaused, onPauseResume]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-8"
    >
      <div className="w-full max-w-2xl">
        <PromptDisplay prompt={prompt} isCompleted={isCompleted} />
        
        <CircularTimer
          seconds={seconds}
          isRunning={isRunning}
          isPaused={isPaused}
          isCompleted={isCompleted}
        />
        
        <ControlButtons
          onPauseResume={onPauseResume}
          onAddTime={onAddTime}
          onNewPrompt={onNewPrompt}
          isRunning={isRunning}
          isPaused={isPaused}
          isCompleted={isCompleted}
        />
      </div>
    </motion.div>
  );
};

export default PromptScreen;