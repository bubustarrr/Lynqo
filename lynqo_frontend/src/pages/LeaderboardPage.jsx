import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Container, Card, Spinner, Dropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './LeaderboardPage.css';

// Itt importáljuk az univerzális Vissza gombot
import BackButton from '../components/common/BackButton';

// Mapping leagues to colors for styling the badge
const LEAGUE_COLORS = {
    "Bronze": "#00bcf5", // The bright blue in your screenshot
    "Copper": "#b87333",
    "Silver": "#c0c0c0",
    "Gold":   "#ffd700",
    "Emerald":"#50c878",
    "Obsidian":"#4b0082",
    "Diamond":"#b9f2ff",
    "Global": "#8c52ff" // A purple for global
};

export default function LeaderboardPage() {
    const { token, user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    
    const [leaders, setLeaders] = useState([]);
    const [currentLeague, setCurrentLeague] = useState("Bronze");
    const [loading, setLoading] = useState(true);
    const [timeframe, setTimeframe] = useState('weekly');
    const [imgErrors, setImgErrors] = useState({});

    // This lets the user look at other leagues even if they aren't in them
    const [viewingLeague, setViewingLeague] = useState(null); 

    useEffect(() => {
        if (!token) return;

        const fetchLeaderboard = async () => {
            setLoading(true);
            try {
                // If they are viewing a specific league from the dropdown, send it as a query param
                const url = viewingLeague && timeframe === 'weekly' 
                    ? `https://localhost:7118/api/Leaderboard/${timeframe}?league=${viewingLeague}`
                    : `https://localhost:7118/api/Leaderboard/${timeframe}`;

                const res = await fetch(url, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                if (res.status === 401) {
                    logout();
                    navigate('/login');
                    return;
                }

                if (res.ok) {
                    const data = await res.json();
                    
                    if (timeframe === 'weekly') {
                        setLeaders(data.leaderboard);
                        setCurrentLeague(data.league);
                        // If viewingLeague is null, default to their actual league
                        if (!viewingLeague) setViewingLeague(data.league);
                    } else {
                        setLeaders(data);
                        setViewingLeague("Global");
                    }
                }
            } catch (err) {
                console.error("Leaderboard error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchLeaderboard();
    }, [token, timeframe, viewingLeague, logout, navigate]);

    const getRankDisplay = (rank) => {
        if (rank === 1) return '🥇';
        if (rank === 2) return '🥈';
        if (rank === 3) return '🥉';
        return rank;
    };

    const isCurrentUser = (learner) =>
        learner.username?.toLowerCase() === user?.username?.toLowerCase();

    const getZoneRowClass = (zone) => {
        if (timeframe === 'global') return '';
        if (zone === "Promotion" || zone === "Champion") return 'zone-promotion';
        if (zone === "Demotion") return 'zone-demotion';
        return 'zone-safe';
    };

    // Use selected league color, default to blue
    const activeColor = LEAGUE_COLORS[viewingLeague] || "#00bcf5";

    return (
        <Container className="leaderboard-container">
            
            <BackButton wrapperClass="d-flex justify-content-start w-100 mb-4" />

            <div className="leaderboard-header d-flex flex-column align-items-center mb-4">
                <h1 className="leaderboard-title m-0 mb-2">🏆 Leaderboard</h1>
                
                {/* The Dropdown replacing the static Bronze League text */}
                <Dropdown>
                    <Dropdown.Toggle 
                        id="league-dropdown"
                        className="league-dropdown-badge"
                        style={{ backgroundColor: activeColor }}
                    >
                        {viewingLeague} {viewingLeague !== "Global" ? "League" : "Leaderboard"}
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="league-dropdown-menu text-center">
                        <Dropdown.Header>Select League</Dropdown.Header>
                        {Object.keys(LEAGUE_COLORS).map((leagueName) => (
                            <Dropdown.Item 
                                key={leagueName}
                                active={viewingLeague === leagueName}
                                onClick={() => {
                                    setViewingLeague(leagueName);
                                    if (leagueName === "Global") {
                                        setTimeframe("global");
                                    } else {
                                        setTimeframe("weekly");
                                    }
                                }}
                            >
                                {leagueName} {leagueName !== "Global" ? "League" : "Leaderboard"}
                            </Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>
            </div>

            {/* Your original toggle buttons */}
            <div className="leaderboard-toggle mb-4">
                <button
                    className={`toggle-btn ${timeframe === 'weekly' ? 'btn-primary' : ''}`}
                    onClick={() => {
                        setTimeframe('weekly');
                        setViewingLeague(currentLeague); // Reset to their actual league
                    }}
                >
                    This Week
                </button>
                <button
                    className={`toggle-btn ${timeframe === 'global' ? 'btn-primary' : ''}`}
                    onClick={() => {
                        setTimeframe('global');
                        setViewingLeague("Global");
                    }}
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
                                        className={`
                                            ${isCurrentUser(learner) ? 'current-user-row' : ''} 
                                            ${getZoneRowClass(learner.zone)}
                                        `}
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
