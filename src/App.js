// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GameForm from './components/GameForm';
import GamePage from './components/GamePage';
import AdditionProblem from './components/AdditionProblem';
import SubtractionProblem from './components/SubtractionProblem';
import MultiplicationProblem from './components/MultiplicationProblem';
import DivisionProblem from './components/DivisionProblem';
import '../src/styles/App.css'
import AdminPage from './components/AdminPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GameForm />} />
        <Route path="/game" element={<GamePage />} />
        <Route path="/problems/addition" element={<AdditionProblem />} />
        <Route path="/problems/subtraction" element={<SubtractionProblem/>}></Route>
        <Route path="/problems/multiplication" element={<MultiplicationProblem/>}></Route>
        <Route path="/problems/division" element={<DivisionProblem/>}></Route>
        <Route path="/admin" element={<AdminPage/>}></Route>
      </Routes>
    </Router>
  );
};

export default App;
