import { Button } from "react-bootstrap";
import { FaCrown, FaShoppingBag, FaBolt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import './ShopLandingPage.css';

// Itt is beimportáljuk az univerzális Vissza gombot
import BackButton from '../components/common/BackButton';

export default function ShopLandingPage() {
  const navigate = useNavigate();

  return (
    // A position-relative fontos ide, hogy ehhez képest tudjuk abszolút pozícionálni a gombot
    <div className="shop-landing-wrapper position-relative">
      
      {/* A Vissza gomb konténere: kitűzzük a bal felső sarokba, és kap egy magas z-indexet, hogy biztosan kattintható legyen */}
      <div className="position-absolute top-0 start-0 w-100 z-3">
        <BackButton  wrapperClass="d-flex justify-content-start p-4" />
      </div>

      <div className="gradient-bg d-flex align-items-center justify-content-center min-vh-100 p-4">
        <div className="content-wrapper text-center text-white">
          <h1 className="display-3 fw-bold mb-5 drop-shadow">Lynqo Store</h1>
          <p className="lead mb-5 px-4 drop-shadow fs-4">
            Upgrade your learning experience or show your love for Lynqo with exclusive merchandise.
          </p>

          <div className="btn-group-wrapper mb-5">
            <Button
              size="lg"
              className="landing-btn subscription-btn me-md-3 mb-3 mb-md-0 px-5 py-3"
              onClick={() => navigate('/shop/subscriptions')}
            >
              <FaCrown className="fs-3 me-2 mb-1" />
              Subscriptions
            </Button>

            <Button
              size="lg"
              className="landing-btn shop-btn me-md-3 mb-3 mb-md-0 px-5 py-3"
              onClick={() => navigate('/shop/merch')}
            >
              <FaShoppingBag className="fs-3 me-2 mb-1" />
              Online Shop
            </Button>

            <Button
              size="lg"
              className="landing-btn powerups-btn px-5 py-3"
              onClick={() => navigate('/shop/powerups')}
            >
              <FaBolt className="fs-3 me-2 mb-1" />
              Power-ups
            </Button>
          </div>

          <p className="text-white-50 drop-shadow fs-6">
            Secure checkout • Worldwide shipping • 30-day returns
          </p>
        </div>
      </div>
    </div>
  );
}