import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Container, Table, Card, Spinner, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './LeaderboardPage.css'; 

export default function LeaderboardPage() {
    const { token, user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [leaders, setLeaders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [timeframe, setTimeframe] = useState('weekly');

    useEffect(() => {
        const fetchLeaderboard = async () => {
            setLoading(true);
            try {
                const res = await fetch(`https://localhost:7118/api/Leaderboard/${timeframe}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (res.ok) {
                    const data = await res.json();
                    setLeaders(data);
                }
            } catch (err) {
                console.error("Leaderboard error:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchLeaderboard();
    }, [token, timeframe]);


    console.log("My User ID:", user?.id, typeof user?.id);
console.log("Leader ID:", leaders[0]?.id, typeof leaders[0]?.id);

    return (
        <Container className="leaderboard-container">
            <div className="leaderboard-header">
                <Button variant="link" onClick={() => navigate(-1)} className="back-button">
                    ← Back
                </Button>
                <h1 className="leaderboard-title">🏆 Leaderboard</h1>
                <div style={{width: '80px'}}></div>
            </div>

            <div className="leaderboard-toggle">
                <Button 
                    variant={timeframe === 'weekly' ? 'primary' : 'outline-primary'} 
                    onClick={() => setTimeframe('weekly')}
                    className="toggle-btn"
                >
                    This Week
                </Button>
                <Button 
                    variant={timeframe === 'global' ? 'primary' : 'outline-primary'} 
                    onClick={() => setTimeframe('global')}
                    className="toggle-btn"
                >
                    All Time
                </Button>
            </div>

            {loading ? (
                <div className="text-center p-5"><Spinner animation="border" variant="primary" /></div>
            ) : (
                <Card className="leaderboard-card">
                    <Table hover className="leaderboard-table mb-0 text-center">
                        <thead>
                            <tr>
                                <th>Rank</th>
                                <th className="text-start ps-4">Learner</th>
                                <th>XP</th>
                            </tr>
                        </thead>
                        <tbody>
                            {leaders.map((learner) => (
                                <tr key={learner.id} className={learner.username === user?.username ? "current-user-row" : ""}>
                                    <td className="rank-cell">
                                        {learner.rank === 1 ? '🥇' : learner.rank === 2 ? '🥈' : learner.rank === 3 ? '🥉' : learner.rank}
                                    </td>
                                    <td className="learner-cell">
                                        <div className="learner-info">
                                            {learner.profilePicUrl ? (
                                                <img src={learner.profilePicUrl} alt="" className="avatar-img" />
                                            ) : (
                                                <div className="avatar-placeholder">
                                                    {learner.username[0].toUpperCase()}
                                                </div>
                                            )}
                                            <span>{learner.displayName || learner.username}</span>
                                            {learner.username === user?.username && <span className="current-user-badge">YOU</span>}
                                        </div>
                                    </td>
                                    <td className="xp-cell">{learner.xp} XP</td>
                                </tr>
                            ))}
                            {leaders.length === 0 && (
                                <tr><td colSpan="3" className="p-5 text-muted">No data yet. Start learning!</td></tr>
                            )}
                        </tbody>
                    </Table>
                </Card>
            )}
            <div className="spacer-bottom"></div>
        </Container>
    );
}

