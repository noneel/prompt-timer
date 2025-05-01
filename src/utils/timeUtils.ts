export const formatTime = (totalSeconds: number): string => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

export const DEFAULT_TIMER_SECONDS = 8 * 60; // 8 minutes in seconds
export const WARNING_THRESHOLD = 3 * 60; // 3 minutes in seconds
export const DANGER_THRESHOLD = 60; // 1 minute in seconds
export const TIME_INCREMENT = 30; // 30 seconds

export const getTimerColor = (seconds: number): string => {
  if (seconds <= DANGER_THRESHOLD) {
    return 'danger';
  } else if (seconds <= WARNING_THRESHOLD) {
    return 'warning';
  }
  return 'primary';
};