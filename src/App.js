
import './App.css';
import React from 'react';
import GameForm from './components/GameForm';

const App = () => {
  const handleGameSubmit = (playerName) => {
    console.log('Player Name:', playerName);
    console.log('Form submitted! Player Name:', playerName);
  };

  return (
    <div>
      <h1>Math Farm Adventure</h1>
      <GameForm onGameSubmit={handleGameSubmit} />
    </div>
  );
};

export default App;
