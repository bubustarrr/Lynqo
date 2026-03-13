import React, { useState, useContext } from 'react';
import './MerchPage.css';
import { AuthContext } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

// Komponensek
import BackButton from '../components/common/BackButton'; 
import MerchFilters from '../components/shop/MerchFilters'; 
import ShopItems, { MERCH_ITEMS } from '../components/shop/ShopItem'; 
import ShopCart from '../components/shop/ShopCart'; 
import PaymentModal from '../components/shop/PaymentModal'; // AZ ÚJ KOMPONENS

export default function MerchPage() {
  const { token } = useContext(AuthContext);
  const { clearCart, cartTotal } = useCart();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);

  const filteredItems = MERCH_ITEMS.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="news-page-container">
      <BackButton to="/shop" />

      <header className="news-header mt-3">
        <h1 className="news-hero-title">Lynqo Store</h1>
        <p className="news-subtitle">Exclusive gear for language lovers</p>
      </header>
      
      <div className="news-layout">
        <main className="shop-main-content">
          <h2 className="column-title">Our Collection</h2>
          <ShopItems items={filteredItems} />
        </main>

        <aside className="sidebar-wrapper">
          <h2 className="column-title">Filters & Cart</h2>
          <MerchFilters 
            searchTerm={searchTerm} setSearchTerm={setSearchTerm}
            selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}
          />
          <div className="cart-sidebar-section border-top pt-4">
             <ShopCart onCheckout={() => setIsPaymentOpen(true)} />
          </div>
        </aside>
      </div>

      {/* AZ ÚJ KISZERVEZETT MODAL HASZNÁLATA */}
      <PaymentModal 
        show={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
        onSuccess={clearCart}
        totalAmount={cartTotal}
        token={token}
      />
    </div>
  );
}