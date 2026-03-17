import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Container, Card, Spinner, Dropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next"; // ÚJ
import './LeaderboardPage.css';

import BackButton from '../components/common/BackButton';

const LEAGUE_COLORS = {
    "Bronze": "#00bcf5",
    "Copper": "#b87333",
    "Silver": "#c0c0c0",
    "Gold":   "#ffd700",
    "Emerald":"#50c878",
    "Obsidian":"#4b0082",
    "Diamond":"#b9f2ff",
    "Global": "#8c52ff"
};

export default function LeaderboardPage() {
    const { t } = useTranslation(); // ÚJ
    const { token, user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    
    const [leaders, setLeaders] = useState([]);
    const [currentLeague, setCurrentLeague] = useState("Bronze");
    const [loading, setLoading] = useState(true);
    const [timeframe, setTimeframe] = useState('weekly');
    const [imgErrors, setImgErrors] = useState({});

    const [viewingLeague, setViewingLeague] = useState(null); 

    useEffect(() => {
        if (!token) return;

        const fetchLeaderboard = async () => {
            setLoading(true);
            try {
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

    const activeColor = LEAGUE_COLORS[viewingLeague] || "#00bcf5";

    return (
        <Container className="leaderboard-container">
            
            <BackButton wrapperClass="d-flex justify-content-start w-100 mb-4" />

            <div className="leaderboard-header d-flex flex-column align-items-center mb-4">
                <h1 className="leaderboard-title m-0 mb-2">{t('leaderboard.title')}</h1>
                
                <Dropdown>
                    <Dropdown.Toggle 
                        id="league-dropdown"
                        className="league-dropdown-badge"
                        style={{ backgroundColor: activeColor }}
                    >
                        {t(`leaderboard.leagues.${viewingLeague}`)} {viewingLeague !== "Global" ? t('leaderboard.leagueSuffix') : t('leaderboard.leaderboardSuffix')}
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="league-dropdown-menu text-center">
                        <Dropdown.Header>{t('leaderboard.selectLeague')}</Dropdown.Header>
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
                                {t(`leaderboard.leagues.${leagueName}`)} {leagueName !== "Global" ? t('leaderboard.leagueSuffix') : t('leaderboard.leaderboardSuffix')}
                            </Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>
            </div>

            <div className="leaderboard-toggle mb-4">
                <button
                    className={`toggle-btn ${timeframe === 'weekly' ? 'btn-primary' : ''}`}
                    onClick={() => {
                        setTimeframe('weekly');
                        setViewingLeague(currentLeague);
                    }}
                >
                    {t('leaderboard.thisWeek')}
                </button>
                <button
                    className={`toggle-btn ${timeframe === 'global' ? 'btn-primary' : ''}`}
                    onClick={() => {
                        setTimeframe('global');
                        setViewingLeague("Global");
                    }}
                >
                    {t('leaderboard.allTime')}
                </button>
            </div>

            {loading ? (
                <div className="text-center p-5"><Spinner animation="border" variant="primary" /></div>
            ) : (
                <Card className="leaderboard-card">
                    <table className="leaderboard-table mb-0 text-center w-100">
                        <thead>
                            <tr>
                                <th>{t('leaderboard.rank')}</th>
                                <th className="text-start ps-4">{t('leaderboard.learner')}</th>
                                <th>{t('leaderboard.xp')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {leaders.length === 0 ? (
                                <tr>
                                    <td colSpan="3" className="p-5 text-muted">
                                        {t('leaderboard.noData')}
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
                                                    <span className="current-user-badge">{t('leaderboard.you')}</span>
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