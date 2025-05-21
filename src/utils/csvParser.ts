import { Prompt } from '../types';

export const parseCSV = (csvContent: string): Prompt[] => {
  // Split by newlines and filter out empty lines
  const lines = csvContent.split('\n').filter(line => line.trim() !== '');
  
  // Skip the header row if it exists (check if it contains "prompt" as header)
  const startIndex = lines[0]?.toLowerCase().includes('prompt') ? 1 : 0;
  
  // Parse each line into a Prompt object
  const prompts: Prompt[] = [];
  
  for (let i = startIndex; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line) {
	prompts.push({ prompt: line });
    }
  }
  
  return prompts;
};

export const getRandomPrompt = (prompts: Prompt[]): Prompt => {
  if (prompts.length === 0) {
    return { prompt: 'No prompts available. Please upload a CSV file.' };
  }
  
  const randomIndex = Math.floor(Math.random() * prompts.length);
  return prompts[randomIndex];
};
