import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Container, Card, Button, ProgressBar, Spinner } from 'react-bootstrap';
import './MainPage.css';
import './LessonPage.css';

export default function LessonPage() {
  const { courseId, lessonId } = useParams();
  const { token, user, setUser } = useContext(AuthContext); 
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
        const res = await fetch(`https://localhost:7118/api/Lessons/${lessonId}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
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
        console.error("Error loading lesson", err);
      } finally {
        setLoading(false);
      }
    };
    fetchLesson();
  }, [token, lessonId]); 

  // 🔥 NEW: KEYBOARD SHORTCUTS LISTENER 🔥
  useEffect(() => {
    const handleKeyDown = (e) => {
        // If the user is typing in the text box, don't hijack their numbers!
        if (e.target.tagName === 'INPUT') return;

        // Press 'Enter' to Check or Continue
        if (e.key === 'Enter') {
            if (!feedback && selectedOption) document.getElementById('check-button')?.click();
            else if (feedback) document.getElementById('continue-button')?.click();
            return;
        }

        const currentQ = queue[0];
        if (!currentQ || feedback) return;

        const rawType = (currentQ.contentType || currentQ.ContentType || 'text').toLowerCase();
        const isMultipleChoice = rawType === 'multiplechoice' || rawType === 'multiple_choice';

        // Press 1, 2, 3, 4 for multiple choice
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
                const mediaUrl = typeof opt === 'object' ? opt.audioUrl : null;
                
                setSelectedOption(text); // Select the option

                // Play the audio automatically just like clicking it
                if (mediaUrl) {
                    let fullUrl = mediaUrl.includes('.mp3') || mediaUrl.includes('.oog')
                        ? `https://localhost:7118${mediaUrl.startsWith('/') ? mediaUrl : `/${mediaUrl}`}`
                        : `https://localhost:7118/api/media/audio/french/${mediaUrl}`;
                    new Audio(fullUrl).play().catch(err => console.error(err));
                }
            }
        }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [queue, feedback, selectedOption]); // Re-bind when state changes

  const checkAnswer = async () => {
    if (!queue.length) return;
    const currentQ = queue[0];
    const userAnswer = selectedOption.trim().toLowerCase();
    const correctAnswer = (currentQ.answer || currentQ.Answer || '').trim().toLowerCase();

    if (userAnswer === correctAnswer) {
      setFeedback('correct');
    } else {
      setFeedback('wrong');
      setMistakes(prev => new Set(prev).add(currentQ.id || currentQ.Id));
      
      if (!isPremium) {
          const newHearts = Math.max(0, hearts - 1);
          setHearts(newHearts); 
          
          try {
              const res = await fetch(`https://localhost:7118/api/Lessons/sync-hearts`, {
                  method: 'POST',
                  headers: { 
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${token}` 
                  },
                  body: JSON.stringify({ 
                      HeartsRemaining: newHearts, 
                      heartsRemaining: newHearts 
                  }) 
              });
              
              if (res.ok) {
                  const data = await res.json();
                  const finalHearts = data.hearts !== undefined ? data.hearts : data.Hearts;
                  if (setUser && user) {
                      setUser({ ...user, hearts: finalHearts, Hearts: finalHearts });
                  }
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
      const res = await fetch(`https://localhost:7118/api/Lessons/${lessonId}/complete`, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` 
        },
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
          if (setUser && user && finalHearts !== undefined) {
              setUser({ ...user, hearts: finalHearts, Hearts: finalHearts });
          }
      }
    } catch (err) {
      console.error("Network error saving results", err);
    }
  };

  if (loading) return <div className="p-5 text-center"><Spinner animation="border" /></div>;
  if (!lesson && !isGameOver) return <div className="p-5 text-center">Lesson not found. <Button onClick={() => navigate(`/dashboard/${courseId}`)}>Back</Button></div>;

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

  if (isFinished) {
    const accuracy = Math.round(((initialCount - mistakes.size) / initialCount) * 100);
    const reward = lesson?.xpReward || lesson?.XpReward || 10;
    const activeHearts = isPremium ? 5 : hearts; 
    
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
                    <h3 className="fw-bold text-danger">{isPremium ? '∞' : hearts}</h3>
                    <small className="text-muted fw-bold">HEARTS</small>
                </div>
                 <div className="col-4">
                    <h3 className="fw-bold text-success">+{reward + (activeHearts * 2)}</h3>
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
  const isMultipleChoice = rawType === 'multiplechoice' || rawType === 'multiple_choice';
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
          <h3 className="fw-bold mb-5 text-center">{currentQ.question || currentQ.Question}</h3>

          <div className="flex-grow-1 d-flex flex-column justify-content-center">
              
              {isMultipleChoice && Array.isArray(parsedOptions) && parsedOptions.length > 0 && (
                  <div className="d-grid gap-3">
                      {parsedOptions.map((opt, idx) => {
                          const text = typeof opt === 'string' ? opt : opt.text;
                          const mediaUrl = typeof opt === 'object' ? opt.audioUrl : null;
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
                                          if (mediaUrl) {
                                              let fullUrl = mediaUrl.includes('.mp3') || mediaUrl.includes('.oog')
                                                  ? `https://localhost:7118${mediaUrl.startsWith('/') ? mediaUrl : `/${mediaUrl}`}`
                                                  : `https://localhost:7118/api/media/audio/french/${mediaUrl}`;
                                              new Audio(fullUrl).play().catch(e => console.error(e));
                                          }
                                      }
                                  }}
                                  className={`p-3 rounded d-flex align-items-center justify-content-between option-card ${stateClass} ${feedback ? 'disabled-option' : ''}`}
                                  style={{cursor: 'pointer'}}
                              >
                                  <div className="d-flex align-items-center gap-3">
                                      {/* 🔥 Added Keyboard Number Indicator 🔥 */}
                                      <kbd className="bg-secondary text-white rounded px-2 py-1 shadow-sm" style={{fontFamily: 'monospace', fontSize: '1rem'}}>
                                          {idx + 1}
                                      </kbd>
                                      {mediaUrl && <span>🔊</span>}
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
                              if (e.key === 'Enter' && !feedback && selectedOption) document.getElementById('check-button')?.click();
                              else if (e.key === 'Enter' && feedback) document.getElementById('continue-button')?.click();
                          }}
                          autoFocus
                      />
                  </div>
              )}

              {(currentQ.mediaId || currentQ.MediaId) && (
                  <div className="text-center mt-4">
                      <Button 
                          variant="light" 
                          className="rounded-circle p-3 shadow-sm"
                          onClick={() => {
                              const mId = currentQ.mediaId || currentQ.MediaId;
                              const audioUrl = `https://localhost:7118/api/media/audio/french/${mId}`;
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

      <div className={`fixed-bottom p-4 feedback-footer ${footerBgClass}`}>
        <Container style={{maxWidth: '700px'}} className="d-flex justify-content-between align-items-center">
             <div style={{minWidth: '200px'}}>
                {feedback === 'correct' && <h4 className="fw-bold text-success animate-slide-up m-0">Excellent! ✨</h4>}
                {feedback === 'wrong' && (
                    <div className="text-danger animate-slide-up">
                        <h4 className="fw-bold m-0">Correct Answer:</h4>
                        <div className="fs-5">{currentQ.answer || currentQ.Answer}</div>
                    </div>
                )}
            </div>
            {!feedback ? (
                // 🔥 Added id="check-button" for the keyboard shortcut
                <Button id="check-button" size="lg" className="cta-button primary px-5 py-3 fw-bold shadow-sm" disabled={!selectedOption} onClick={checkAnswer}>CHECK</Button>
            ) : (
                // 🔥 Added id="continue-button" for the keyboard shortcut
                <Button id="continue-button" size="lg" variant={feedback === 'correct' ? 'success' : 'danger'} className="px-5 py-3 fw-bold shadow animate-slide-up" onClick={handleContinue}>CONTINUE</Button>
            )}
        </Container>
      </div>
      <div style={{height: '140px'}}></div> 
    </Container>
  );
}
