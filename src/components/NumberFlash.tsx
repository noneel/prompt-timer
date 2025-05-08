import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DEFAULT_TIMER_SECONDS, getColorByTime, MIN } from "../utils/timeUtils";

export interface NumberFlashProps {
  seconds: number;
  isRunning: boolean;
}

const NumberFlash: React.FC<NumberFlashProps> = ({ seconds, isRunning }) => {
  const isLast5Seconds = seconds <= 5 && seconds >= 1;
  const isAMinute = seconds % MIN == 0 && seconds != DEFAULT_TIMER_SECONDS;
  const is5SecondsAfterMinute = seconds % MIN >= 56;
  const shouldShowFlash =
    (isLast5Seconds || isAMinute || is5SecondsAfterMinute) && isRunning;

  const numberDisplay = isLast5Seconds
    ? seconds
    : is5SecondsAfterMinute
      ? Math.floor((seconds + MIN) / MIN)
      : Math.floor(seconds / MIN);
  return (
    <AnimatePresence mode="wait">
      {shouldShowFlash ? (
        <motion.div
          key="numberflash"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.4 }}
          transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
          className="w-full fixed left-0 top-0 h-full z-10 pointer-events-none"
        >
          <p
            className={`${getColorByTime(seconds)} grid h-screen place-items-center text-[30rem] font-extrabold tracking-widest drop-shadow-2xl`}
          >
            {numberDisplay}
          </p>
        </motion.div>
      ) : (
        <span></span>
      )}
    </AnimatePresence>
  );
};

export default NumberFlash;
