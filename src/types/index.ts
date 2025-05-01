export interface Prompt {
  prompt: string;
}

export type TimerState = 'idle' | 'running' | 'paused' | 'completed';

export type AppState = 'start' | 'prompt';

export interface TimerDisplayProps {
  seconds: number;
  isRunning: boolean;
  isPaused: boolean;
  isCompleted: boolean;
}

export interface ControlButtonsProps {
  onPauseResume: () => void;
  onAddTime: () => void;
  onNewPrompt: () => void;
  isRunning: boolean;
  isPaused: boolean;
  isCompleted: boolean;
}