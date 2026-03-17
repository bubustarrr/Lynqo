import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import { useTranslation } from "react-i18next";
import StatsBar from '../components/dashboard/StatsBar';
import LessonCard from '../components/dashboard/LessonCard';
import QuestsPanel from '../components/dashboard/QuestsPanel';
import QuickNav from '../components/dashboard/QuickNav';
import './DashboardPage.css';

export default function DashboardPage() {
  const { t } = useTranslation();
  const { user, token, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const { courseId } = useParams();
  const activeCourseId = courseId || 1;

  const [stats, setStats] = useState({ streak: 0, xp: 0, hearts: 5, gems: 0, isPremium: false });
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

        if (userRes.status === 401) { logout(); navigate('/login'); return; }

        if (userRes.ok) {
          const userData = await userRes.json();
          setStats({
            streak: userData.streak || userData.Streak || 0,
            xp: userData.totalXp || userData.TotalXp || 0,
            hearts: userData.hearts !== undefined ? userData.hearts : (userData.Hearts || 5),
            gems: userData.coins || userData.Coins || 0,
            isPremium: userData.isPremium || userData.IsPremium || false, 
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
          <h1 className="fw-bold">{t('dashboard.welcome', { name: user?.username || t('dashboard.learner') })}</h1>
        </div>

        <StatsBar stats={stats} />

        <Row className="g-4">
          <Col lg={8}>
            <LessonCard nextLesson={nextLesson} activeCourseId={activeCourseId} />
          </Col>
          <Col lg={4}>
            <QuestsPanel quests={quests} />
          </Col>
        </Row>

        <QuickNav />
      </Container>
    </div>
  );
}