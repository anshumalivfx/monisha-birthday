import { useState, useEffect, useCallback } from 'react';

export const useGameTimer = (isActive: boolean = true, onTimeUp?: () => void) => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive]);

  const reset = useCallback(() => {
    setTime(0);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return { time, reset, formatTime };
};
