// GamePage.js
import React, { useState, useEffect } from 'react';
import '../styles/GamePage.css';

const GamePage = () => {
  // State to manage math problems
  const [problems, setProblems] = useState({
    addition: [],
    subtraction: [],
    multiplication: [],
    division: [],
  });

  useEffect(() => {
    const fetchProblems = async (type) => {
      try {
        const response = await fetch(`http://localhost:5000/api/problems/${type}`);
        if (response.ok) {
          const data = await response.json();
          setProblems((prevProblems) => ({ ...prevProblems, [type]: data }));
        } else {
          console.error('Failed to fetch problems.');
        }
      } catch (error) {
        console.error('Error fetching problems:', error);
      }
    };

    // Fetch problems for each type
    fetchProblems('addition');
    fetchProblems('subtraction');
    fetchProblems('multiplication');
    fetchProblems('division');
  }, []);

  return (
    <div>
      <div className="addition">Top Left (Addition): {problems.addition.map((problem) => problem.question)}</div>
      <div className="subtraction">Top Right (Subtraction): {problems.subtraction.map((problem) => problem.question)}</div>
      <div className="multiplication">Bottom Left (Multiplication): {problems.multiplication.map((problem) => problem.question)}</div>
      <div className="division">Bottom Right (Division): {problems.division.map((problem) => problem.question)}</div>
    </div>
  );
};

export default GamePage;