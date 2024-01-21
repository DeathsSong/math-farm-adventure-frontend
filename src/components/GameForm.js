import React, { useState } from 'react';

const GameForm = () => {
  const [playerName, setPlayerName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send a network request to your backend
    try {
        const response = await fetch('http://localhost:5000/api/games', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ playerName, farmName: 'Your Farm Name' }),
          });

      if (response.ok) {
        console.log('Game created successfully!');
      } else {
        const data = await response.json();
        console.error('Error creating game:', data.error);
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Player Name:
        <input
          type="text"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
        />
      </label>
      <button type="submit">Start Game</button>
    </form>
  );
};

export default GameForm;