// AppRouter.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GameForm from '../components/GameForm';
import GamePage from '../components/GamePage';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GameForm />} />
        <Route path="/game" element={<GamePage />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
