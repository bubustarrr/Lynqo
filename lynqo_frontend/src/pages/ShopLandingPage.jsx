import { Button } from "react-bootstrap";
import { FaCrown, FaShoppingBag, FaBolt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next"; // i18n import
import './ShopLandingPage.css';

// Itt is beimportáljuk az univerzális Vissza gombot
import BackButton from '../components/common/BackButton';

export default function ShopLandingPage() {
  const navigate = useNavigate();
  const { t } = useTranslation(); // t függvény inicializálása

  return (
    // A position-relative fontos ide, hogy ehhez képest tudjuk abszolút pozícionálni a gombot
    <div className="shop-landing-wrapper position-relative">
      
      {/* A Vissza gomb konténere: kitűzzük a bal felső sarokba, és kap egy magas z-indexet, hogy biztosan kattintható legyen */}
      <div className="position-absolute top-0 start-0 w-100 z-3">
        <BackButton to="/main" wrapperClass="d-flex justify-content-start p-4"/>
      </div>

      <div className="gradient-bg d-flex align-items-center justify-content-center min-vh-100 p-4">
        <div className="content-wrapper text-center text-white">
          <h1 className="display-3 fw-bold mb-5 drop-shadow">
            {t('shopLandingPage.title')}
          </h1>
          <p className="lead mb-5 px-4 drop-shadow fs-4">
            {t('shopLandingPage.description')}
          </p>

          <div className="btn-group-wrapper mb-5">
            <Button
              size="lg"
              className="landing-btn subscription-btn me-md-3 mb-3 mb-md-0 px-5 py-3"
              onClick={() => navigate('/shop/subscriptions')}
            >
              <FaCrown className="fs-3 me-2 mb-1" />
              {t('shopLandingPage.buttons.subscriptions')}
            </Button>

            <Button
              size="lg"
              className="landing-btn shop-btn me-md-3 mb-3 mb-md-0 px-5 py-3"
              onClick={() => navigate('/shop/merch')}
            >
              <FaShoppingBag className="fs-3 me-2 mb-1" />
              {t('shopLandingPage.buttons.merch')}
            </Button>

            <Button
              size="lg"
              className="landing-btn powerups-btn me-md-3 mb-3 mb-md-0 px-5 py-3"
              onClick={() => navigate('/shop/powerups')}
            >
              <FaBolt className="fs-3 me-2 mb-1" />
              {t('shopLandingPage.buttons.powerups')}
            </Button>
          </div>

          <p className="text-white-50 drop-shadow fs-6">
            {t('shopLandingPage.footer')}
          </p>
        </div>
      </div>
    </div>
  );
}