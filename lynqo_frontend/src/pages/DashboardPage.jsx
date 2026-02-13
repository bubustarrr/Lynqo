import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Container, Row, Col, Card, Spinner, ProgressBar, Button } from 'react-bootstrap';
import './DashboardPage.css';

export default function DashboardPage() {
  const { user, token, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const { courseId } = useParams();
  
  // Default to course 1 (or handle redirect if undefined)
  const activeCourseId = courseId || 1;

  // --- DATA STATE ---
  const [stats, setStats] = useState({ streak: 0, xp: 0, hearts: 5, gems: 0 });
  const [nextLesson, setNextLesson] = useState(null);
  const [quests, setQuests] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- FETCH DATA FROM API ---
  useEffect(() => {
    const fetchData = async () => {
      if (!token) return;

      try {
        const headers = { 'Authorization': `Bearer ${token}` };

        // Parallel Fetch
        const [userRes, structureRes, questsRes] = await Promise.all([
            // 🔥 FIXED: Singular 'User' based on your screenshot
            fetch('https://localhost:7118/api/User/me', { headers }),
            fetch(`https://localhost:7118/api/Lessons/course/${activeCourseId}/structure`, { headers }),
            fetch('https://localhost:7118/api/Quests/active', { headers }) // Assuming this exists or returns []
        ]);

        // 1. User Stats
        if (userRes.ok) {
            const userData = await userRes.json();
            // Handle both PascalCase (C#) and camelCase (JSON default)
            setStats({
                streak: userData.streak || userData.Streak || 0,
                xp: userData.totalXp || userData.TotalXp || 0,
                hearts: (userData.hearts !== undefined) ? userData.hearts : (userData.Hearts || 5),
                gems: userData.coins || userData.Coins || 0 
            });
        } else {
            console.error("Failed to fetch User stats:", userRes.status);
        }

        // 2. Course Structure -> Next Lesson
        if (structureRes.ok) {
            const structure = await structureRes.json();
            let found = null;
            // Find first incomplete lesson
            for (const unit of structure) {
                if (unit.lessons) {
                    for (const lesson of unit.lessons) {
                        if (!lesson.isCompleted) {
                            found = { 
                                ...lesson, 
                                unitTitle: unit.title, 
                                unitDesc: unit.description 
                            };
                            break; 
                        }
                    }
                }
                if (found) break;
            }
            setNextLesson(found);
        }

        // 3. Quests
        if (questsRes.ok) {
            const qData = await questsRes.json();
            setQuests(qData);
        }

      } catch (err) {
        console.error("Error loading dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token, activeCourseId]);

  if (loading) return (
    <div className="d-flex justify-content-center align-items-center vh-100 dashboard-container">
        <Spinner animation="border" variant="primary" />
    </div>
  );

  return (
    <div className="dashboard-container">
      <Container>
        <div className="text-center mb-5">
            <h1 className="fw-bold">Welcome back, {user?.username || "Learner"}! 👋</h1>
        </div>

        {/* Stats Row */}
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

        {/* Main Content */}
        <Row className="g-4">
            <Col lg={8}>
                <Card className="dashboard-card p-5 text-center d-flex flex-column justify-content-center" style={{minHeight: '400px'}}>
                    {nextLesson ? (
                        <>
                            <div style={{fontSize: '4rem', marginBottom: '1rem'}}>🚀</div>
                            <h5 className="fw-bold text-uppercase text-muted" style={{fontSize:'0.9rem'}}>{nextLesson.unitTitle}</h5>
                            <h2 className="mb-4 fw-bold">{nextLesson.title}</h2>
                            <p className="mb-5 text-muted" style={{fontSize: '1.2rem'}}>{nextLesson.unitDesc}</p>
                            
                            <Link 
                                to={`/course/${activeCourseId}/lesson/${nextLesson.id}`} 
                                className="cta-button"
                            >
                                START LESSON
                            </Link>
                        </>
                    ) : (
                        <>
                            <div style={{fontSize: '4rem', marginBottom: '1rem'}}>🎉</div>
                            <h2>Course Complete!</h2>
                            <p>You have finished all available lessons.</p>
                            <Link to="/pick-language" className="btn btn-primary mt-3">Start New Course</Link>
                        </>
                    )}
                </Card>
            </Col>

            <Col lg={4}>
                <Card className="dashboard-card p-4">
                    <h4 className="fw-bold mb-3 text-uppercase text-muted" style={{fontSize: '1rem'}}>Quick Links</h4>
                    <div className="d-grid gap-2">
                        <Link to="/pick-language" className="quick-link-btn">🌍 Change Course</Link>
                        <Link to="/shop" className="quick-link-btn">🛒 Shop</Link>
                        <Button variant="outline-danger" onClick={() => { logout(); navigate('/main'); }}>Log Out</Button>
                    </div>
                </Card>
            </Col>
        </Row>
      </Container>
    </div>
  );
}
