import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Container, Row, Col, Card, Spinner, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './MainPage.css';

export default function DashboardPage() {
  const { user, token, logout } = useContext(AuthContext);
  
  // Data States
  const [stats, setStats] = useState(null);
  const [nextLesson, setNextLesson] = useState(null);
  const [quests, setQuests] = useState([]); // <--- NEW: Real Quests
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = { 'Authorization': `Bearer ${token}` };

        // 1. Fetch User Stats
        const statsRes = await fetch('https://localhost:7118/api/User/me', { headers });
        
        // 2. Fetch Course Structure (for Next Lesson)
        const structureRes = await fetch('https://localhost:7118/api/Lessons/course/1/structure', { headers });

        // 3. Fetch Real Daily Quests (NEW)
        const questsRes = await fetch('https://localhost:7118/api/Quests/active', { headers });

        if (statsRes.ok && structureRes.ok) {
          const statsData = await statsRes.json();
          const structureData = await structureRes.json();
          setStats(statsData);

          // Find Next Lesson Logic
          let foundLesson = null;
          for (const unit of structureData) {
            for (const lesson of unit.lessons) {
              if (!lesson.isCompleted) {
                foundLesson = {
                  id: lesson.id,
                  title: lesson.title,
                  unitTitle: unit.title,
                  unitDesc: unit.description
                };
                break;
              }
            }
            if (foundLesson) break;
          }
          setNextLesson(foundLesson);
        }

        // Handle Quests
        if (questsRes.ok) {
          const questsData = await questsRes.json();
          setQuests(questsData);
        }

      } catch (err) {
        console.error("Failed to load dashboard data", err);
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchData();
  }, [token]);

  if (loading) return (
    <div className="d-flex justify-content-center align-items-center" style={{height: '80vh'}}>
        <Spinner animation="border" variant="primary" />
    </div>
  );

  const displayUser = stats || user;

  const cardStyle = {
    borderRadius: 'var(--border-radius)',
    border: 'none',
    boxShadow: 'var(--shadow)',
    background: 'white',
    overflow: 'hidden',
    transition: 'var(--transition)'
  };

  return (
    <Container className="main-page-container mt-5">
      {/* Header */}
      <div className="text-center mb-5">
        <h1 className="hero-title" style={{fontSize: '2.5rem'}}>
            Welcome back, {displayUser?.username || 'Learner'}! 👋
        </h1>
      </div>

      {/* Stats Row */}
      <Row className="mb-5 g-4">
        {[
            { icon: '🔥', val: displayUser?.streak || 0, label: 'Day Streak', color: '#ff9600' },
            { icon: '⚡', val: displayUser?.totalXp || 0, label: 'Total XP', color: '#eab308' },
            { icon: '❤️', val: `${displayUser?.hearts || 5} / 5`, label: 'Hearts', color: '#ef4444' },
            { icon: '💎', val: displayUser?.coins || 0, label: 'Gems', color: '#0ea5e9' }
        ].map((item, idx) => (
            <Col md={3} xs={6} key={idx}>
                <Card style={cardStyle} className="h-100 text-center py-4">
                    <Card.Body>
                        <div style={{fontSize: '2.5rem', marginBottom: '10px'}}>{item.icon}</div>
                        <h3 style={{color: item.color, fontWeight: '800'}}>{item.val}</h3>
                        <span className="text-muted fw-bold">{item.label}</span>
                    </Card.Body>
                </Card>
            </Col>
        ))}
      </Row>

      <Row className="g-4">
        {/* Next Lesson Card */}
        <Col lg={8}>
          <Card style={cardStyle} className="p-5 h-100 text-center d-flex flex-column justify-content-center">
            {nextLesson ? (
                <>
                    <h5 className="text-muted text-uppercase fw-bold mb-3">
                        {nextLesson.unitTitle}
                    </h5>
                    <h2 className="mb-4 fw-bold" style={{color: 'var(--gradient-purple)', fontSize: '2.5rem'}}>
                        {nextLesson.title}
                    </h2>
                    <p className="mb-5 text-muted" style={{fontSize: '1.2rem'}}>
                        {nextLesson.unitDesc}
                    </p>
                    <div className="d-grid gap-3 col-md-8 mx-auto">
                        <Link to={`/lessons/${nextLesson.id}`} className="cta-button primary text-center">
                            🚀 Start Lesson
                        </Link>
                    </div>
                </>
            ) : (
                <>
                    <h2>🎉 Course Complete!</h2>
                    <p>You have finished all available lessons.</p>
                </>
            )}
          </Card>
        </Col>
        
        {/* Sidebar */}
        <Col lg={4}>
            {/* REAL Daily Quests from DB */}
            <Card style={cardStyle} className="p-4 mb-4">
                <h4 className="fw-bold mb-3">📜 Daily Quests</h4>
                
                {quests.length === 0 ? (
                    <p className="text-muted">No active quests today.</p>
                ) : (
                    <ul className="list-unstyled">
                        {quests.map((q, i) => (
                            <li key={i} className="d-flex align-items-center mb-3 p-2 rounded" 
                                style={{
                                    background: q.isCompleted ? '#ecfdf5' : '#f8fafc', 
                                    border: '1px solid #e2e8f0'
                                }}>
                                <span className="me-2 fs-5">{q.isCompleted ? '✅' : '⬜'}</span>
                                <div>
                                    <div style={{
                                        textDecoration: q.isCompleted ? 'line-through' : 'none', 
                                        color: q.isCompleted ? '#10b981' : 'inherit',
                                        fontWeight: 'bold'
                                    }}>
                                        {q.title}
                                    </div>
                                    <small className="text-muted">{q.description}</small>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </Card>

            {/* Quick Links & Logout */}
            <Card style={cardStyle} className="p-3">
                <small className="text-muted fw-bold text-uppercase mb-2 d-block">Quick Links</small>
                <div className="d-flex flex-wrap gap-2 mb-3">
                    <Link to="/settings" className="btn btn-sm btn-outline-secondary">⚙️ Settings</Link>
                    <Link to="/shop" className="btn btn-sm btn-outline-secondary">🛒 Shop</Link>
                    <Link to="/friends" className="btn btn-sm btn-outline-secondary">👥 Friends</Link>
                </div>
                <Button 
                    variant="outline-danger" 
                    size="sm" 
                    className="w-100 fw-bold"
                    onClick={() => logout()}
                >
                    🚪 Log Out
                </Button>
            </Card>
        </Col>
      </Row>
    </Container>
  );
}
