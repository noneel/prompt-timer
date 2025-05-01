import React from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, PlusCircle, RefreshCw } from 'lucide-react';
import { ControlButtonsProps } from '../types';

const ControlButtons: React.FC<ControlButtonsProps> = ({
  onPauseResume,
  onAddTime,
  onNewPrompt,
  isRunning,
  isPaused,
  isCompleted,
}) => {
  // Different button sets based on timer state
  const renderMainButtons = () => {
    if (isCompleted) {
      return (
        <motion.button
          onClick={onNewPrompt}
          className="flex items-center justify-center px-6 py-3 bg-primary-600 text-white rounded-full shadow-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50 transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <RefreshCw className="w-5 h-5 mr-2" />
          <span>New Prompt</span>
        </motion.button>
      );
    }

    return (
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <motion.button
          onClick={onPauseResume}
          className="flex items-center justify-center px-6 py-3 bg-primary-600 text-white rounded-full shadow-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50 transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isRunning ? (
            <>
              <Pause className="w-5 h-5 mr-2" />
              <span>Pause</span>
            </>
          ) : (
            <>
              <Play className="w-5 h-5 mr-2" />
              <span>{isPaused ? 'Resume' : 'Start'}</span>
            </>
          )}
        </motion.button>
        
        {(isRunning || isPaused) && (
          <motion.button
            onClick={onAddTime}
            className="flex items-center justify-center px-5 py-2 bg-gray-100 text-gray-800 rounded-full shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <PlusCircle className="w-4 h-4 mr-1" />
            <span>+30 Seconds</span>
          </motion.button>
        )}
      </div>
    );
  };

  return (
    <div className="mt-8 flex flex-col items-center">
      {renderMainButtons()}
      
      {!isCompleted && (
        <motion.button
          onClick={onNewPrompt}
          className="mt-6 text-sm text-gray-500 hover:text-primary-600 focus:outline-none transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="flex items-center">
            <RefreshCw className="w-3 h-3 mr-1" />
            New Prompt
          </span>
        </motion.button>
      )}
    </div>
  );
};

export default ControlButtons;