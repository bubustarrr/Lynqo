import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Card, Button, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import ReactCountryFlag from "react-country-flag";
import { 
  Languages, 
  Globe, 
  ArrowRight, 
  ChevronLeft, 
  CircleAlert,
  Info
} from 'lucide-react';
import './MainPage.css';

export default function LanguageSelectionPage() {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [step, setStep] = useState(1);
  const [availableCourses, setAvailableCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sourceLanguages, setSourceLanguages] = useState([]);

  // Fetch languages from backend
  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const res = await fetch('https://localhost:7118/api/Languages');
        if (res.ok) {
          const langs = await res.json();
          setSourceLanguages(langs);
        }
      } catch (err) {
        console.error("Failed to load languages", err);
      }
    };
    fetchLanguages();
  }, []);

  const getFlagCode = (langCode) => {
    if (!langCode) return null;
    
    const map = {
      en: 'US',
      hu: 'HU',
      de: 'DE',
      fr: 'FR',
      es: 'ES',
      it: 'IT',
      pt: 'PT',
      nl: 'NL',
      pl: 'PL',
      ro: 'RO',
      cs: 'CZ',
      sk: 'SK',
      uk: 'UA',
      ru: 'RU',
      tr: 'TR',
      ar: 'SA',
      zh: 'CN',
      ja: 'JP',
      ko: 'KR',
    };

    return map[langCode.toLowerCase()] || langCode.toUpperCase();
  };

  const fetchCourses = async (id) => {
    setLoading(true);
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

  return (
    <Container className="main-page-container mt-5 text-center">
      
      {/* HEADER */}
      <div className="mb-4">
        {step === 1 ? (
          <Languages size={48} className="text-primary mb-3" />
        ) : (
          <Globe size={48} className="text-primary mb-3" />
        )}
        <h1 className="hero-title mb-2" style={{fontSize: '2.5rem', fontWeight: 'bold'}}>
          {step === 1 ? "I speak..." : "I want to learn..."}
        </h1>
        <p className="subtitle-text mb-5 fs-5 text-muted">
          {step === 1 ? "Select your native language" : "Select a course to start learning"}
        </p>
      </div>

      {/* STEP 1: SELECT NATIVE LANGUAGE */}
      {step === 1 && (
        <>
          {sourceLanguages.length === 0 ? (
             <div className="py-5"><Spinner animation="border" variant="primary"/></div>
          ) : (
            <Row className="justify-content-center g-4">
              {sourceLanguages.map((lang) => (
                <Col key={lang.id} xs={6} md={3} lg={2}>
                  <Card 
                    className="h-100 shadow-sm border-0 custom-card transition-hover" 
                    onClick={() => fetchCourses(lang.id)}
                    style={{borderRadius: '16px', cursor: 'pointer', overflow: 'hidden'}}
                  >
                    <Card.Body className="d-flex flex-column align-items-center justify-content-center p-3">
                      <div className="mb-3" style={{ width: '70px', height: '50px', overflow: 'hidden', borderRadius: '6px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
                        <ReactCountryFlag 
                          countryCode={getFlagCode(lang.code)} 
                          svg 
                          style={{
                            width: '100%', 
                            height: '100%', 
                            display: 'block', 
                            objectFit: 'cover'
                          }} 
                        />
                      </div>
                      <h6 className="fw-bold m-0">{lang.name}</h6>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </>
      )}

      {/* STEP 2: SELECT TARGET COURSE */}
      {step === 2 && (
        <>
          {loading && <div className="py-5"><Spinner animation="border" variant="primary"/></div>}
          
          {!loading && availableCourses.length === 0 && (
            <div className="text-muted py-5">
              <CircleAlert size={64} className="mb-3 opacity-50" />
              <h3 className="mt-3">No courses found.</h3>
              <p>We don't have a course for this language pair yet.</p>
              <Button variant="link" onClick={() => setStep(1)} className="fw-bold d-flex align-items-center justify-content-center mx-auto">
                <ChevronLeft size={18} /> Choose another language
              </Button>
            </div>
          )}

          <Row className="justify-content-center g-4">
            {availableCourses.map((course) => {
              // Find the target language object to get its code
              const targetLang = sourceLanguages.find(l => l.id === course.targetLanguageId);
              
              return (
                <Col key={course.id} xs={12} md={6} lg={5}>
                  <Card 
                    className="h-100 shadow border-0 custom-card"
                    style={{borderRadius: '24px', cursor: 'pointer'}}
                    onClick={() => navigate(`/dashboard/${course.id}`)}
                  >
                    <Card.Body className="p-4 text-start">
                      <div className="d-flex align-items-center mb-4">
                        <div className="rounded-circle d-flex align-items-center justify-content-center me-3 shadow-sm" 
                             style={{width: '70px', height: '70px', overflow: 'hidden', border: '2px solid #f0f0f0'}}>
                          {targetLang ? (
                            <ReactCountryFlag 
                              countryCode={getFlagCode(targetLang.code)} 
                              svg 
                              style={{
                                width: '100%', 
                                height: '100%', 
                                display: 'block', 
                                objectFit: 'cover'
                              }} 
                            />
                          ) : (
                            <Globe size={32} className="text-muted" />
                          )}
                        </div>
                        <div>
                          <h4 className="fw-bold m-0">{course.title}</h4>
                          <div className="d-flex align-items-center text-muted mt-1">
                            <Info size={14} className="me-1" />
                            <small className="fw-bold text-uppercase" style={{fontSize: '0.65rem', letterSpacing: '1px'}}>Official Course</small>
                          </div>
                        </div>
                      </div>
                      
                      <p className="card-desc mb-4 text-secondary" style={{minHeight: '3rem'}}>
                        {course.description || "Master this language with our expert-led curriculum."}
                      </p>
                      
                      <Button className="w-100 cta-button primary py-3 fw-bold d-flex align-items-center justify-content-center gap-2" 
                              style={{borderRadius: '14px', backgroundColor: '#58cc02', border: 'none'}}>
                        Start Learning <ArrowRight size={20} />
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
          
          {!loading && (
            <div className="mt-5">
              <Button variant="outline-secondary" size="sm" onClick={() => setStep(1)} className="d-flex align-items-center mx-auto gap-1 border-0 fw-bold">
                <ChevronLeft size={16} /> Back to languages
              </Button>
            </div>
          )}
        </>
      )}
    </Container>
  );
}
