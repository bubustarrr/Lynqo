import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import FriendsOnline from './FriendsOnline';

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
    
    expect(screen.getByText('profilePage.friends.empty')).toBeInTheDocument();
  });

  it('megjeleníti a barátokat és kezeli a gombnyomásokat', () => {
    const mockOpenChat = jest.fn();
    const mockHandleUnfriend = jest.fn();
    
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

    expect(screen.getByText('TestUser')).toBeInTheDocument();

    const chatBtn = screen.getByText('💬');
    fireEvent.click(chatBtn);
    expect(mockOpenChat).toHaveBeenCalledTimes(1);
    expect(mockOpenChat).toHaveBeenCalledWith(mockFriends[0]);

    const unfriendBtn = screen.getByText('❌');
    fireEvent.click(unfriendBtn);
    expect(mockHandleUnfriend).toHaveBeenCalledTimes(1);
    expect(mockHandleUnfriend).toHaveBeenCalledWith(10); 
  });
});