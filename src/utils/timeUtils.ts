export const MIN = 60;
export const DEFAULT_TIMER_SECONDS = 7.25 * MIN; // 7 mins 15 seconds
export const WARNING_THRESHOLD = 3 * MIN; // 3 minutes in seconds
export const DANGER_THRESHOLD = MIN; // 1 minute in seconds
export const TIME_INCREMENT = MIN / 2; // 30 seconds

export const formatTime = (totalSeconds: number): string => {
  const minutes = Math.floor(totalSeconds / MIN);
  const seconds = totalSeconds % MIN;

  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

export function getColorByTime(seconds: number): string {
  if (seconds <= DANGER_THRESHOLD) {
    return "text-danger-600 stroke-danger-500";
  } else if (seconds <= WARNING_THRESHOLD) {
    return "text-warning-500 stroke-warning-400";
  }
  return "text-primary-600 stroke-primary-500";
}
