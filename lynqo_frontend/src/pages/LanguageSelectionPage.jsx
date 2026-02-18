import React, { useState, useContext } from 'react';
import { Container, Row, Col, Card, Button, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './MainPage.css'; // Ebben lesznek az új stílusok

export default function LanguageSelectionPage() {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [step, setStep] = useState(1);
  const [availableCourses, setAvailableCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  // 1. HARDCODED UI LIST 
  const sourceLanguages = [
    { id: 1, name: 'English', flag: '🇺🇸' },
    { id: 2, name: 'Hungarian', flag: '🇭🇺' },
    { id: 3, name: 'German', flag: '🇩🇪' },
    { id: 4, name: 'French', flag: '🇫🇷' },
    { id: 5, name: 'Spanish', flag: '🇪🇸' },
    { id: 6, name: 'Italian', flag: '🇮🇹' },
    { id: 7, name: 'Portuguese', flag: '🇵🇹' },
    { id: 8, name: 'Dutch', flag: '🇳🇱' },
    { id: 9, name: 'Polish', flag: '🇵🇱' },
    { id: 10, name: 'Romanian', flag: '🇷🇴' },
    { id: 11, name: 'Czech', flag: '🇨🇿' },
    { id: 12, name: 'Slovak', flag: '🇸🇰' },
    { id: 13, name: 'Ukrainian', flag: '🇺🇦' },
    { id: 14, name: 'Russian', flag: '🇷🇺' },
    { id: 15, name: 'Turkish', flag: '🇹🇷' },
    { id: 16, name: 'Arabic', flag: '🇸🇦' },
    { id: 17, name: 'Chinese', flag: '🇨🇳' },
    { id: 18, name: 'Japanese', flag: '🇯🇵' },
    { id: 19, name: 'Korean', flag: '🇰🇷' }
  ];

  // 2. Fetch courses
  const fetchCourses = async (id) => {
    setLoading(true);
    // setSourceLangId(id); // Ha nem használod, kivehető
    
    try {
      const res = await fetch(`https://localhost:7118/api/Courses?sourceId=${id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (res.ok) {
        const courses = await res.json();
        setAvailableCourses(courses);
        setStep(2);
      }
    } catch (err) {
      console.error("Failed to load courses", err);
    } finally {
      setLoading(false);
    }
  };

  const selectCourse = (courseId) => {
    navigate(`/dashboard/${courseId}`);
  };

  return (
    <Container className="main-page-container mt-5 text-center">
      
      {/* HEADER */}
      <h1 className="hero-title mb-2" style={{fontSize: '2.5rem'}}>
        {step === 1 ? "I speak..." : "I want to learn..."}
      </h1>
      <p className="subtitle-text mb-5 fs-5">
        {step === 1 ? "Select your native language" : "Select a course"}
      </p>

      {/* STEP 1: SELECT NATIVE LANGUAGE */}
      {step === 1 && (
        <Row className="justify-content-center g-4">
          {sourceLanguages.map((lang) => (
            <Col key={lang.id} xs={6} md={3} lg={2}>
              <Card 
                className="h-100 shadow-sm border-0 custom-card" 
                style={{cursor: 'pointer', transition: 'all 0.2s', borderRadius: '16px'}}
                onClick={() => fetchCourses(lang.id)}
                onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <Card.Body className="d-flex flex-column align-items-center justify-content-center p-3">
                  <div style={{fontSize: '3rem', marginBottom: '0.5rem'}}>{lang.flag}</div>
                  <h6 className="fw-bold m-0">{lang.name}</h6>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {/* STEP 2: SELECT TARGET COURSE */}
      {step === 2 && (
        <>
            {loading && <div className="py-5"><Spinner animation="border" variant="primary"/></div>}
            
            {!loading && availableCourses.length === 0 && (
                <div className="text-muted py-5">
                    <div style={{fontSize: '3rem'}}>😕</div>
                    <h3 className="mt-3">No courses found.</h3>
                    <p>We don't have a course for this language pair yet.</p>
                    <Button variant="link" onClick={() => setStep(1)} className="fw-bold">Choose another language</Button>
                </div>
            )}

            <Row className="justify-content-center g-4">
            {availableCourses.map((course) => (
                <Col key={course.id} xs={12} md={5}>
                <Card 
                    className="h-100 shadow border-0 custom-card"
                    style={{cursor: 'pointer', borderRadius: '24px', transition: 'all 0.2s'}}
                    onClick={() => selectCourse(course.id)}
                    onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                    onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                    <Card.Body className="p-4 text-start">
                        <div className="d-flex align-items-center mb-4">
                            {/* FLAG CIRCLE - Most már CSS osztályt használ */}
                            <div className="rounded-circle d-flex align-items-center justify-content-center me-3 shadow-sm flag-circle" 
                                style={{width: '64px', height: '64px', fontSize: '2rem'}}>
                                {course.targetLanguageId === 4 ? '🇫🇷' : 
                                 course.targetLanguageId === 5 ? '🇪🇸' : 
                                 course.targetLanguageId === 3 ? '🇩🇪' : 
                                 course.targetLanguageId === 1 ? '🇺🇸' : '🌍'}
                            </div>
                            <div>
                                {/* JAVÍTVA: text-dark törölve */}
                                <h4 className="fw-bold m-0">{course.title}</h4>
                                <small className="text-muted fw-bold text-uppercase" style={{fontSize: '0.75rem', letterSpacing: '1px'}}>Official Course</small>
                            </div>
                        </div>
                        
                        <p className="card-desc mb-4">{course.description}</p>
                        
                        <Button className="w-100 cta-button primary py-2 fw-bold" size="lg">
                            Start Learning ➜
                        </Button>
                    </Card.Body>
                </Card>
                </Col>
            ))}
            </Row>
            
            {!loading && availableCourses.length > 0 && (
                <div className="mt-5">
                    <Button variant="outline-secondary" size="sm" onClick={() => setStep(1)}>← Change Native Language</Button>
                </div>
            )}
        </>
      )}
    </Container>
  );
}