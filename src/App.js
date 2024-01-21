// App.js
import React from 'react';
import GameForm from './components/GameForm';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GamePage from './components/GamePage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GameForm />} />
        <Route path="/game" element={<GamePage />} />
      </Routes>
    </Router>
  );
};

export default App;
