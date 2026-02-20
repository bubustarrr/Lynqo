import React, { useState, useEffect, useContext } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import LoadingSpinner from './components/common/LoadingSpinner';
import './App.css';

// Context importok
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { CartProvider } from './context/CartContext';

// Oldalak importálása
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import NavBar from './components/common/NavBar';
import ShopPage from './pages/ShopPage';
import NewsPage from './pages/NewsPage';
import SettingsPage from './pages/SettingsPage';
import Footer from "./components/common/Footer";
import LanguageSelectionPage from "./pages/LanguageSelectionPage";
import DashboardPage from './pages/DashboardPage';
import MerchPage from './pages/MerchPage';
import LessonPage from './pages/LessonPage';
import LeaderboardPage from './pages/LeaderboardPage';
import ProfilePage from './pages/ProfilePage';
// AZ ÚJ ELŐFIZETÉS OLDAL IMPORTJA:
import SubscriptionPage from './pages/SubscriptionPage'; 

// Védett útvonal komponensek
const GuestRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  if (user) return <Navigate to="/pick-language" replace />; 
  return children;
};

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  if (!user) return <Navigate to="/main" replace />;
  return children;
};

// Ez a belső tartalom, ami már a Routeren és a Providereken BELÜL van
function AppContent() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  
  // Most már biztonságos a ThemeContext használata
  const { theme } = useTheme(); 

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 500); // Kicsit gyorsítottam a loadingon
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div className={`app-container ${theme}-mode`}>
      <NavBar />
      
      {isLoading && (
        <div className="loading-overlay">
          <LoadingSpinner size="large" message="Loading..." />
        </div>
      )}
      
      <main className="main-content">
        <Routes>
          {/* Főoldalak és Profil */}
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/register" element={<GuestRoute><RegisterPage /></GuestRoute>} />
          <Route path="/login" element={<GuestRoute><LoginPage /></GuestRoute>} />
          
          {/* Dashboard és Tanulás */}
          <Route path="/dashboard/:courseId" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
          <Route path="/dashboard" element={<Navigate to="/dashboard/1" replace />} /> 
          <Route path="/course/:courseId/lesson/:lessonId" element={<ProtectedRoute><LessonPage /></ProtectedRoute>} />

          {/* Beállítások és funkciók */}
          <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
          <Route path="/leaderboard" element={<ProtectedRoute><LeaderboardPage /></ProtectedRoute>} />
          <Route path="/pick-language" element={<ProtectedRoute><LanguageSelectionPage /></ProtectedRoute>} />
          <Route path="/news" element={<NewsPage />} />
          
          {/* --- SHOP SZEKCIÓ --- */}
          <Route path="/shop" element={<ProtectedRoute><ShopPage /></ProtectedRoute>} />
          {/* JAVÍTVA: Helyes URL és a helyes SubscriptionPage komponens */}
          <Route path="/shop/subscriptions" element={<ProtectedRoute><SubscriptionPage /></ProtectedRoute>} />
          <Route path="/shop/merch" element={<ProtectedRoute><MerchPage /></ProtectedRoute>} />

          {/* Fallback (ha valaki nem létező URL-t ír be) */}
          <Route path="/" element={<Navigate to="/main" replace />} />
          <Route path="*" element={<Navigate to="/main" replace />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

// FONTOS: Itt csak a Providereket fűzzük össze. 
// A Routert az index.js-be tesszük!
export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <LanguageProvider>
          <CartProvider>
             <AppContent />
          </CartProvider>
        </LanguageProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}