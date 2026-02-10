import React, { useEffect, useState, useContext, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Container, Card, Button, ProgressBar, Spinner } from 'react-bootstrap';
import './MainPage.css';

export default function LessonPage() {
  // 1. Get IDs from URL
  const { courseId, lessonId } = useParams();
  
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  
  // Audio Refs
  const correctSound = useRef(new Audio('/media/sounds/correct.mp3'));
  const wrongSound = useRef(new Audio('/media/sounds/wrong.mp3'));

  // Data State
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

  // 2. Fetch & Initialize (FIXED)
  useEffect(() => {
    // If we don't have a token or lessonId yet, stop loading and wait (or show error)
    if (!token || !lessonId) {
        console.log("Waiting for token or lessonId...", { token, lessonId });
        setLoading(false); // <--- STOP SPINNING so we see the "Lesson not found" screen instead of infinite loop
        return;
    }

    const fetchLesson = async () => {
      setLoading(true); // Start loading explicitly
      try {
        const res = await fetch(`https://localhost:7118/api/Lessons/${lessonId}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
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
        setLoading(false); // This runs when fetch finishes
      }
    };

    fetchLesson();
  }, [token, lessonId]);

  // 3. Check Answer
  const checkAnswer = () => {
    if (!queue.length) return;
    
    const currentQ = queue[0];
    const userAnswer = selectedOption.trim().toLowerCase();
    const correctAnswer = currentQ.answer.trim().toLowerCase();

    if (userAnswer === correctAnswer) {
      setFeedback('correct');
      // correctSound.current.play().catch(() => {});
    } else {
      setFeedback('wrong');
      // wrongSound.current.play().catch(() => {});
      
      setHearts(h => Math.max(0, h - 1));
      setMistakes(prev => new Set(prev).add(currentQ.id));
    }
  };

  // 4. Continue / Retry
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
      const newQueue = [...queue.slice(1), currentQ];
      setQueue(newQueue);
    }

    setFeedback(null);
    setSelectedOption('');
  };

  // 5. Finish
  const finishLesson = async () => {
    setIsFinished(true);
    
    const accuracyRaw = ((initialCount - mistakes.size) / initialCount) * 100;
    const accuracy = Math.max(0, Math.round(accuracyRaw));
    
    const baseXp = lesson?.xpReward || 10;
    const bonusXp = hearts * 2;
    const totalXp = baseXp + bonusXp;

    try {
      await fetch(`https://localhost:7118/api/Lessons/${lessonId}/complete`, {
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
    } catch (err) {
      console.error("Failed to save", err);
    }
  };

  // --- RENDER ---

  if (loading) return <div className="p-5 text-center"><Spinner animation="border" /></div>;
  
  // If fetch failed or ID missing, this will now show instead of infinite spinner
  if (!lesson) return (
    <div className="p-5 text-center">
        <h3>Lesson not found.</h3>
        <p>Debug: Course {courseId}, Lesson {lessonId}</p>
        <Button onClick={() => navigate(`/dashboard/${courseId || 1}`)}>Go Back</Button>
    </div>
  );

  // A. Finished Screen
  if (isFinished) {
    const accuracy = Math.round(((initialCount - mistakes.size) / initialCount) * 100);
    return (
      <Container className="main-page-container mt-5 text-center">
        <Card className="p-5 shadow-lg border-0" style={{borderRadius: '24px'}}>
            <div style={{fontSize: '5rem'}}>🎉</div>
            <h1 className="fw-bold mb-3" style={{color: 'var(--gradient-purple)'}}>Lesson Complete!</h1>
            
            <div className="row justify-content-center my-4">
                <div className="col-4">
                    <h3 className="fw-bold text-warning">{accuracy}%</h3>
                    <small className="text-muted fw-bold">ACCURACY</small>
                </div>
                <div className="col-4">
                    <h3 className="fw-bold text-danger">{hearts}</h3>
                    <small className="text-muted fw-bold">HEARTS</small>
                </div>
            </div>

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
    <Container className="main-page-container mt-4" style={{maxWidth: '700px'}}>
      
      {/* Top Bar */}
      <div className="d-flex align-items-center mb-4 gap-3">
        <Button 
            variant="link" 
            className="text-muted text-decoration-none fs-4" 
            onClick={() => navigate(`/dashboard/${courseId}`)}
        >
            ✕
        </Button>
        
        <ProgressBar now={progress} className="flex-grow-1" style={{height: '16px', borderRadius: '8px'}} variant="success" />
        <div className="d-flex align-items-center text-danger fw-bold fs-5">
            ❤️ {hearts}
        </div>
      </div>

      {/* Question Card */}
      <Card className="p-4 border-0 shadow-sm mb-4" style={{minHeight: '400px', borderRadius: '20px'}}>
        <h3 className="fw-bold mb-5 text-center text-dark">{currentQ.question}</h3>

        <div className="flex-grow-1 d-flex flex-column justify-content-center">
            
            {/* Multiple Choice */}
            {currentQ.contentType === 'multiple_choice' && Array.isArray(currentQ.options) && (
                <div className="d-grid gap-3">
                    {currentQ.options.map((opt, idx) => {
                        const text = typeof opt === 'string' ? opt : opt.text;
                        const audioUrl = typeof opt === 'object' ? opt.audioUrl : null;
                        const isSelected = selectedOption === text;
                        
                        let borderColor = '#e5e7eb';
                        let bgColor = 'white';
                        
                        if (feedback && text === currentQ.answer) {
                             borderColor = '#22c55e';
                             bgColor = '#dcfce7';
                        } else if (isSelected && feedback === 'wrong') {
                             borderColor = '#ef4444';
                             bgColor = '#fee2e2';
                        } else if (isSelected) {
                             borderColor = 'var(--gradient-blue)';
                             bgColor = '#e0f2fe';
                        }

                        return (
                            <div 
                                key={idx}
                                onClick={() => {
                                    if (!feedback) {
                                        setSelectedOption(text);
                                        if(audioUrl) {
                                             const fullUrl = audioUrl.startsWith('http') ? audioUrl : `https://localhost:7118${audioUrl}`;
                                             new Audio(fullUrl).play().catch(e => console.error(e));
                                        }
                                    }
                                }}
                                className="p-3 rounded d-flex align-items-center justify-content-between"
                                style={{
                                    border: `2px solid ${borderColor}`,
                                    backgroundColor: bgColor,
                                    cursor: feedback ? 'default' : 'pointer',
                                    transition: 'all 0.2s'
                                }}
                            >
                                <div className="d-flex align-items-center gap-3">
                                    {audioUrl && <span>🔊</span>}
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
                        type="text" 
                        className="form-control form-control-lg text-center mx-auto"
                        style={{maxWidth: '300px', fontSize: '1.5rem'}}
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

            {/* Audio Question */}
            {currentQ.mediaId && (
                 <div className="text-center mt-4">
                      <Button variant="light" className="rounded-circle p-3 shadow-sm" onClick={() => {
                          new Audio(`https://localhost:7118/api/media/${currentQ.mediaId}`).play();
                      }}>🔊</Button>
                 </div>
             )}
        </div>
      </Card>

      {/* Footer */}
      <div className={`fixed-bottom p-4 border-top bg-white ${feedback ? (feedback === 'correct' ? 'bg-success-subtle' : 'bg-danger-subtle') : ''}`}>
        <Container style={{maxWidth: '700px'}}>
            <div className="d-flex justify-content-between align-items-center">
                <div style={{minWidth: '200px'}}>
                    {feedback === 'correct' && <h4 className="fw-bold text-success">Excellent!</h4>}
                    {feedback === 'wrong' && (
                        <div className="text-danger">
                            <h4 className="fw-bold m-0">Correct Answer:</h4>
                            <div className="fs-5">{currentQ.answer}</div>
                        </div>
                    )}
                </div>

                {!feedback ? (
                    <Button size="lg" className="cta-button primary px-5 py-3 fw-bold" disabled={!selectedOption} onClick={checkAnswer}>
                        CHECK
                    </Button>
                ) : (
                    <Button size="lg" variant={feedback === 'correct' ? 'success' : 'danger'} className="px-5 py-3 fw-bold shadow" onClick={handleContinue}>
                        CONTINUE
                    </Button>
                )}
            </div>
        </Container>
      </div>
      <div style={{height: '140px'}}></div> 
    </Container>
  );
}
