// GameForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/GameForm.css';

const GameForm = () => {
  const [playerName, setPlayerName] = useState('');
  const [farmName, setFarmName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (playerName && farmName) {
      // Both player name and farm name are filled out, proceed with the fetch call
      const response = await fetch('http://localhost:5000/api/games', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ playerName, farmName }),
      });

      // Check if the response indicates success
      if (response.ok) {
        console.log('Game created successfully!');
        // Redirect to the game page after successful creation
        navigate('/game');
      } else {
        console.log('Failed to create game.');
      }
    } else {
      console.log('Both player name and farm name are required.');
    }
  };

  return (
    <div className='game-form'>
      <h1>Hello Farmer!</h1>
      <h2>Please start by telling us your name and what you'd like to call your farm!</h2>
    <form className='input-forms' onSubmit={handleSubmit}>
      
      <input
        type="text"
        placeholder="Enter Player Name"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter Farm Name"
        value={farmName}
        onChange={(e) => setFarmName(e.target.value)}
      />

      <button className='start-game-button' type="submit">Let's Go!</button>
    </form>
    </div>
  );
};

export default GameForm;
