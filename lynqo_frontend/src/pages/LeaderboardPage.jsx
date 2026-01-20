import React, { useState, useEffect } from 'react';
import { gamificationService } from '../services/gamificationService';

export default function Leaderboard() {
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    gamificationService.getLeaderboard('weekly').then(setLeaders);
  }, []);

  return (
    <div className="leaderboard">
      <h2>Weekly Leaderboard</h2>
      <ul>
        {leaders.map((l, i) => (
          <li key={l.id}>{i+1}. {l.username} - {l.score} XP</li>
        ))}
      </ul>
    </div>
  );
}
