import React, { useState } from 'react';

import Button from './components/Button';
import FormAddFriend from './components/FormAddFriend';
import FormSplitBill from './components/FormSplitBill';
import FriendsList from './components/FriendsList';
import { initialFriends } from './initialFriends';

const App = () => {
  const [friends, setFriends] = useState(initialFriends);
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);

  const handleShowAddFriend = () => {
    setShowAddFriend((show) => !show);
  }

  const handleAddFriend = (friend) => {
    setFriends((friends) => [...friends, friend]);
    setShowAddFriend(false);
  }

  const handleSelection = (friend) => {
    // setSelectedFriend(friend);
    setSelectedFriend((currSelected) => 
      currSelected?.id === friend.id ? null : friend
    );
    setShowAddFriend(false);
  }

  const handleSplitBill = (value) => {
    setFriends((friends) => friends.map((friend) => 
      friend.id === selectedFriend.id 
        ? { ...friend, balance: friend.balance + value}
        : friend
      )
    );

    setSelectedFriend(null);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList 
          friends={friends} 
          onSelection={handleSelection} 
          selectedFriend={selectedFriend}  
        />
        {showAddFriend && (
          <FormAddFriend 
            onAddFriend={handleAddFriend}
          />
        )}
        <Button onClick={handleShowAddFriend}>
          {showAddFriend ? "Close" : "Add Friend"}
        </Button>
      </div>
      {selectedFriend && (
        <FormSplitBill 
          selectedFriend={selectedFriend} 
          onSplitBill={handleSplitBill}   
        />
      )}
    </div>
  );
}

export default App;
