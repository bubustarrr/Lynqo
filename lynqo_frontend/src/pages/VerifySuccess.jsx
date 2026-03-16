import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './MainPage.css'; // Visszatértünk az eredeti, szép dizájnhoz!

export default function VerifySuccess() {
  const navigate = useNavigate();
  // Létrehozunk egy state-et a visszaszámlálónak, ami 5-ről indul
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    // Ha a számláló eléri a 0-t, bezárjuk vagy átirányítjuk
    if (countdown === 0) {
      window.close();
      navigate('/login');
      return;
    }

    // Elindítunk egy időzítőt, ami másodpercenként (1000ms) csökkenti az értéket 1-gyel
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    // Takarítás: ha a komponens bezárul, leállítjuk az időzítőt
    return () => clearInterval(timer);
  }, [countdown, navigate]);

  return (
    <div className="main-page-container">
      <section className="hero-section" style={{ flexDirection: 'column', textAlign: 'center', justifyContent: 'center' }}>
        
        {/* LOGÓ BEILLESZTÉSE (A lebegő animációval) */}
        <img 
          src="https://media.discordapp.net/attachments/1382315503057506365/1472995807245504604/3.png?ex=69b8daff&is=69b7897f&hm=9a72499fd645aedae3be6e3cc665fa60e0fbcfedcd97b0a26aef120a4aafdc6e&=&format=webp&quality=lossless&width=699&height=699" 
          alt="Lynqo Logo" 
          style={{ width: '180px', marginBottom: '2rem', animation: 'float 6s ease-in-out infinite' }} 
        />

        <div className="hero-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h1 className="hero-title">Account Verified! 🎉</h1>
          <p className="hero-subtitle" style={{ textAlign: 'center', marginBottom: '1rem' }}>
            Awesome! Your email address has been successfully verified. 
            You are now ready to start your language learning journey with Lynqo.
          </p>
          
          {/* LÁTHATÓ VISSZASZÁMLÁLÓ */}
          <p style={{ color: '#8b5cf6', fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '2rem' }}>
            This window will close automatically in {countdown} seconds...
          </p>
          
          <div className="hero-buttons" style={{ justifyContent: 'center' }}>
            <Link to="/login" className="cta-button primary large">
              🚀 Go to Login Now
            </Link>
          </div>
        </div>

      </section>
    </div>
  );
}