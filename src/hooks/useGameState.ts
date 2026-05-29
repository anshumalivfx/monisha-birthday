import { useState, useCallback } from 'react';

export interface GameScore {
  score: number;
  timeElapsed: number;
  completed: boolean;
  reward: string;
}

export const useGameState = (initialScore: number = 0) => {
  const [score, setScore] = useState(initialScore);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [reward, setReward] = useState('');

  const updateScore = useCallback((newScore: number) => {
    setScore(newScore);
  }, []);

  const addScore = useCallback((points: number) => {
    setScore((prev) => prev + points);
  }, []);

  const completeGame = useCallback(
    (rewardName: string) => {
      setIsCompleted(true);
      setReward(rewardName);
    },
    []
  );

  const reset = useCallback(() => {
    setScore(initialScore);
    setTimeElapsed(0);
    setIsCompleted(false);
    setReward('');
  }, [initialScore]);

  return {
    score,
    timeElapsed,
    isCompleted,
    reward,
    updateScore,
    addScore,
    completeGame,
    reset,
    setTimeElapsed,
  };
};
