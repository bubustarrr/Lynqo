import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Container, Card, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './LeaderboardPage.css';

// Itt importáljuk az univerzális Vissza gombot
import BackButton from '../components/common/BackButton';

export default function LeaderboardPage() {
    const { token, user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [leaders, setLeaders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [timeframe, setTimeframe] = useState('weekly');
    const [imgErrors, setImgErrors] = useState({});

    useEffect(() => {
        if (!token) return;

        const fetchLeaderboard = async () => {
            setLoading(true);
            try {
                const res = await fetch(`https://localhost:7118/api/Leaderboard/${timeframe}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                if (res.status === 401) {
                    logout();
                    navigate('/login');
                    return;
                }

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
    }, [token, timeframe, logout, navigate]);

    const getRankDisplay = (rank) => {
        if (rank === 1) return '🥇';
        if (rank === 2) return '🥈';
        if (rank === 3) return '🥉';
        return rank;
    };

    const isCurrentUser = (learner) =>
        learner.username?.toLowerCase() === user?.username?.toLowerCase();

    return (
        <Container className="leaderboard-container">
            
            {/* Itt hívjuk meg a gombot, balra igazítva, a "Back" szöveggel */}
            <BackButton 
                
                wrapperClass="d-flex justify-content-start w-100 mb-4" 
            />

            <div className="leaderboard-header d-flex justify-content-center">
                <h1 className="leaderboard-title">🏆 Leaderboard</h1>
            </div>

            <div className="leaderboard-toggle">
                <button
                    className={`toggle-btn ${timeframe === 'weekly' ? 'btn-primary' : ''}`}
                    onClick={() => setTimeframe('weekly')}
                >
                    This Week
                </button>
                <button
                    className={`toggle-btn ${timeframe === 'global' ? 'btn-primary' : ''}`}
                    onClick={() => setTimeframe('global')}
                >
                    All Time
                </button>
            </div>

            {loading ? (
                <div className="text-center p-5"><Spinner animation="border" variant="primary" /></div>
            ) : (
                <Card className="leaderboard-card">
                    <table className="leaderboard-table mb-0 text-center w-100">
                        <thead>
                            <tr>
                                <th>Rank</th>
                                <th className="text-start ps-4">Learner</th>
                                <th>XP</th>
                            </tr>
                        </thead>
                        <tbody>
                            {leaders.length === 0 ? (
                                <tr>
                                    <td colSpan="3" className="p-5 text-muted">
                                        No data yet. Start learning!
                                    </td>
                                </tr>
                            ) : (
                                leaders.map((learner) => (
                                    <tr
                                        key={learner.id}
                                        className={isCurrentUser(learner) ? 'current-user-row' : ''}
                                    >
                                        <td className="rank-cell">
                                            {getRankDisplay(learner.rank)}
                                        </td>
                                        <td className="learner-cell">
                                            <div className="learner-info">
                                                {learner.profilePicUrl && !imgErrors[learner.id] ? (
                                                    <img
                                                        src={
                                                            learner.profilePicUrl.startsWith('http')
                                                                ? learner.profilePicUrl
                                                                : `https://localhost:7118/${learner.profilePicUrl}`
                                                        }
                                                        alt=""
                                                        className="avatar-img"
                                                        onError={() => setImgErrors(prev => ({ ...prev, [learner.id]: true }))}
                                                    />
                                                ) : (
                                                    <div className="avatar-placeholder">
                                                        {learner.displayName?.[0]?.toUpperCase() ?? '?'}
                                                    </div>
                                                )}
                                                <span className="learner-name">{learner.displayName}</span>
                                                {isCurrentUser(learner) && (
                                                    <span className="current-user-badge">YOU</span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="xp-cell">{learner.xp.toLocaleString()} XP</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </Card>
            )}
            <div className="spacer-bottom"></div>
        </Container>
    );
}