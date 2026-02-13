import React, { useState, useEffect, useContext } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'; // Routert NEM importálunk ide, csak a hookokat
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
import ShopLandingPage from './pages/ShopLandingPage';
import MerchPage from './pages/MerchPage';
import LessonPage from './pages/LessonPage';

// Védett útvonal komponensek
const GuestRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  // 👇 FIX: Add a default ID (e.g., 1) so the route matches "/dashboard/:courseId"
  if (user) return <Navigate to="/dashboard/1" replace />; 
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
          <Route path="/main" element={<MainPage />} />
          <Route path="/register" element={<GuestRoute><RegisterPage /></GuestRoute>} />
          <Route path="/login" element={<GuestRoute><LoginPage /></GuestRoute>} />
          <Route path="/dashboard/:courseId" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
          <Route path="/shop" element={<ProtectedRoute><ShopPage /></ProtectedRoute>} />
          <Route path="/shoppage" element={<ProtectedRoute><ShopLandingPage /></ProtectedRoute>} />
          <Route path="/shoppage/subscriptions" element={<ProtectedRoute><ShopPage /></ProtectedRoute>} />
          <Route path="/shoppage/merch" element={<ProtectedRoute><MerchPage /></ProtectedRoute>} />
          <Route 
       path="/course/:courseId/lesson/:lessonId" 
       element={<ProtectedRoute><LessonPage /></ProtectedRoute>} 
    />
          <Route path="/pick-language" element={<ProtectedRoute><LanguageSelectionPage /></ProtectedRoute>} />
          <Route path="/news" element={<NewsPage />} />
          
          <Route path="/" element={<Navigate to="/main" replace />} />
          <Route path="*" element={<Navigate to="/main" replace />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

// FONTOS: Itt csak a Providereket fűzzük össze. 
// A Routert az index.js-be tesszük (lásd a 3. lépést)!
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