import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Container, Card, Button, ProgressBar, Spinner } from 'react-bootstrap';
// Ikonok importálása
import { FaArrowRight, FaCheck, FaLightbulb, FaStar } from 'react-icons/fa';
import './MainPage.css';
import './LessonPage.css';

export default function LessonPage() {
  const { courseId, lessonId } = useParams();
  const { token, user, setUser, authFetch } = useContext(AuthContext); 

  const navigate = useNavigate();
  
  const [lesson, setLesson] = useState(null);
  const [queue, setQueue] = useState([]); 
  const [initialCount, setInitialCount] = useState(0); 
  const [mistakes, setMistakes] = useState(new Set()); 
  const [loading, setLoading] = useState(true);

  const [selectedOption, setSelectedOption] = useState('');
  const [feedback, setFeedback] = useState(null);
  
  const [hearts, setHearts] = useState(user?.hearts ?? user?.Hearts ?? 5); 
  const [isPremium, setIsPremium] = useState(false); 
  
  const [isFinished, setIsFinished] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    if (!token || !lessonId) {
        setLoading(false); return;
    }

    const fetchLesson = async () => {
      setLoading(true);
      try {
        const res = await authFetch(`https://localhost:7118/api/Lessons/${lessonId}`);
        
        if (res.status === 400) {
            const errorData = await res.json();
            if (errorData.message === "NO_HEARTS") {
                setIsGameOver(true);
                setLoading(false);
                return;
            }
        }

        if (res.ok) {
          const data = await res.json();
          setLesson(data.lesson || data.Lesson); 
          setQueue(data.contents || data.Contents);
          setInitialCount((data.contents || data.Contents).length);
          
          const dbHearts = data.hearts !== undefined ? data.hearts : data.Hearts;
          if (dbHearts !== undefined) setHearts(dbHearts); 

          const dbPremium = data.isPremium !== undefined ? data.isPremium : data.IsPremium;
          if (dbPremium !== undefined) {
              setIsPremium(dbPremium === true || dbPremium === 1);
          }
        }
      } catch (err) {
        console.error("Hiba a lecke betöltésekor", err);
      } finally {
        setLoading(false);
      }
    };
    fetchLesson();
  }, [token, lessonId]); 

  useEffect(() => {
    const handleKeyDown = (e) => {
        if (e.target.tagName === 'INPUT') return;

        if (e.key === 'Enter') {
            if (!feedback && selectedOption) document.getElementById('check-button')?.click();
            else if (feedback) document.getElementById('continue-button')?.click();
            return;
        }

        const currentQ = queue[0];
        if (!currentQ || feedback) return;

        const rawType = (currentQ.contentType || currentQ.ContentType || 'text').toLowerCase();
        const isMultipleChoice = rawType === 'multiplechoice' || rawType === 'multiple_choice' || rawType === 'listening';

        if (isMultipleChoice) {
            const keyNum = parseInt(e.key, 10);
            if (isNaN(keyNum)) return;

            let parsedOptions = [];
            const optionsString = currentQ.options || currentQ.Options;
            if (optionsString) {
                if (typeof optionsString === 'string') {
                    try { parsedOptions = JSON.parse(optionsString); } catch (err) {}
                } else if (Array.isArray(optionsString)) {
                    parsedOptions = optionsString;
                }
            }

            if (keyNum >= 1 && keyNum <= parsedOptions.length) {
                const opt = parsedOptions[keyNum - 1];
                const text = typeof opt === 'string' ? opt : opt.text;
                setSelectedOption(text); 

                const mediaUrl = typeof opt === 'object' ? opt.audioUrl : null;
                if (mediaUrl) {
                    let fullUrl = mediaUrl.includes('.mp3') || mediaUrl.includes('.ogg')
                        ? `https://localhost:7118${mediaUrl.startsWith('/') ? mediaUrl : `/${mediaUrl}`}`
                        : `https://localhost:7118/api/media/audio/french/${mediaUrl}`;
                    new Audio(fullUrl).play().catch(err => console.error(err));
                }
            }
        }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [queue, feedback, selectedOption]); 

  const checkAnswer = async () => {
    if (!queue.length) return;
    const currentQ = queue[0];
    const userAnswer = selectedOption.trim().toLowerCase();
    const correctAnswer = (currentQ.answer || currentQ.Answer || '').trim().toLowerCase();

    if (userAnswer === correctAnswer) {
      setFeedback('correct');
      const correctSound = new Audio('/sounds/correct.mp3');
      correctSound.volume = 0.5; 
      correctSound.play().catch(e => console.error(e));
    } else {
      setFeedback('wrong');
      setMistakes(prev => new Set(prev).add(currentQ.id || currentQ.Id));
      
      const wrongSound = new Audio('/sounds/wrong.mp3');
      wrongSound.volume = 0.5;
      wrongSound.play().catch(e => console.error(e));
      
      if (!isPremium) {
          const newHearts = Math.max(0, hearts - 1);
          setHearts(newHearts); 
          
          try {
              const res = await authFetch(`https://localhost:7118/api/Lessons/sync-hearts`, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ HeartsRemaining: newHearts, heartsRemaining: newHearts }) 
              });
              
              if (res.ok) {
                  const data = await res.json();
                  const finalHearts = data.hearts !== undefined ? data.hearts : data.Hearts;
                  if (setUser && user) setUser({ ...user, hearts: finalHearts, Hearts: finalHearts });
                  if (finalHearts !== undefined) setHearts(finalHearts);
              }
          } catch(err) {
              console.error("Network error syncing hearts", err);
          }
          
          if (newHearts === 0) setIsGameOver(true);
      }
    }
  };

  const handleContinue = () => {
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
      setQueue([...queue.slice(1), currentQ]); 
    }
    setFeedback(null);
    setSelectedOption('');
  };

  const finishLesson = async () => {
    setIsFinished(true);
    
    const accuracyRaw = ((initialCount - mistakes.size) / initialCount) * 100;
    const accuracy = Math.max(0, Math.round(accuracyRaw));
    
    const reward = lesson?.xpReward || lesson?.XpReward || 10;
    const activeHearts = isPremium ? 5 : hearts; 
    const totalXp = reward + (activeHearts * 2);

    try {
      const res = await authFetch(`https://localhost:7118/api/Lessons/${lessonId}/complete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            Score: accuracy, score: accuracy,
            Stars: accuracy === 100 ? 3 : (accuracy >= 80 ? 2 : 1), stars: accuracy === 100 ? 3 : (accuracy >= 80 ? 2 : 1),
            XpEarned: totalXp, xpEarned: totalXp,
            HeartsRemaining: isPremium ? hearts : hearts, heartsRemaining: isPremium ? hearts : hearts,
            TimeSpentSeconds: 60, timeSpentSeconds: 60
        })
      });

      if (res.ok) {
          const data = await res.json();
          const finalHearts = data.hearts !== undefined ? data.hearts : data.Hearts;
          const finalStreak = data.streak !== undefined ? data.streak : data.Streak;

          if (setUser && user && finalHearts !== undefined) {
              setUser({ ...user, hearts: finalHearts, Hearts: finalHearts, streak: finalStreak, Streak: finalStreak });
          }
      }
    } catch (err) {
      console.error("Network error saving results", err);
    }
  };

  if (loading) return <div className="p-5 text-center"><Spinner animation="border" /></div>;
  if (!lesson && !isGameOver) return <div className="p-5 text-center">A lecke nem található. <Button onClick={() => navigate(`/dashboard/${courseId}`)}>Vissza</Button></div>;

  if (isGameOver) {
      return (
        <Container className="main-page-container mt-5 text-center">
          <Card className="p-5 shadow-lg border-0 animate-pop-in dashboard-card" style={{borderRadius: '24px'}}>
              <div style={{fontSize: '5rem'}} className="animate-shake">💔</div>
              <h1 className="fw-bold mb-3 text-danger">Elfogyott az életed!</h1>
              <p className="text-muted fs-5 mb-4">Túl sok hibát ejtettél. Gyakorolj tovább és próbáld újra!</p>
              <Button size="lg" variant="danger" className="w-50 mx-auto mt-2" onClick={() => navigate(`/dashboard/${courseId}`)}>
                  Vissza a Dashboardra
              </Button>
          </Card>
        </Container>
      );
  }

  if (isFinished) {
    const accuracy = Math.round(((initialCount - mistakes.size) / initialCount) * 100);
    const reward = lesson?.xpReward || lesson?.XpReward || 10;
    const activeHearts = isPremium ? 5 : hearts; 
    
    return (
      <Container className="main-page-container mt-5 text-center">
        <Card className="p-5 shadow-lg border-0 animate-pop-in dashboard-card" style={{borderRadius: '24px'}}>
            <div style={{fontSize: '5rem'}} className="animate-bounce-glow">🎉</div>
            <h1 className="fw-bold mb-3">Lecke teljesítve!</h1>
            
            <div className="row justify-content-center my-4">
                <div className="col-4">
                    <h3 className="fw-bold text-warning">{accuracy}%</h3>
                    <small className="text-muted fw-bold">PONTOSSÁG</small>
                </div>
                <div className="col-4">
                    <h3 className="fw-bold text-danger">{isPremium ? '∞' : hearts}</h3>
                    <small className="text-muted fw-bold">ÉLETEK</small>
                </div>
                 <div className="col-4">
                    <h3 className="fw-bold text-success">+{reward + (activeHearts * 2)}</h3>
                    <small className="text-muted fw-bold">SZERZETT XP</small>
                </div>
            </div>

            <Button size="lg" className="cta-button primary w-50 mx-auto mt-4" onClick={() => navigate(`/dashboard/${courseId}`)}>
                Tovább
            </Button>
        </Card>
      </Container>
    );
  }

  const currentQ = queue[0];
  if (!currentQ) return null; 
  
  const progress = ((initialCount - queue.length) / initialCount) * 100;
  
  let parsedOptions = [];
  const optionsString = currentQ.options || currentQ.Options;
  if (optionsString) {
      if (typeof optionsString === 'string') {
          try { parsedOptions = JSON.parse(optionsString); } catch (e) {}
      } else if (Array.isArray(optionsString)) {
          parsedOptions = optionsString;
      }
  }
  
  const rawType = (currentQ.contentType || currentQ.ContentType || 'text').toLowerCase();
  const isListening = rawType === 'listening';
  const isMultipleChoice = rawType === 'multiplechoice' || rawType === 'multiple_choice' || isListening;
  const isFillBlank = rawType === 'fillblank' || rawType === 'fill_blank' || rawType === 'text';

  let footerBgClass = '';
  if (feedback === 'correct') footerBgClass = 'correct-bg';
  else if (feedback === 'wrong') footerBgClass = 'wrong-bg';

  return (
    <Container className="main-page-container mt-4" style={{maxWidth: '700px'}}>
      
      <div className="d-flex align-items-center mb-4 gap-3">
        <Button variant="link" onClick={() => navigate(`/dashboard/${courseId}`)} className="text-decoration-none fs-5" style={{color: 'inherit'}}>✕</Button>
        <ProgressBar now={progress} className="flex-grow-1" variant="success" style={{height: '10px', borderRadius: '5px'}} />
        <div className={`text-danger fw-bold fs-5 ${feedback === 'wrong' && !isPremium ? 'animate-shake' : ''}`}>
            ❤️ {isPremium ? '∞' : hearts}
        </div>
      </div>

      <Card className="p-4 border-0 shadow-sm mb-4 dashboard-card" style={{minHeight: '400px', borderRadius: '20px'}}>
        <div key={queue.length} className="flex-grow-1 d-flex flex-column animate-slide-in">
          <h3 className="fw-bold mb-4 text-center">{currentQ.question || currentQ.Question}</h3>

          {isListening && (currentQ.mediaId || currentQ.MediaId) && (
              <div className="text-center mb-5 mt-2">
                  <Button 
                      variant="primary" 
                      className="rounded-circle shadow-lg animate-bounce-glow"
                      style={{ width: '100px', height: '100px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                      onClick={() => {
                          const mId = currentQ.mediaId || currentQ.MediaId;
                          const audioUrl = `https://localhost:7118/api/media/audio/french/${mId}`;
                          new Audio(audioUrl).play().catch(e => console.error("Hang lejátszási hiba:", e));
                      }}
                  >
                      <span style={{fontSize: '3.5rem', marginLeft: '5px'}}>▶️</span>
                  </Button>
              </div>
          )}

          <div className="flex-grow-1 d-flex flex-column justify-content-center">
              
              {isMultipleChoice && Array.isArray(parsedOptions) && parsedOptions.length > 0 && (
                  <div className="d-grid gap-3">
                      {parsedOptions.map((opt, idx) => {
                          const text = typeof opt === 'string' ? opt : opt.text;
                          const isSelected = selectedOption === text;
                          const correctAnswerUI = currentQ.answer || currentQ.Answer;
                          
                          let stateClass = '';
                          if (feedback && text === correctAnswerUI) stateClass = 'option-correct animate-bounce-glow'; 
                          else if (isSelected && feedback === 'wrong') stateClass = 'option-wrong animate-shake'; 
                          else if (isSelected) stateClass = 'option-selected';

                          return (
                              <div 
                                  key={idx}
                                  onClick={() => {
                                      if (!feedback) {
                                          setSelectedOption(text);
                                      }
                                  }}
                                  className={`p-3 rounded d-flex align-items-center justify-content-between option-card ${stateClass} ${feedback ? 'disabled-option' : ''}`}
                                  style={{cursor: 'pointer'}}
                              >
                                  <div className="d-flex align-items-center gap-3">
                                      <kbd className="bg-secondary text-white rounded px-2 py-1 shadow-sm" style={{fontFamily: 'monospace', fontSize: '1rem'}}>
                                          {idx + 1}
                                      </kbd>
                                      <span className="fw-bold fs-5">{text}</span>
                                  </div>
                                  {isSelected && !feedback && <span className="text-primary fs-4">●</span>}
                              </div>
                          );
                      })}
                  </div>
              )}

              {isFillBlank && (
                  <div className="text-center">
                      {/* JAVÍTOTT: Nincs placeholder */}
                      <input 
                          className={`form-control form-control-lg text-center mx-auto shadow-sm lesson-input 
                            ${feedback === 'correct' ? 'option-correct animate-bounce-glow' : ''} 
                            ${feedback === 'wrong' ? 'option-wrong animate-shake' : ''}
                          `}
                          style={{ maxWidth: '300px', fontSize: '1.5rem' }}
                          value={selectedOption}
                          onChange={(e) => setSelectedOption(e.target.value)}
                          disabled={!!feedback}
                          onKeyDown={(e) => {
                              if (e.key === 'Enter' && !feedback && selectedOption) document.getElementById('check-button')?.click();
                              else if (e.key === 'Enter' && feedback) document.getElementById('continue-button')?.click();
                          }}
                          autoFocus
                      />
                  </div>
              )}

              {!isListening && (currentQ.mediaId || currentQ.MediaId) && (
                  <div className="text-center mt-4">
                      <Button 
                          variant="light" 
                          className="rounded-circle p-3 shadow-sm"
                          onClick={() => {
                              const mId = currentQ.mediaId || currentQ.MediaId;
                              const audioUrl = `https://localhost:7118/api/Media/${mId}`;
                              new Audio(audioUrl).play().catch(e => console.error(e));
                          }}
                      >
                          <span style={{fontSize: '1.5rem'}}>🔊</span>
                      </Button>
                  </div>
              )}
          </div>
        </div>
      </Card>

      {/* LÁBLÉC IKONOKKAL */}
      <div className={`fixed-bottom p-4 feedback-footer ${footerBgClass}`}>
        <Container style={{maxWidth: '700px'}} className="d-flex justify-content-between align-items-center">
             <div style={{minWidth: '200px'}}>
                {feedback === 'correct' && (
                    <div className="animate-slide-up d-flex align-items-center text-success">
                        <FaStar style={{fontSize: '2.5rem'}} />
                    </div>
                )}
                {feedback === 'wrong' && (
                    <div className="text-danger animate-slide-up">
                        <div className="d-flex align-items-center gap-2 mb-1">
                            <FaLightbulb style={{fontSize: '1.5rem'}} />
                        </div>
                        <div className="fs-5 fw-bold ms-1">{currentQ.answer || currentQ.Answer}</div>
                    </div>
                )}
            </div>

            {!feedback ? (
                <Button 
                    id="check-button" 
                    size="lg" 
                    className="cta-button primary px-5 py-3 shadow-sm d-flex align-items-center" 
                    disabled={!selectedOption} 
                    onClick={checkAnswer}
                >
                    <FaCheck style={{fontSize: '1.5rem'}} />
                </Button>
            ) : (
                <Button 
                    id="continue-button" 
                    size="lg" 
                    variant={feedback === 'correct' ? 'success' : 'danger'} 
                    className="px-5 py-3 shadow animate-slide-up d-flex align-items-center" 
                    onClick={handleContinue}
                >
                    {/* Jobbra mutató nyíl ikon */}
                    <FaArrowRight style={{fontSize: '1.5rem'}} />
                </Button>
            )}
        </Container>
      </div>
      <div style={{height: '140px'}}></div> 
    </Container>
  );
}