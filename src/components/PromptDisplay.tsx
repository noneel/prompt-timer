import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Prompt } from "../types";
import confetti from "canvas-confetti";

interface PromptDisplayProps {
  prompt: Prompt;
  isCompleted: boolean;
}

const PromptDisplay: React.FC<PromptDisplayProps> = ({
  prompt,
  isCompleted,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const prevCompletedRef = useRef<boolean>(false);

  // Trigger confetti when isCompleted changes from false to true
  useEffect(() => {
    // Only trigger when transitioning from incomplete to complete
    if (isCompleted && !prevCompletedRef.current) {
      if (!containerRef.current) return;

      // Get the component's position for accurate confetti origin
      const rect = containerRef.current.getBoundingClientRect();

      // Calculate the origin position (middle-bottom of component)
      const x = (rect.left + rect.right) / 2 / window.innerWidth;
      const y = rect.bottom / window.innerHeight;

      // Fire the confetti
      confetti({
        particleCount: 200,
        spread: 90,
        origin: { x, y: y + 0.1 },
        colors: [
          "#ff0000",
          "#00ff00",
          "#0000ff",
          "#ffff00",
          "#ff00ff",
          "#00ffff",
        ],
        zIndex: 1000,
        disableForReducedMotion: true,
      });
    }

    // Update the ref to track the current value
    prevCompletedRef.current = isCompleted;
  }, [isCompleted]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={prompt.prompt}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`w-full max-w-2xl mx-auto ${isCompleted ? "mt-12" : ""}`}
        ref={containerRef}
      >
        <div className="bg-white rounded-xl shadow-md p-8 sm:p-10">
          <h2 className="text-sm font-semibold text-primary-600 uppercase tracking-wider mb-2">
            Your Prompt
          </h2>
          <p className="text-xl sm:text-2xl text-gray-800 font-medium leading-relaxed">
            {prompt.prompt}
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PromptDisplay;

