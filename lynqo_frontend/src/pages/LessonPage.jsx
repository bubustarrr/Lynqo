import React, { useEffect, useState, useContext, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Container, Card, Button, ProgressBar, Spinner } from 'react-bootstrap';
import './MainPage.css';

export default function LessonPage() {
  const { id } = useParams();
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  
  // Audio Ref for sound effects
  const correctSound = useRef(new Audio('/media/sounds/correct.mp3')); // Optional: Add files or remove
  const wrongSound = useRef(new Audio('/media/sounds/wrong.mp3'));

  // Data State
  const [lesson, setLesson] = useState(null);
  const [queue, setQueue] = useState([]); // The active list of questions
  const [initialCount, setInitialCount] = useState(0); // For progress bar
  const [mistakes, setMistakes] = useState(new Set()); // Track ID of questions user got wrong (for accuracy calc)
  const [loading, setLoading] = useState(true);

  // UI State
  const [selectedOption, setSelectedOption] = useState('');
  const [feedback, setFeedback] = useState(null); // 'correct' | 'wrong' | null
  const [hearts, setHearts] = useState(5);
  const [isFinished, setIsFinished] = useState(false);

  // 1. Fetch & Initialize
  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const res = await fetch(`https://localhost:7118/api/Lessons/${id}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setLesson(data.lesson);
          
          // Initialize Queue
          setQueue(data.contents);
          setInitialCount(data.contents.length);
        }
      } catch (err) {
        console.error("Error loading lesson", err);
      } finally {
        setLoading(false);
      }
    };
    if (token && id) fetchLesson();
  }, [token, id]);

  // 2. Core Logic: Check Answer
  const checkAnswer = () => {
    if (!queue.length) return;
    
    const currentQ = queue[0];
    // Normalize strings for comparison (trim, lowercase)
    const userAnswer = selectedOption.trim().toLowerCase();
    const correctAnswer = currentQ.answer.trim().toLowerCase();

    if (userAnswer === correctAnswer) {
      setFeedback('correct');
      // correctSound.current.play().catch(() => {}); // Uncomment if you have sounds
    } else {
      setFeedback('wrong');
      // wrongSound.current.play().catch(() => {});
      
      setHearts(h => Math.max(0, h - 1));
      
      // Track this question ID as a mistake (for final score)
      setMistakes(prev => new Set(prev).add(currentQ.id));
    }
  };

  // 3. Core Logic: Continue / Retry
  const handleContinue = () => {
    const currentQ = queue[0];

    if (feedback === 'correct') {
      // Success: Remove from queue
      const newQueue = queue.slice(1);
      setQueue(newQueue);
      
      if (newQueue.length === 0) {
        finishLesson();
        return;
      }
    } else {
      // Failure: Move current question to the END of the queue
      const newQueue = [...queue.slice(1), currentQ];
      setQueue(newQueue);
    }

    // Reset UI for next card
    setFeedback(null);
    setSelectedOption('');
  };

  // 4. Finish & Submit
  const finishLesson = async () => {
    setIsFinished(true);
    
    // Calculate Accuracy: (Total - UniqueMistakes) / Total
    const accuracyRaw = ((initialCount - mistakes.size) / initialCount) * 100;
    const accuracy = Math.max(0, Math.round(accuracyRaw));
    
    // Calculate XP: Base + Bonus for hearts
    const baseXp = lesson.xpReward || 10;
    const bonusXp = hearts * 2;
    const totalXp = baseXp + bonusXp;

    try {
      await fetch(`https://localhost:7118/api/Lessons/${id}/complete`, {
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
  if (!lesson) return <div className="p-5 text-center">Lesson not found.</div>;

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

            <Button size="lg" className="cta-button primary w-50 mx-auto" onClick={() => navigate('/dashboard')}>
                Continue
            </Button>
        </Card>
      </Container>
    );
  }

  const currentQ = queue[0];
  // Progress: 100% - (Remaining items that haven't been pushed back / Total) * 100
  // Simplified: Just show progress based on (Initial - CurrentQueueLength). 
  // Note: Queue length stays high if we keep pushing back, which is correct behavior (bar doesn't move).
  const completedCount = initialCount - queue.length; // This logic breaks if queue grows, but here queue stays same size on error.
  // Actually simpler: 
  // We want the bar to fill up as we *permanently remove* items.
  const progress = ((initialCount - queue.length) / initialCount) * 100;

  return (
    <Container className="main-page-container mt-4" style={{maxWidth: '700px'}}>
      
      {/* Top Bar */}
      <div className="d-flex align-items-center mb-4 gap-3">
        <Button variant="link" className="text-muted text-decoration-none fs-4" onClick={() => navigate('/dashboard')}>✕</Button>
        <ProgressBar now={progress} className="flex-grow-1" style={{height: '16px', borderRadius: '8px'}} variant="success" />
        <div className="d-flex align-items-center text-danger fw-bold fs-5">
            ❤️ {hearts}
        </div>
      </div>

      {/* Question Card */}
      <Card className="p-4 border-0 shadow-sm mb-4" style={{minHeight: '400px', borderRadius: '20px'}}>
        <h3 className="fw-bold mb-5 text-center text-dark">{currentQ.question}</h3>

        <div className="flex-grow-1 d-flex flex-column justify-content-center">
            
                        {/* INPUT: Multiple Choice */}
            {currentQ.contentType === 'multiple_choice' && Array.isArray(currentQ.options) && (
                <div className="d-grid gap-3">
                    {currentQ.options.map((opt, idx) => {
                        // 1. Normalize the option data
                        // Handle if it's just a string ["A", "B"] OR an object [{text: "A", audioUrl: "..."}, ...]
                        const text = typeof opt === 'string' ? opt : opt.text;
                        const audioUrl = typeof opt === 'object' ? opt.audioUrl : null;
                        
                        const isSelected = selectedOption === text;
                        
                        // 2. Determine Styling (Feedback colors)
                        let borderColor = '#e5e7eb';
                        let bgColor = 'white';
                        
                        if (feedback && text === currentQ.answer) {
                             borderColor = '#22c55e'; // Correct = Green
                             bgColor = '#dcfce7';
                        } else if (isSelected && feedback === 'wrong') {
                             borderColor = '#ef4444'; // Wrong Selection = Red
                             bgColor = '#fee2e2';
                        } else if (isSelected) {
                             borderColor = 'var(--gradient-blue)'; // Selected = Blue
                             bgColor = '#e0f2fe';
                        }

                        return (
                            <div 
                                key={idx}
                                onClick={() => {
                                    if (!feedback) {
                                        setSelectedOption(text);
                                        // Optional: Play audio immediately on select
                                        const playAudio = (url) => {
                                            if (!url) return;
                                            // Check if it's already a full URL
                                            const fullUrl = url.startsWith('http') 
                                                ? url 
                                                : `https://localhost:7118${url}`; // Adjust port if needed
                                                
                                            new Audio(fullUrl).play().catch(err => console.error("Audio Error:", err));
                                        };
                                        playAudio(audioUrl);
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
                                    {/* Audio Icon (if available) */}
                                    {audioUrl && (
                                        <div className="p-2 rounded-circle bg-white shadow-sm border" style={{width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                            🔊
                                        </div>
                                    )}
                                    <span className="fw-bold fs-5">{text}</span>
                                </div>
                                
                                {isSelected && !feedback && <span className="text-primary fs-4">●</span>}
                            </div>
                        );
                    })}
                </div>
            )}


            {/* INPUT: Text / Fill Blank */}
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

            {/* Audio Player (if exists) */}
            {currentQ.mediaId && (
                 <div className="text-center mt-4">
                     <Button variant="light" className="rounded-circle p-3 shadow-sm" onClick={() => {
                         new Audio(`https://localhost:7118/api/media/${currentQ.mediaId}`).play();
                     }}>
                        🔊
                     </Button>
                 </div>
             )}

        </div>
      </Card>

      {/* Footer Action Area */}
      <div className={`fixed-bottom p-4 border-top bg-white ${feedback ? (feedback === 'correct' ? 'bg-success-subtle' : 'bg-danger-subtle') : ''}`}>
        <Container style={{maxWidth: '700px'}}>
            <div className="d-flex justify-content-between align-items-center">
                
                {/* Feedback Message */}
                <div style={{minWidth: '200px'}}>
                    {feedback === 'correct' && (
                        <div className="d-flex align-items-center text-success gap-2">
                            <div className="fs-2 bg-white rounded-circle p-2 shadow-sm">✅</div>
                            <div>
                                <h4 className="fw-bold m-0">Excellent!</h4>
                            </div>
                        </div>
                    )}
                    {feedback === 'wrong' && (
                        <div className="d-flex align-items-center text-danger gap-2">
                            <div className="fs-2 bg-white rounded-circle p-2 shadow-sm">❌</div>
                            <div>
                                <h4 className="fw-bold m-0">Correct Answer:</h4>
                                <div className="fs-5">{currentQ.answer}</div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Button */}
                {!feedback ? (
                    <Button 
                        size="lg" 
                        className="cta-button primary px-5 py-3 fw-bold"
                        disabled={!selectedOption}
                        onClick={checkAnswer}
                    >
                        CHECK
                    </Button>
                ) : (
                    <Button 
                        size="lg" 
                        variant={feedback === 'correct' ? 'success' : 'danger'}
                        className="px-5 py-3 fw-bold shadow"
                        onClick={handleContinue}
                    >
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
