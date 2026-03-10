import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Container, Row, Col, Card, Spinner, ProgressBar } from 'react-bootstrap';
import { Globe, ShoppingCart, Trophy } from 'lucide-react';
import './DashboardPage.css';

export default function DashboardPage() {
  const { user, token, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const { courseId } = useParams();

  const activeCourseId = courseId || 1;

  const [stats, setStats] = useState({ streak: 0, xp: 0, hearts: 5, gems: 0 });
  const [nextLesson, setNextLesson] = useState(null);
  const [quests, setQuests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;

    const fetchData = async () => {
      try {
        const headers = { 'Authorization': `Bearer ${token}` };

        const [userRes, structureRes, questsRes] = await Promise.all([
          fetch('https://localhost:7118/api/User/me', { headers }),
          fetch(`https://localhost:7118/api/Lessons/course/${activeCourseId}/structure`, { headers }),
          fetch('https://localhost:7118/api/Quests/active', { headers })
        ]);

        if (userRes.status === 401) {
          logout();
          navigate('/login');
          return;
        }

        if (userRes.ok) {
          const userData = await userRes.json();
          setStats({
            streak: userData.streak || userData.Streak || 0,
            xp: userData.totalXp || userData.TotalXp || 0,
            hearts: userData.hearts !== undefined ? userData.hearts : (userData.Hearts || 5),
            gems: userData.coins || userData.Coins || 0,
          });
        }

        if (structureRes.ok) {
          const structure = await structureRes.json();
          let found = null;
          for (const unit of structure) {
            if (unit.lessons) {
              for (const lesson of unit.lessons) {
                if (!lesson.isCompleted) {
                  found = { ...lesson, unitTitle: unit.title, unitDesc: unit.description };
                  break;
                }
              }
            }
            if (found) break;
          }
          setNextLesson(found);
        }

        if (questsRes.ok) {
           const questsData = await questsRes.json();
           setQuests(questsData);
        }

      } catch (err) {
        console.error("Error loading dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token, activeCourseId, logout, navigate]);

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
                <div className="stat-value" style={{ color: '#f59e0b' }}>{stats.streak}</div>
                <div className="stat-label">Day Streak</div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3} xs={6}>
            <Card className="dashboard-card text-center p-3">
              <Card.Body>
                <div className="stat-icon">⚡</div>
                <div className="stat-value" style={{ color: '#eab308' }}>{stats.xp}</div>
                <div className="stat-label">Total XP</div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3} xs={6}>
            <Card className="dashboard-card text-center p-3">
              <Card.Body>
                <div className="stat-icon">❤️</div>
                <div className="stat-value" style={{ color: '#ef4444' }}>{stats.hearts}</div>
                <div className="stat-label">Hearts</div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3} xs={6}>
            <Card className="dashboard-card text-center p-3">
              <Card.Body>
                <div className="stat-icon">💎</div>
                <div className="stat-value" style={{ color: '#0ea5e9' }}>{stats.gems}</div>
                <div className="stat-label">Gems</div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Main Content */}
        <Row className="g-4">
          <Col lg={8}>
            <Card className="dashboard-card p-5 text-center d-flex flex-column justify-content-center mb-4" style={{ minHeight: '400px' }}>
              {nextLesson ? (
                <>
                  <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🚀</div>
                  <h5 className="fw-bold text-uppercase text-muted" style={{ fontSize: '0.9rem' }}>{nextLesson.unitTitle}</h5>
                  <h2 className="mb-4 fw-bold">{nextLesson.title}</h2>
                  <p className="mb-5 text-muted" style={{ fontSize: '1.2rem' }}>{nextLesson.unitDesc}</p>
                  <Link to={`/course/${activeCourseId}/lesson/${nextLesson.id}`} className="cta-button">
                    START LESSON
                  </Link>
                </>
              ) : (
                <>
                  <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎉</div>
                  <h2 className="mb-3 fw-bold">Course Complete!</h2>
                  <p className="mb-5 text-muted" style={{ fontSize: '1.2rem' }}>You have finished all available lessons.</p>
                  <Link to="/pick-language" className="cta-button">START NEW COURSE</Link>
                </>
              )}
            </Card>
          </Col>

          <Col lg={4}>
            {/* Daily Quests Panel */}
            <Card className="dashboard-card p-4 mb-4">
              <h4 className="fw-bold mb-4 text-uppercase text-muted" style={{ fontSize: '1rem', letterSpacing: '1px' }}>Daily Quests</h4>
              
              {quests.length === 0 ? (
                <p className="text-muted small">No quests available today.</p>
              ) : (
                quests.map((quest, index) => (
                  <div key={quest.id} className={index !== quests.length - 1 ? "mb-4" : ""}>
                    {/* Title and XP */}
                    <div className="d-flex justify-content-between align-items-start mb-1">
                      <span className="fw-bold" style={{ fontSize: '1rem', color: quest.isCompleted ? '#a1a1aa' : '#f8fafc' }}>
                        {quest.title}
                      </span>
                      <span className="fw-bold" style={{ color: quest.isCompleted ? '#58cc02' : '#f59e0b', fontSize: '0.9rem', whiteSpace: 'nowrap', marginLeft: '10px' }}>
                        {quest.isCompleted ? '✓ Done' : `⚡ ${quest.rewardXp} XP`}
                      </span>
                    </div>

                    {/* Description */}
                    <div className="text-muted mb-2" style={{ fontSize: '0.85rem', lineHeight: '1.2' }}>
                      {quest.description}
                    </div>

                    {/* Progress Text (e.g. 1/3) */}
                    <div className="text-end mb-1">
                      <small className="text-muted fw-bold" style={{ fontSize: '0.8rem' }}>
                        {quest.progress} / {quest.target}
                      </small>
                    </div>

                    {/* Progress bar */}
                    <ProgressBar 
                      now={(quest.progress / quest.target) * 100} 
                      variant={quest.isCompleted ? "success" : "warning"}
                      style={{ height: '10px', borderRadius: '10px', backgroundColor: '#334155' }}
                    />
                  </div>
                ))
              )}
            </Card>

            {/* Redesigned Quick Links */}
            <div className="d-grid gap-3">
              <Link to="/leaderboard" className="dashboard-quick-btn">
                <div className="btn-icon-wrapper" style={{ backgroundColor: '#fef08a', color: '#ca8a04' }}>
                  <Trophy size={20} />
                </div>
                <div className="btn-text">Leaderboard</div>
              </Link>
              
              <Link to="/shop" className="dashboard-quick-btn">
                <div className="btn-icon-wrapper" style={{ backgroundColor: '#bfdbfe', color: '#2563eb' }}>
                  <ShoppingCart size={20} />
                </div>
                <div className="btn-text">Store</div>
              </Link>
              
              <Link to="/pick-language" className="dashboard-quick-btn">
                <div className="btn-icon-wrapper" style={{ backgroundColor: '#e0e7ff', color: '#4338ca' }}>
                  <Globe size={20} />
                </div>
                <div className="btn-text">Change Course</div>
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
