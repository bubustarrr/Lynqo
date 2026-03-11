import React, { useEffect, useState, useContext, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Container, Card, Button, ProgressBar, Spinner } from 'react-bootstrap';
import './MainPage.css';
import './LessonPage.css';

export default function LessonPage() {
  const { courseId, lessonId } = useParams();
  // Assuming your AuthContext provides the token and a user object containing hearts/isPremium
  const { token, user } = useContext(AuthContext);
  const navigate = useNavigate();
  
  // State
  const [lesson, setLesson] = useState(null);
  const [queue, setQueue] = useState([]); 
  const [initialCount, setInitialCount] = useState(0); 
  const [mistakes, setMistakes] = useState(new Set()); 
  const [loading, setLoading] = useState(true);

  // UI State
  const [selectedOption, setSelectedOption] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [hearts, setHearts] = useState(5);
  const [isFinished, setIsFinished] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false); // NEW: Track if user died

  // Fetch Lesson
  useEffect(() => {
    if (!token || !lessonId) {
        setLoading(false);
        return;
    }

    // Set initial hearts from user context if available
    if (user && user.hearts !== undefined) {
        setHearts(user.hearts);
    }

    const fetchLesson = async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://localhost:7118/api/Lessons/${lessonId}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (res.status === 400) {
            const errorData = await res.json();
            if (errorData.message === "NO_HEARTS") {
                // If backend rejected because of 0 hearts, show game over instantly
                setIsGameOver(true);
                setLoading(false);
                return;
            }
        }

        if (res.ok) {
          const data = await res.json();
          setLesson(data.lesson);
          setQueue(data.contents);
          setInitialCount(data.contents.length);
        } else {
            console.error("Lesson fetch failed:", res.status);
        }
      } catch (err) {
        console.error("Error loading lesson", err);
      } finally {
        setLoading(false);
      }
    };
    fetchLesson();
  }, [token, lessonId, user]);

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
      setMistakes(prev => new Set(prev).add(currentQ.id));
      
      // Heart logic
      const isPremium = user?.isPremium || false;
      if (!isPremium) {
          const newHearts = Math.max(0, hearts - 1);
          setHearts(newHearts);
          
          if (newHearts === 0) {
              handleGameOver();
          }
      }
    }
  };

  // Trigger Game Over
  const handleGameOver = async () => {
      setIsGameOver(true);
      
      try {
          // Tell the backend they lost all their hearts so they can't just refresh
          await fetch(`https://localhost:7118/api/Lessons/sync-hearts`, {
              method: 'POST',
              headers: { 
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}` 
              },
              body: JSON.stringify(0)
          });
      } catch (err) {
          console.error("Failed to sync game over state", err);
      }
  };

  // Continue
  const handleContinue = () => {
    // If they are dead, don't let them continue
    if (isGameOver) return;

    const currentQ = queue[0];
    if (feedback === 'correct') {
      const newQueue = queue.slice(1);
      setQueue(newQueue);
      if (newQueue.length === 0) {
        finishLesson();
        return;
      }
    } else {
      setQueue([...queue.slice(1), currentQ]); // Retry logic
    }
    setFeedback(null);
    setSelectedOption('');
  };

  // Finish & Save (Only runs if they win)
  const finishLesson = async () => {
    setIsFinished(true);
    
    const accuracyRaw = ((initialCount - mistakes.size) / initialCount) * 100;
    const accuracy = Math.max(0, Math.round(accuracyRaw));
    
    // XP Calculation
    const baseXp = lesson?.xpReward || 10;
    const bonusXp = hearts * 2;
    const totalXp = baseXp + bonusXp;

    try {
      console.log("Saving to DB...");
      const res = await fetch(`https://localhost:7118/api/Lessons/${lessonId}/complete`, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({
            score: accuracy,
            stars: accuracy === 100 ? 3 : (accuracy >= 80 ? 2 : 1),
            xpEarned: totalXp,
            heartsRemaining: hearts,
            timeSpentSeconds: 60
        })
      });

      if (res.ok) {
          console.log("✅ Saved successfully!");
      } else {
          console.error("❌ Save failed:", res.status);
      }
    } catch (err) {
      console.error("Network error saving results", err);
    }
  };

  if (loading) return <div className="p-5 text-center"><Spinner animation="border" /></div>;
  if (!lesson && !isGameOver) return <div className="p-5 text-center">Lesson not found. <Button onClick={() => navigate(`/dashboard/${courseId}`)}>Back</Button></div>;

  // --- GAME OVER SCREEN ---
  if (isGameOver) {
      return (
        <Container className="main-page-container mt-5 text-center">
          <Card className="p-5 shadow-lg border-0 animate-pop-in dashboard-card" style={{borderRadius: '24px'}}>
              <div style={{fontSize: '5rem'}} className="animate-shake">💔</div>
              <h1 className="fw-bold mb-3 text-danger">Out of Hearts!</h1>
              <p className="text-muted fs-5 mb-4">You made too many mistakes. Keep practicing and try again!</p>
              
              <Button size="lg" variant="danger" className="w-50 mx-auto mt-2" onClick={() => navigate(`/dashboard/${courseId}`)}>
                  Back to Dashboard
              </Button>
          </Card>
        </Container>
      );
  }

  // --- FINISHED SCREEN ---
  if (isFinished) {
    const accuracy = Math.round(((initialCount - mistakes.size) / initialCount) * 100);
    return (
      <Container className="main-page-container mt-5 text-center">
        <Card className="p-5 shadow-lg border-0 animate-pop-in dashboard-card" style={{borderRadius: '24px'}}>
            <div style={{fontSize: '5rem'}} className="animate-bounce-glow">🎉</div>
            <h1 className="fw-bold mb-3">Lesson Complete!</h1>
            
            <div className="row justify-content-center my-4">
                <div className="col-4">
                    <h3 className="fw-bold text-warning">{accuracy}%</h3>
                    <small className="text-muted fw-bold">ACCURACY</small>
                </div>
                <div className="col-4">
                    <h3 className="fw-bold text-danger">{user?.isPremium ? '∞' : hearts}</h3>
                    <small className="text-muted fw-bold">HEARTS</small>
                </div>
                 <div className="col-4">
                    <h3 className="fw-bold text-success">+{lesson?.xpReward + (hearts * 2)}</h3>
                    <small className="text-muted fw-bold">XP EARNED</small>
                </div>
            </div>

            <Button size="lg" className="cta-button primary w-50 mx-auto mt-4" onClick={() => navigate(`/dashboard/${courseId}`)}>
                Continue
            </Button>
        </Card>
      </Container>
    );
  }

  const currentQ = queue[0];
  const progress = ((initialCount - queue.length) / initialCount) * 100;
  
  // Footer dinamikus háttere
  let footerBgClass = '';
  if (feedback === 'correct') footerBgClass = 'correct-bg';
  else if (feedback === 'wrong') footerBgClass = 'wrong-bg';

  return (
    <Container className="main-page-container mt-4" style={{maxWidth: '700px'}}>
      
      {/* Top Bar */}
      <div className="d-flex align-items-center mb-4 gap-3">
        <Button variant="link" onClick={() => navigate(`/dashboard/${courseId}`)} className="text-decoration-none fs-5" style={{color: 'inherit'}}>✕</Button>
        <ProgressBar now={progress} className="flex-grow-1" variant="success" style={{height: '10px', borderRadius: '5px'}} />
        <div className={`text-danger fw-bold fs-5 ${feedback === 'wrong' ? 'animate-shake' : ''}`}>
            ❤️ {user?.isPremium ? '∞' : hearts}
        </div>
      </div>

      {/* Question Card */}
      <Card className="p-4 border-0 shadow-sm mb-4 dashboard-card" style={{minHeight: '400px', borderRadius: '20px'}}>
        <div key={queue.length} className="flex-grow-1 d-flex flex-column animate-slide-in">
          <h3 className="fw-bold mb-5 text-center">{currentQ.question}</h3>

          <div className="flex-grow-1 d-flex flex-column justify-content-center">
              
              {/* Multiple Choice */}
              {currentQ.contentType === 'multiple_choice' && Array.isArray(currentQ.options) && (
                  <div className="d-grid gap-3">
                      {currentQ.options.map((opt, idx) => {
                          const text = typeof opt === 'string' ? opt : opt.text;
                          const mediaId = typeof opt === 'object' ? opt.audioUrl : null;
                          const isSelected = selectedOption === text;
                          
                          // Dinamikus CSS osztályok kezelése
                          let stateClass = '';
                          if (feedback && text === currentQ.answer) {
                               stateClass = 'option-correct animate-bounce-glow'; 
                          } else if (isSelected && feedback === 'wrong') {
                               stateClass = 'option-wrong animate-shake'; 
                          } else if (isSelected) {
                               stateClass = 'option-selected';
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
                                  className={`p-3 rounded d-flex align-items-center justify-content-between option-card ${stateClass} ${feedback ? 'disabled-option' : ''}`}
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

              {/* Text Input */}
              {(currentQ.contentType === 'fill_blank' || currentQ.contentType === 'text') && (
                  <div className="text-center">
                      <input 
                          className={`form-control form-control-lg text-center mx-auto shadow-sm lesson-input 
                            ${feedback === 'correct' ? 'option-correct animate-bounce-glow' : ''} 
                            ${feedback === 'wrong' ? 'option-wrong animate-shake' : ''}
                          `}
                          style={{ maxWidth: '300px', fontSize: '1.5rem' }}
                          placeholder="Type answer..."
                          value={selectedOption}
                          onChange={(e) => setSelectedOption(e.target.value)}
                          disabled={!!feedback}
                          onKeyDown={(e) => {
                              if (e.key === 'Enter' && !feedback && selectedOption) checkAnswer();
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
                          <span style={{fontSize: '1.5rem'}}>🔊</span>
                      </Button>
                  </div>
              )}
          </div>
        </div>
      </Card>

      {/* Footer - Helyes/Hibás visszajelzés becsúszik */}
      <div className={`fixed-bottom p-4 feedback-footer ${footerBgClass}`}>
        <Container style={{maxWidth: '700px'}} className="d-flex justify-content-between align-items-center">
             <div style={{minWidth: '200px'}}>
                {feedback === 'correct' && <h4 className="fw-bold text-success animate-slide-up m-0">Excellent! ✨</h4>}
                {feedback === 'wrong' && (
                    <div className="text-danger animate-slide-up">
                        <h4 className="fw-bold m-0">Correct Answer:</h4>
                        <div className="fs-5">{currentQ.answer}</div>
                    </div>
                )}
            </div>
            {!feedback ? (
                <Button size="lg" className="cta-button primary px-5 py-3 fw-bold shadow-sm" disabled={!selectedOption} onClick={checkAnswer}>CHECK</Button>
            ) : (
                <Button size="lg" variant={feedback === 'correct' ? 'success' : 'danger'} className="px-5 py-3 fw-bold shadow animate-slide-up" onClick={handleContinue}>CONTINUE</Button>
            )}
        </Container>
      </div>
      <div style={{height: '140px'}}></div> 
    </Container>
  );
}
