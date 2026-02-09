import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
// Bootstrap komponensek
import { Container, Row, Col, Card, Spinner, ProgressBar, Button } from 'react-bootstrap';
// CSS importálása
import './DashboardPage.css';

export default function DashboardPage() {
  const { user, token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // --- ADATOK TÁROLÁSA ---
  const [stats, setStats] = useState({ streak: 0, xp: 0, hearts: 5, gems: 0 });
  const [nextLesson, setNextLesson] = useState(null);
  const [quests, setQuests] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- ADATLEKÉRÉS API-BÓL ---
  useEffect(() => {
    const fetchData = async () => {
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const headers = { 'Authorization': `Bearer ${token}` };

        // Párhuzamos lekérés a gyors betöltésért
        const [statsRes, structureRes, questsRes] = await Promise.all([
            fetch('https://localhost:7118/api/User/me', { headers }),
            fetch('https://localhost:7118/api/Lessons/course/1/structure', { headers }),
            fetch('https://localhost:7118/api/Quests/active', { headers })
        ]);

        // 1. Statisztikák (SQL: users tábla)
        if (statsRes.ok) {
            const d = await statsRes.json();
            setStats({
                streak: d.streak || 0,
                xp: d.totalXp || 0,
                hearts: d.hearts || 5,
                gems: d.coins || 0
            });
        }

        // 2. Következő lecke keresése (SQL: user_lessons tábla alapján)
        if (structureRes.ok) {
            const structure = await structureRes.json();
            let found = null;
            for (const unit of structure) {
                for (const lesson of unit.lessons) {
                    if (!lesson.isCompleted) {
                        found = { ...lesson, unitTitle: unit.title, unitDesc: unit.description };
                        break;
                    }
                }
                if (found) break;
            }
            setNextLesson(found);
        }

        // 3. Küldetések (SQL: quests tábla)
        if (questsRes.ok) {
            const qData = await questsRes.json();
            setQuests(qData);
        }

      } catch (err) {
        console.error("Hiba az adatok betöltésekor:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [token]);

  if (loading) return (
    <div className="d-flex justify-content-center align-items-center vh-100 dashboard-container">
        <Spinner animation="border" variant="primary" />
    </div>
  );

  return (
    <div className="dashboard-container">
      <Container>
        
        {/* ÜDVÖZLÉS */}
        <div className="text-center mb-5">
            <h1 className="fw-bold">Welcome back, {user?.username || "Learner"}! 👋</h1>
        </div>

        {/* 1. SOR: 4 STATISZTIKA KÁRTYA */}
        <Row className="g-4 mb-5">
            <Col md={3} xs={6}>
                <Card className="dashboard-card text-center p-3">
                    <Card.Body>
                        <div className="stat-icon">🔥</div>
                        <div className="stat-value" style={{color: '#f59e0b'}}>{stats.streak}</div>
                        <div className="stat-label">Day Streak</div>
                    </Card.Body>
                </Card>
            </Col>
            <Col md={3} xs={6}>
                <Card className="dashboard-card text-center p-3">
                    <Card.Body>
                        <div className="stat-icon">⚡</div>
                        <div className="stat-value" style={{color: '#eab308'}}>{stats.xp}</div>
                        <div className="stat-label">Total XP</div>
                    </Card.Body>
                </Card>
            </Col>
            <Col md={3} xs={6}>
                <Card className="dashboard-card text-center p-3">
                    <Card.Body>
                        <div className="stat-icon">❤️</div>
                        <div className="stat-value" style={{color: '#ef4444'}}>{stats.hearts}</div>
                        <div className="stat-label">Hearts</div>
                    </Card.Body>
                </Card>
            </Col>
            <Col md={3} xs={6}>
                <Card className="dashboard-card text-center p-3">
                    <Card.Body>
                        <div className="stat-icon">💎</div>
                        <div className="stat-value" style={{color: '#0ea5e9'}}>{stats.gems}</div>
                        <div className="stat-label">Gems</div>
                    </Card.Body>
                </Card>
            </Col>
        </Row>

        {/* 2. SOR: FŐ TARTALOM + OLDALSÁV */}
        <Row className="g-4">
            
            {/* BAL OLDAL (Széles): Következő lecke */}
            <Col lg={8}>
                <Card className="dashboard-card p-5 text-center d-flex flex-column justify-content-center" style={{minHeight: '400px'}}>
                    {nextLesson ? (
                        <>
                            <div style={{fontSize: '4rem', marginBottom: '1rem'}}>🚀</div>
                            <h5 className="fw-bold text-uppercase" style={{color: 'var(--text-muted)', fontSize:'0.9rem'}}>
                                {nextLesson.unitTitle}
                            </h5>
                            <h2 className="mb-4 fw-bold">{nextLesson.title}</h2>
                            <p className="mb-5" style={{color: 'var(--text-muted)', fontSize: '1.2rem'}}>
                                {nextLesson.unitDesc}
                            </p>
                            
                            <div>
                                <Link to={`/lessons/${nextLesson.id}`} className="cta-button">
                                    START LESSON
                                </Link>
                            </div>
                        </>
                    ) : (
                        <>
                            <div style={{fontSize: '4rem', marginBottom: '1rem'}}>🎉</div>
                            <h2>Course Complete!</h2>
                            <p>You have finished all available lessons.</p>
                        </>
                    )}
                </Card>
            </Col>

            {/* JOBB OLDAL (Keskeny): Sidebar */}
            <Col lg={4}>
                <div className="d-flex flex-column gap-4">
                    
                    {/* Küldetések */}
                    <Card className="dashboard-card p-4">
                        <h4 className="fw-bold mb-3 text-uppercase" style={{fontSize: '1rem', color: 'var(--text-muted)'}}>
                            📜 Daily Quests
                        </h4>
                        {quests.length === 0 ? (
                            <p className="text-muted fst-italic">No active quests.</p>
                        ) : (
                            <div>
                                {quests.map((q, i) => (
                                    <div key={i} className="quest-item" style={{opacity: q.isCompleted ? 0.5 : 1}}>
                                        <span className="me-3 fs-5">{q.isCompleted ? '✅' : '⬜'}</span>
                                        <div className="w-100">
                                            <div className="d-flex justify-content-between">
                                                <span className="fw-bold" style={{textDecoration: q.isCompleted ? 'line-through' : 'none'}}>
                                                    {q.title}
                                                </span>
                                            </div>
                                            <small className="text-muted d-block mb-1">{q.description}</small>
                                            <ProgressBar now={q.isCompleted ? 100 : 0} variant={q.isCompleted ? "success" : "warning"} style={{height: '6px'}} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </Card>

                    {/* Gyors Linkek */}
                    <Card className="dashboard-card p-4">
                        <h4 className="fw-bold mb-3 text-uppercase" style={{fontSize: '1rem', color: 'var(--text-muted)'}}>
                            Quick Links
                        </h4>
                        <div className="d-grid gap-2">
                            <Link to="/settings" className="quick-link-btn">⚙️ Settings</Link>
                            <Link to="/shop" className="quick-link-btn">🛒 Shop</Link>
                            <Button variant="outline-danger" className="fw-bold mt-2" onClick={() => { logout(); navigate('/main'); }}>
                                🚪 Log Out
                            </Button>
                        </div>
                    </Card>

                </div>
            </Col>
        </Row>
      </Container>
    </div>
  );
}