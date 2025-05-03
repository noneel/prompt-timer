import React, { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { formatTime, getTimerColor } from "../utils/timeUtils";
import { TimerDisplayProps } from "../types";

const CircularTimer: React.FC<TimerDisplayProps> = ({
  seconds,
  isRunning,
  isPaused,
  isCompleted,
}) => {
  // Calculate timer values
  const timerColor = getTimerColor(seconds);
  const normalizedTime = useMemo(() => seconds / (8 * 60), [seconds]);
  const circumference = 2 * Math.PI * 45; // r = 45
  const dashOffset = circumference * (1 - normalizedTime);

  // Determine display classes based on timer state
  const colorClasses = {
    primary: "text-primary-600 stroke-primary-500",
    warning: "text-warning-500 stroke-warning-400",
    danger: "text-danger-600 stroke-danger-500",
  };

  const currentColorClass =
    colorClasses[timerColor as keyof typeof colorClasses];

  // Render nothing if completed
  if (isCompleted) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        className="relative flex justify-center items-center mt-6 mb-6"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* Background circle */}
        <svg
          className="w-40 h-40"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid meet"
        >
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="8"
          />

          <motion.circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            className={currentColorClass}
            transform="rotate(-90 50 50)"
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: dashOffset }}
            transition={{
              duration: isRunning ? 1 : 0,
              ease: "linear",
            }}
          />
        </svg>

        {/* Time display */}
        <div className="absolute flex flex-col items-center justify-center">
          <motion.div
            className={`text-4xl font-semibold ${currentColorClass}`}
            key={seconds}
            initial={{ scale: 1.1, opacity: 0.7 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            {formatTime(seconds)}
          </motion.div>

          {isPaused && (
            <motion.div
              className="text-xs font-medium text-gray-500 mt-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              PAUSED
            </motion.div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CircularTimer;

