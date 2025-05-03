import React, { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import StartScreen from "./components/StartScreen";
import PromptScreen from "./components/PromptScreen";
import { AppState } from "./types";
import { useTimer } from "./hooks/useTimer";
import { usePromptsManager } from "./hooks/usePromptsManager";

function App() {
  const [appState, setAppState] = useState<AppState>("start");

  // Initialize timer and prompts hooks
  const {
    seconds,
    isRunning,
    isPaused,
    isCompleted,
    startTimer,
    resetTimer,
    addTime,
    togglePauseResume,
  } = useTimer();

  const {
    currentPrompt,
    hasUploadedFile,
    loadPromptsFromCSV,
    selectNewPrompt,
  } = usePromptsManager();

  // Start the prompt session
  const handleStart = useCallback(() => {
    setAppState("prompt");
    startTimer();
  }, [startTimer]);

  const handleFileLoaded = useCallback(
    (csvContent: string) => {
      loadPromptsFromCSV(csvContent);
    },
    [loadPromptsFromCSV],
  );

  // Fetch file from /assets/file.csv
  useEffect(() => {
    fetch("/assets/file.csv")
      .then((response) => {
        if (!response.ok) throw new Error("Failed to load CSV file");
        return response.text();
      })
      .then((csvContent) => {
        handleFileLoaded(csvContent);
      })
      .catch((error) => {
        console.error("Error loading CSV:", error);
      });
  }, [handleFileLoaded]);

  // Handle getting a new prompt
  const handleNewPrompt = useCallback(() => {
    selectNewPrompt();
    resetTimer();
    setTimeout(() => {
      startTimer();
    }, 0);
  }, [selectNewPrompt, resetTimer, startTimer]);

  // Render the appropriate screen based on app state
  return (
    <div className="min-h-screen bg-gray-50">
      <AnimatePresence mode="wait">
        {appState === "start" ? (
          <motion.div
            key="start-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <StartScreen onStart={handleStart} />
          </motion.div>
        ) : (
          <motion.div
            key="prompt-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <PromptScreen
              prompt={currentPrompt}
              onPauseResume={togglePauseResume}
              onAddTime={addTime}
              onNewPrompt={handleNewPrompt}
              seconds={seconds}
              isRunning={isRunning}
              isPaused={isPaused}
              isCompleted={isCompleted}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;

