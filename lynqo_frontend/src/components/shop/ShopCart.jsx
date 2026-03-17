import React from 'react';
import { useCart } from '../../context/CartContext';
import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa';
import { useTranslation } from "react-i18next";

export default function ShopCart({ onCheckout }) {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();
  const { t } = useTranslation();

  if (cartItems.length === 0) {
    return <div className="p-4 text-center">{t('merch.cart.empty')}</div>;
  }

  return (
    <div className="cart-container p-3">
      <h4 className="mb-4">{t('merch.cart.title')}</h4>
      {cartItems.map(item => (
        <div key={item.id} className="d-flex align-items-center mb-3 pb-3 border-bottom">
          <img src={item.images[0]} alt={item.name} style={{ width: '60px', borderRadius: '8px' }} />
          <div className="ms-3 flex-grow-1">
            <h6 className="mb-0">{t(`merch.items.${item.name.toLowerCase().replace(' ', '')}`)}</h6>
            <small className="text-muted">${item.price}</small>
          </div>
          <div className="d-flex align-items-center gap-2">
            <button className="btn btn-sm btn-outline-secondary" onClick={() => item.quantity === 1 ? removeFromCart(item.id) : updateQuantity(item.id, -1)}>
              <FaMinus size={10}/>
            </button>
            <span>{item.quantity}</span>
            <button className="btn btn-sm btn-outline-secondary" onClick={() => updateQuantity(item.id, 1)}>
              <FaPlus size={10}/>
            </button>
            <button className="btn btn-sm text-danger ms-2" onClick={() => removeFromCart(item.id)}>
              <FaTrash />
            </button>
          </div>
        </div>
      ))}
      <div className="mt-4 pt-2 border-top">
        <div className="d-flex justify-content-between fw-bold">
          <span>{t('merch.cart.total')}:</span>
          <span>${cartTotal}</span>
        </div>
        <button className="read-more-btn w-100 mt-3" onClick={onCheckout}>
          {t('merch.cart.checkoutBtn')}
        </button>
      </div>
    </div>
  );
}