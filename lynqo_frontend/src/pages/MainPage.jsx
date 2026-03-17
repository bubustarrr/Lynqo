import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import HeroSection from '../components/main/HeroSection';
import ExploreSection from '../components/main/ExploreSection';
import FeaturesSection from '../components/main/FeaturesSection';
import './MainPage.css';

export default function MainPage() {
  const { user } = useContext(AuthContext);

  return (
    <div className="main-page-container">
      <HeroSection user={user} />
      <ExploreSection />
      <FeaturesSection />
    </div>
  );
}