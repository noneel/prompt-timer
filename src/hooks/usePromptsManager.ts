import { useState, useCallback } from 'react';
import { Prompt } from '../types';
import { parseCSV, getRandomPrompt } from '../utils/csvParser';

// Sample prompts for initial state
const samplePrompts: Prompt[] = [
  { prompt: 'Describe your most memorable childhood experience.' },
  { prompt: 'If you could change one thing about the world, what would it be and why?' },
  { prompt: 'What does success mean to you?' },
  { prompt: 'Discuss the importance of sustainability in today\'s world.' },
  { prompt: 'Share your thoughts on the impact of technology on human relationships.' },
];

export const usePromptsManager = () => {
  const [prompts, setPrompts] = useState<Prompt[]>(samplePrompts);
  const [currentPrompt, setCurrentPrompt] = useState<Prompt>(samplePrompts[0]);
  const [hasUploadedFile, setHasUploadedFile] = useState(false);

  const loadPromptsFromCSV = useCallback((csvContent: string) => {
    const parsedPrompts = parseCSV(csvContent);
    
    if (parsedPrompts.length > 0) {
      setPrompts(parsedPrompts);
      setCurrentPrompt(parsedPrompts[0]);
      setHasUploadedFile(true);
      return true;
    }
    
    return false;
  }, []);

  const selectNewPrompt = useCallback(() => {
    const newPrompt = getRandomPrompt(prompts);
    setCurrentPrompt(newPrompt);
  }, [prompts]);

  return {
    prompts,
    currentPrompt,
    hasUploadedFile,
    loadPromptsFromCSV,
    selectNewPrompt,
  };
};