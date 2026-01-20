import React, { useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useGamification } from '../hooks/useGamification';
import { lessonService } from '../services/lessonService'; // Assume similar

export default function Dashboard() {
  const { user } = useAuth();
  const { streak, hearts, coins, dailyGoal } = useGamification();

  return (
    <div className="dashboard">
      <h1>Welcome, {user?.DisplayName}!</h1>
      <div className="stats-grid">
        <div className="streak-card">Streak: {streak} days 🔥</div>
        <div className="hearts-card">❤️ {hearts} Hearts</div>
        <div className="coins-card">💰 {coins} Coins</div>
        <div className="goal-card">Daily Goal: {dailyGoal}/50 XP</div>
      </div>
      {/* Quick lesson buttons */}
    </div>
  );
}
