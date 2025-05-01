import { useState, useEffect, useCallback, useRef } from 'react';
import { TimerState } from '../types';
import { DEFAULT_TIMER_SECONDS, TIME_INCREMENT } from '../utils/timeUtils';

export const useTimer = () => {
  const [seconds, setSeconds] = useState(DEFAULT_TIMER_SECONDS);
  const [timerState, setTimerState] = useState<TimerState>('idle');
  const intervalRef = useRef<number | null>(null);

  // Clean up the interval when component unmounts
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Timer countdown logic
  useEffect(() => {
    if (timerState === 'running') {
      intervalRef.current = window.setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds <= 1) {
            clearInterval(intervalRef.current!);
            setTimerState('completed');
            return 0;
          }
          return prevSeconds - 1;
        });
      }, 1000);
    } else if (timerState === 'paused' && intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [timerState]);

  const startTimer = useCallback(() => {
    setTimerState('running');
  }, []);

  const pauseTimer = useCallback(() => {
    setTimerState('paused');
  }, []);

  const resumeTimer = useCallback(() => {
    setTimerState('running');
  }, []);

  const resetTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setSeconds(DEFAULT_TIMER_SECONDS);
    setTimerState('idle');
  }, []);

  const addTime = useCallback(() => {
    setSeconds((prevSeconds) => prevSeconds + TIME_INCREMENT);
  }, []);

  const togglePauseResume = useCallback(() => {
    if (timerState === 'running') {
      pauseTimer();
    } else if (timerState === 'paused' || timerState === 'idle') {
      resumeTimer();
    }
  }, [timerState, pauseTimer, resumeTimer]);

  return {
    seconds,
    timerState,
    isRunning: timerState === 'running',
    isPaused: timerState === 'paused',
    isCompleted: timerState === 'completed',
    startTimer,
    pauseTimer,
    resumeTimer,
    resetTimer,
    addTime,
    togglePauseResume,
  };
};