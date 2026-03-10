import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Container, Card, Button, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaHeart, FaBolt } from 'react-icons/fa'; // FaArrowLeft kikerült

// Importáljuk a közös Vissza gomb komponenst
import BackButton from '../components/common/BackButton';

const POWERUP_ITEMS = [
  {
    id: 'heart_refill',
    name: 'Heart Refill',
    description: 'Restore your hearts back to 5 and keep learning.',
    icon: '❤️',
    cost: 350,
    action: 'refill_hearts',
  },
  {
    id: 'xp_boost',
    name: 'XP Boost (Coming Soon)',
    description: 'Double XP on your next lesson.',
    icon: '⚡',
    cost: 500,
    action: 'xp_boost',
    disabled: true,
  },
];

export default function PowerupsPage() {
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [coins, setCoins] = useState(0);
  const [hearts, setHearts] = useState(5);
  const [loading, setLoading] = useState(true);
  const [buyingId, setBuyingId] = useState(null); // tracks which item is being purchased
  const [message, setMessage] = useState(null);   // { type: 'success'|'error', text: string }

  // Fetch current coins + hearts
  useEffect(() => {
    if (!token) return;

    const fetchStats = async () => {
      try {
        const res = await fetch('https://localhost:7118/api/User/me', {
          headers: { 'Authorization': `Bearer ${token}` },
        });

        if (res.status === 401) { logout(); navigate('/login'); return; }

        if (res.ok) {
          const data = await res.json();
          setCoins(data.coins ?? data.Coins ?? 0);
          setHearts(data.hearts ?? data.Hearts ?? 5);
        }
      } catch (err) {
        console.error("Failed to load stats", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [token, logout, navigate]);

  const handleBuy = async (item) => {
    if (item.disabled) return;
    if (coins < item.cost) {
      setMessage({ type: 'error', text: "Not enough gems! Complete lessons to earn more." });
      setTimeout(() => setMessage(null), 3000);
      return;
    }

    setBuyingId(item.id);
    setMessage(null);

    try {
      const res = await fetch(`https://localhost:7118/api/Powerups/${item.action}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (res.status === 401) { logout(); navigate('/login'); return; }

      if (res.ok) {
        const data = await res.json();
        setCoins(data.coins ?? data.Coins ?? coins - item.cost);
        setHearts(data.hearts ?? data.Hearts ?? hearts);
        setMessage({ type: 'success', text: `${item.name} applied! ✅` });
      } else {
        const err = await res.json().catch(() => ({}));
        setMessage({ type: 'error', text: err.message ?? "Purchase failed." });
      }
    } catch (err) {
      console.error("Buy error", err);
      setMessage({ type: 'error', text: "Network error. Try again." });
    } finally {
      setBuyingId(null);
      setTimeout(() => setMessage(null), 3000);
    }
  };

  return (
    <Container className="main-page-container mt-4" style={{ maxWidth: '600px' }}>

      {/* Itt használjuk az új BackButton komponenst "Back" felirattal */}
      <div className="mb-4"  >
        <BackButton />
      </div>

      <h1 className="fw-bold mb-1 text-center">⚡ Power-ups</h1>
      <p className="text-muted text-center mb-4">Spend your gems to boost your learning</p>

      {/* Stats bar */}
      <Card className="p-3 mb-4 border-0 shadow-sm d-flex flex-row justify-content-center gap-5" style={{ borderRadius: '16px' }}>
        <div className="text-center">
          <div className="fw-bold fs-4" style={{ color: '#0ea5e9' }}>
            💎 {loading ? '...' : coins.toLocaleString()}
          </div>
          <small className="text-muted fw-bold">YOUR GEMS</small>
        </div>
        <div className="text-center">
          <div className="fw-bold fs-4" style={{ color: '#ef4444' }}>
            ❤️ {loading ? '...' : hearts}
          </div>
          <small className="text-muted fw-bold">YOUR HEARTS</small>
        </div>
      </Card>

      {/* Feedback message */}
      {message && (
        <div className={`alert ${message.type === 'success' ? 'alert-success' : 'alert-danger'} text-center fw-bold`}>
          {message.text}
        </div>
      )}

      {/* Items */}
      {loading ? (
        <div className="text-center p-5"><Spinner animation="border" /></div>
      ) : (
        <div className="d-flex flex-column gap-3">
          {POWERUP_ITEMS.map((item) => {
            const canAfford = coins >= item.cost;
            const isHeartRefill = item.action === 'refill_hearts';
            const heartsAlreadyFull = isHeartRefill && hearts >= 5;

            return (
              <Card
                key={item.id}
                className="p-4 border-0 shadow-sm"
                style={{
                  borderRadius: '16px',
                  opacity: item.disabled ? 0.5 : 1,
                }}
              >
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center gap-3">
                    <span style={{ fontSize: '2.5rem' }}>{item.icon}</span>
                    <div>
                      <div className="fw-bold fs-5">{item.name}</div>
                      <div className="text-muted" style={{ fontSize: '0.9rem' }}>{item.description}</div>
                    </div>
                  </div>

                  <Button
                    className="ms-3 fw-bold px-4"
                    style={{ borderRadius: '12px', minWidth: '110px', whiteSpace: 'nowrap' }}
                    variant={canAfford && !item.disabled && !heartsAlreadyFull ? 'warning' : 'secondary'}
                    disabled={item.disabled || heartsAlreadyFull || buyingId === item.id}
                    onClick={() => handleBuy(item)}
                  >
                    {buyingId === item.id ? (
                      <Spinner animation="border" size="sm" />
                    ) : heartsAlreadyFull ? (
                      'Full ❤️'
                    ) : (
                      `💎 ${item.cost.toLocaleString()}`
                    )}
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </Container>
  );
}