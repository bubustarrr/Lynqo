import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import FriendsOnline from './FriendsOnline';

// Hamisítjuk a fordító és az URL feloldó függvényeket
const mockT = (key) => key; 
const mockResolveMediaUrl = (url) => url;

describe('FriendsOnline Component', () => {
  it('megjeleníti az üres üzenetet, ha nincsenek barátok', () => {
    render(
      <FriendsOnline 
        friendsList={[]} 
        t={mockT} 
        resolveMediaUrl={mockResolveMediaUrl} 
      />
    );
    
    // Ellenőrizzük, hogy az üres lista üzenet (a fordítás kulcsa) megjelenik-e
    expect(screen.getByText('profilePage.friends.empty')).toBeInTheDocument();
  });

  it('megjeleníti a barátokat és kezeli a gombnyomásokat', () => {
    const mockOpenChat = jest.fn();
    const mockHandleUnfriend = jest.fn();
    
    // Készítünk egy kamu barát listát
    const mockFriends = [
      { friendshipId: 1, userId: 10, username: 'TestUser', isOnline: true }
    ];

    render(
      <FriendsOnline 
        friendsList={mockFriends} 
        openChat={mockOpenChat} 
        handleUnfriend={mockHandleUnfriend}
        t={mockT} 
        resolveMediaUrl={mockResolveMediaUrl} 
      />
    );

    // 1. Ellenőrizzük, hogy a név megjelenik-e
    expect(screen.getByText('TestUser')).toBeInTheDocument();

    // 2. Chat gomb tesztelése
    const chatBtn = screen.getByText('💬');
    fireEvent.click(chatBtn);
    expect(mockOpenChat).toHaveBeenCalledTimes(1);
    expect(mockOpenChat).toHaveBeenCalledWith(mockFriends[0]);

    // 3. Törlés gomb tesztelése
    const unfriendBtn = screen.getByText('❌');
    fireEvent.click(unfriendBtn);
    expect(mockHandleUnfriend).toHaveBeenCalledTimes(1);
    expect(mockHandleUnfriend).toHaveBeenCalledWith(10); // A userId-t (10) kell megkapnia
  });
});