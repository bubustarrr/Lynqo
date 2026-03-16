import React from 'react';
import { Link } from 'react-router-dom';
import './MainPage.css'; // Használjuk a már meglévő stílusaidat!

export default function VerifySuccess() {
  return (
    <div className="main-page-container">
      <section className="hero-section" style={{ flexDirection: 'column', textAlign: 'center', justifyContent: 'center' }}>
        
        {/* LOGÓ BEILLESZTÉSE */}
        <img 
          src="https://media.discordapp.net/attachments/1382315503057506365/1472995807245504604/3.png?ex=69b8daff&is=69b7897f&hm=9a72499fd645aedae3be6e3cc665fa60e0fbcfedcd97b0a26aef120a4aafdc6e&=&format=webp&quality=lossless&width=699&height=699" 
          alt="Lynqo Logo" 
          style={{ width: '180px', marginBottom: '2rem', animation: 'float 6s ease-in-out infinite' }} 
        />

        <div className="hero-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h1 className="hero-title">Account Verified! 🎉</h1>
          <p className="hero-subtitle" style={{ textAlign: 'center' }}>
            Awesome! Your email address has been successfully verified. 
            You are now ready to start your language learning journey with Lynqo.
          </p>
          
          <div className="hero-buttons" style={{ justifyContent: 'center' }}>
            <Link to="/login" className="cta-button primary large">
              🚀 Go to Login
            </Link>
          </div>
        </div>

      </section>
    </div>
  );
}