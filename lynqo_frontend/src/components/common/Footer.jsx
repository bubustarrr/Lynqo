import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import './Footer.css';

export default function Footer() {
  const { t } = useTranslation();
  const [hidden, setHidden] = useState(false);
  const location = useLocation(); 

  const isLessonPage = location.pathname.includes('/lesson');

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setHidden(true); 
      } else {
        setHidden(false); 
      }
      lastScrollY = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (isLessonPage) {
    return null;
  }

  return (
    <footer className={`lynqo-footer ${hidden ? "hidden" : ""}`}>
      <div className="footer-content">
        <div className="footer-col">
          <h4>Lynqo</h4>
          <p>{t('footer.slogan')}</p>
          <p className="copyright">
            © 2026 Lynqo. {t('footer.rights')}
          </p>
          <p className="owners">{t('footer.owners')}: Norbi, Robi, Bia</p>
        </div>

        <div className="footer-col">
          <h4>{t('footer.contact')}</h4>
          <p>Email: <a href="mailto:support@lynqo.ch">support@lynqo.ch</a></p>
          <p>Phone: +36 70 365 1965</p>
        </div>

        <div className="footer-col">
          <h4>{t('footer.navigation')}</h4>
          <Link to="/">{t('footer.home')}</Link>
          <Link to="/news">{t('footer.news')}</Link>
          <Link to="/shop">{t('footer.shop')}</Link>
          <Link to="/leaderboard">{t('footer.leaderboard')}</Link>
        </div>

        <div className="footer-col">
          <h4>{t('footer.followUs')}</h4>
          <div className="socials">
            <a href="https://www.instagram.com/lynqo_/" target="_blank" rel="noreferrer">Instagram</a>
            <a href="https://discord.gg/QwGrCYnCAe" target="_blank" rel="noreferrer">Discord</a>
          </div>
        </div>
      </div>
    </footer>
  );
}