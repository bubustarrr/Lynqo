import React, { createContext, useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';

export const GamificationContext = createContext();

export const GamificationProvider = ({ children }) => {
  const { user } = useAuth();
  const [streak, setStreak] = useState(0);
  const [coins, setCoins] = useState(0);
  const [hearts, setHearts] = useState(5);
  const [dailyGoal, setDailyGoal] = useState(0); // XP needed

  useEffect(() => {
    if (user) {
      // Fetch from /api/gamification/{user.id}
      fetchGamification();
    }
  }, [user]);

  const fetchGamification = async () => {
    // Implement API call
  };

  const updateHearts = (newHearts) => setHearts(Math.max(0, newHearts));
  const addCoins = (amount) => setCoins(coins + amount);

  return (
    <GamificationProvider value={{ streak, coins, hearts, dailyGoal, updateHearts, addCoins }}>
      {children}
    </GamificationProvider>
  );
};
