import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TimerDisplayProps } from "../types";
import { DEFAULT_TIMER_SECONDS } from "../utils/timeUtils";

export interface NumberFlashProps {
  seconds: number;
  isRunning: boolean;
}

const NumberFlash: React.FC<NumberFlashProps> = ({ seconds, isRunning }) => {
  return (
    <AnimatePresence mode="wait">
      {seconds % 60 == 0 && seconds != DEFAULT_TIMER_SECONDS && isRunning ? (
        <motion.div
          key="numberflash"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.4 }}
          transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
          className="w-full fixed left-0 top-0 h-full z-10 pointer-events-none"
        >
          <p className="grid h-screen place-items-center text-[30rem] text-primary-600 font-extrabold tracking-widest drop-shadow-2xl">
            {seconds / 60}
          </p>
        </motion.div>
      ) : (
        <span></span>
      )}
    </AnimatePresence>
  );
};

export default NumberFlash;
