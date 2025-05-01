import React from 'react';
import { motion } from 'framer-motion';
import { PlayCircle, Clock } from 'lucide-react';
import FileUploader from './FileUploader';

interface StartScreenProps {
  onStart: () => void;
  onFileLoaded: (content: string) => void;
  hasUploadedFile: boolean;
}

const StartScreen: React.FC<StartScreenProps> = ({ 
  onStart, 
  onFileLoaded,
  hasUploadedFile 
}) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <div className="flex justify-center mb-4">
          <Clock className="w-16 h-16 text-primary-600" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
          Speaking Prompts
        </h1>
        <p className="text-gray-600 max-w-md mx-auto">
          Practice your public speaking with timed prompts. Upload your custom prompts or use our samples.
        </p>
      </motion.div>

      <FileUploader onFileLoaded={onFileLoaded} hasUploadedFile={hasUploadedFile} />

      <motion.button
        onClick={onStart}
        className="flex items-center justify-center px-8 py-4 bg-primary-600 text-white rounded-full shadow-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50 transition-all"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <PlayCircle className="w-6 h-6 mr-2" />
        <span className="text-lg font-semibold">Start</span>
      </motion.button>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="mt-12 text-xs text-gray-500 max-w-md text-center"
      >
        <p>
          The timer will start at 8 minutes. You can add time, pause, or get a new prompt at any time.
        </p>
      </motion.div>
    </div>
  );
};

export default StartScreen;