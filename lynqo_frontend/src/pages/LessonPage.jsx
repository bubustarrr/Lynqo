import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Container, Card, Button, ProgressBar, Spinner } from 'react-bootstrap';
import './MainPage.css';

export default function LessonPage() {
  const { courseId, lessonId } = useParams();
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [lesson, setLesson] = useState(null);
  const [queue, setQueue] = useState([]);
  const [initialCount, setInitialCount] = useState(0);
  const [mistakes, setMistakes] = useState(new Set());
  const [loading, setLoading] = useState(true);

  const [selectedOption, setSelectedOption] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [hearts, setHearts] = useState(5);
  const [isFinished, setIsFinished] = useState(false);

  // Stores the parsed API response from /complete so the finish screen shows server-confirmed values
  const [savedResult, setSavedResult] = useState(null);

  // Fetch lesson + real heart count from the server
  useEffect(() => {
    if (!token || !lessonId) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        const headers = { 'Authorization': `Bearer ${token}` };

        const [lessonRes, userRes] = await Promise.all([
          fetch(`https://localhost:7118/api/Lessons/${lessonId}`, { headers }),
          fetch(`https://localhost:7118/api/User/me`, { headers }),
        ]);

        if (lessonRes.status === 401 || userRes.status === 401) {
          navigate('/login');
          return;
        }

        if (lessonRes.ok) {
          const data = await lessonRes.json();
          setLesson(data.lesson);
          setQueue(data.contents);
          setInitialCount(data.contents.length);
        } else {
          console.error("Lesson fetch failed:", lessonRes.status);
        }

        if (userRes.ok) {
          const userData = await userRes.json();
          const apiHearts =
            userData.hearts !== undefined ? userData.hearts :
            userData.Hearts !== undefined ? userData.Hearts : 5;
          setHearts(apiHearts);
        }
      } catch (err) {
        console.error("Error loading lesson", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token, lessonId, navigate]);

  // Check Answer
  const checkAnswer = () => {
    if (!queue.length) return;
    const currentQ = queue[0];
    const userAnswer = selectedOption.trim().toLowerCase();
    const correctAnswer = currentQ.answer.trim().toLowerCase();

    if (userAnswer === correctAnswer) {
      setFeedback('correct');
    } else {
      setFeedback('wrong');
      setHearts(h => Math.max(0, h - 1));
      setMistakes(prev => new Set(prev).add(currentQ.id));
    }
  };

  // Continue
  const handleContinue = () => {
    const currentQ = queue[0];
    if (feedback === 'correct') {
      const newQueue = queue.slice(1);
      setQueue(newQueue);
      if (newQueue.length === 0) {
        finishLesson();
        return;
      }
    } else {
      setQueue([...queue.slice(1), currentQ]);
    }
    setFeedback(null);
    setSelectedOption('');
  };

  // Finish & Save
  const finishLesson = async () => {
    setIsFinished(true);

    const safeInitial = initialCount || 1;
    const accuracyRaw = ((safeInitial - mistakes.size) / safeInitial) * 100;
    const accuracy = Math.max(0, Math.round(accuracyRaw));

    // Guard against null xpReward (DB value can be null)
    const baseXp = lesson?.xpReward || 10;
    const bonusXp = hearts * 2;
    const totalXp = baseXp + bonusXp;

    try {
      console.log("Saving to DB...");
      const res = await fetch(`https://localhost:7118/api/Lessons/${lessonId}/complete`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          score: accuracy,
          stars: accuracy === 100 ? 3 : accuracy >= 80 ? 2 : 1,
          xpEarned: totalXp,
          heartsRemaining: hearts,
          timeSpentSeconds: 60,
        }),
      });

      if (res.ok) {
        console.log("✅ Saved successfully!");
        const data = await res.json();

        // Read server-confirmed values — backend returns XpAwarded, Hearts, TotalXp
        setSavedResult({
          xpAwarded: data?.XpAwarded ?? data?.xpAwarded ?? totalXp,
          hearts: data?.Hearts ?? data?.hearts ?? hearts,
          totalXp: data?.TotalXp ?? data?.totalXp ?? null,
        });
      } else {
        console.error("❌ Save failed:", res.status);
        // Fall back to locally calculated values so the screen still shows something
        setSavedResult({ xpAwarded: totalXp, hearts, totalXp: null });
      }
    } catch (err) {
      console.error("Network error saving results", err);
      setSavedResult({ xpAwarded: totalXp, hearts, totalXp: null });
    }
  };

  if (loading) return <div className="p-5 text-center"><Spinner animation="border" /></div>;
  if (!lesson) return (
    <div className="p-5 text-center">
      Lesson not found. <Button onClick={() => navigate(`/dashboard/${courseId}`)}>Back</Button>
    </div>
  );

  // Finished Screen
  if (isFinished) {
    const safeInitial = initialCount || 1;
    const accuracy = Math.round(((safeInitial - mistakes.size) / safeInitial) * 100);

    // Use server-confirmed values if available, local calculation as fallback
    const displayXp = savedResult?.xpAwarded ?? ((lesson?.xpReward || 10) + (hearts * 2));
    const displayHearts = savedResult?.hearts ?? hearts;

    return (
      <Container className="main-page-container mt-5 text-center">
        <Card className="p-5 shadow-lg border-0" style={{ borderRadius: '24px' }}>
          <div style={{ fontSize: '5rem' }}>🎉</div>
          <h1 className="fw-bold mb-3">Lesson Complete!</h1>

          <div className="row justify-content-center my-4">
            <div className="col-4">
              <h3 className="fw-bold text-warning">{accuracy}%</h3>
              <small className="text-muted fw-bold">ACCURACY</small>
            </div>
            <div className="col-4">
              <h3 className="fw-bold text-danger">{displayHearts}</h3>
              <small className="text-muted fw-bold">HEARTS</small>
            </div>
            <div className="col-4">
              <h3 className="fw-bold text-success">+{displayXp}</h3>
              <small className="text-muted fw-bold">XP EARNED</small>
            </div>
          </div>

          {savedResult?.totalXp !== null && savedResult?.totalXp !== undefined && (
            <p className="text-muted mb-3">Total XP: {savedResult.totalXp}</p>
          )}

          <Button
            size="lg"
            className="cta-button primary w-50 mx-auto"
            onClick={() => navigate(`/dashboard/${courseId}`)}
          >
            Continue
          </Button>
        </Card>
      </Container>
    );
  }

  const currentQ = queue[0];
  const progress = ((initialCount - queue.length) / initialCount) * 100;

  return (
    <Container className="main-page-container mt-4" style={{ maxWidth: '700px' }}>

      {/* Top Bar */}
      <div className="d-flex align-items-center mb-4 gap-3">
        <Button variant="link" onClick={() => navigate(`/dashboard/${courseId}`)}>✕</Button>
        <ProgressBar now={progress} className="flex-grow-1" variant="success" />
        <div className="text-danger fw-bold">❤️ {hearts}</div>
      </div>

      {/* Question Card */}
      <Card className="p-4 border-0 shadow-sm mb-4" style={{ minHeight: '400px', borderRadius: '20px' }}>
        <h3 className="fw-bold mb-5 text-center text-dark">{currentQ.question}</h3>

        <div className="flex-grow-1 d-flex flex-column justify-content-center">

          {/* Multiple Choice */}
          {currentQ.contentType === 'multiple_choice' && Array.isArray(currentQ.options) && (
            <div className="d-grid gap-3">
              {currentQ.options.map((opt, idx) => {
                const text = typeof opt === 'string' ? opt : opt.text;
                const mediaId = typeof opt === 'object' ? opt.audioUrl : null;
                const isSelected = selectedOption === text;

                let borderColor = '#e5e7eb';
                let bgColor = 'white';

                if (feedback && text === currentQ.answer) {
                  borderColor = '#22c55e'; bgColor = '#dcfce7';
                } else if (isSelected && feedback === 'wrong') {
                  borderColor = '#ef4444'; bgColor = '#fee2e2';
                } else if (isSelected) {
                  borderColor = 'var(--gradient-blue)'; bgColor = '#e0f2fe';
                }

                return (
                  <div
                    key={idx}
                    onClick={() => {
                      if (!feedback) {
                        setSelectedOption(text);

                        if (mediaId) {
                          let fullUrl = '';
                          if (typeof mediaId === 'string' && mediaId.includes('.mp3')) {
                            const cleanPath = mediaId.startsWith('/') ? mediaId : `/${mediaId}`;
                            fullUrl = `https://localhost:7118${cleanPath}`;
                          } else {
                            fullUrl = `https://localhost:7118/api/media/audio/french/${mediaId}`;
                          }
                          new Audio(fullUrl).play().catch(e => console.error("Option audio error:", e));
                        }
                      }
                    }}
                    className="p-3 rounded d-flex align-items-center justify-content-between"
                    style={{ border: `2px solid ${borderColor}`, backgroundColor: bgColor, cursor: feedback ? 'default' : 'pointer' }}
                  >
                    <div className="d-flex align-items-center gap-3">
                      {mediaId && <span>🔊</span>}
                      <span className="fw-bold fs-5">{text}</span>
                    </div>
                    {isSelected && !feedback && <span className="text-primary fs-4">●</span>}
                  </div>
                );
              })}
            </div>
          )}

          {/* Text Input — covers fillblank, text, and old underscore variants just in case */}
          {(currentQ.contentType === 'fillblank' ||
            currentQ.contentType === 'text' ||
            currentQ.contentType === 'fill_blank') && (
            <div className="text-center">
              <input
                className="form-control form-control-lg text-center mx-auto"
                style={{ maxWidth: '300px', fontSize: '1.5rem' }}
                placeholder="Type answer..."
                value={selectedOption}
                onChange={(e) => setSelectedOption(e.target.value)}
                disabled={!!feedback}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !feedback) checkAnswer();
                  else if (e.key === 'Enter' && feedback) handleContinue();
                }}
              />
            </div>
          )}

          {/* Audio Button */}
          {currentQ.mediaId && (
            <div className="text-center mt-4">
              <Button
                variant="light"
                className="rounded-circle p-3 shadow-sm"
                onClick={() => {
                  const audioUrl = `https://localhost:7118/api/media/audio/french/${currentQ.mediaId}`;
                  new Audio(audioUrl).play().catch(e => console.error("Audio error:", e));
                }}
              >
                🔊
              </Button>
            </div>
          )}
        </div>
      </Card>

      {/* Footer */}
      <div className={`fixed-bottom p-4 border-top bg-white ${feedback ? (feedback === 'correct' ? 'bg-success-subtle' : 'bg-danger-subtle') : ''}`}>
        <Container style={{ maxWidth: '700px' }} className="d-flex justify-content-between align-items-center">
          <div style={{ minWidth: '200px' }}>
            {feedback === 'correct' && <h4 className="fw-bold text-success">Excellent!</h4>}
            {feedback === 'wrong' && (
              <div className="text-danger">
                <h4 className="fw-bold m-0">Correct Answer:</h4>
                <div className="fs-5">{currentQ.answer}</div>
              </div>
            )}
          </div>
          {!feedback ? (
            <Button size="lg" className="cta-button primary px-5 py-3 fw-bold" disabled={!selectedOption} onClick={checkAnswer}>CHECK</Button>
          ) : (
            <Button size="lg" variant={feedback === 'correct' ? 'success' : 'danger'} className="px-5 py-3 fw-bold shadow" onClick={handleContinue}>CONTINUE</Button>
          )}
        </Container>
      </div>
      <div style={{ height: '140px' }}></div>
    </Container>
  );
}
