import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const BackButton = ({ to = -1, text = "", wrapperClass = "px-4 pt-4" }) => {
  const navigate = useNavigate();

  return (
    // Itt használjuk a wrapperClass-t, amit az oldalról kap meg
    <div className={`w-100 ${wrapperClass}`} style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <button 
        className="cta-button secondary" 
        onClick={() => navigate(to)}
        style={{ color: '#8b5cf6', borderColor: '#8b5cf6' }}
      >
        <FaArrowLeft className={`mb-1 ${text ? 'me-2' : ''}`} style={{ color: '#8b5cf6' }} /> 
        {text}
      </button>
    </div>
  );
};

export default BackButton;