import React, { useState, useEffect } from 'react';
import '../styles/GamePage.css';
import { Link, useNavigate } from 'react-router-dom';

const GamePage = () => {
  const navigate = useNavigate();

  const fetchProblems = async (type) => {
    try {
      const response = await fetch(`http://localhost:5000/api/problems/${type}`);
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        console.error(`Failed to fetch ${type} problems.`);
        return [];
      }
    } catch (error) {
      console.error(`Error fetching ${type} problems:`, error);
      return [];
    }
  };

  const handleLinkClick = async (type) => {
    const problems = await fetchProblems(type);
    // Do something with the fetched problems (e.g., navigate to a new page)
    console.log(`${type} problems:`, problems);
    // You can customize this logic based on your requirements
    navigate(`/problems/${type}`);
  };

  return (
    <div className='game-page'>
      <div className='farm-background'></div>
      <button className='addition' onClick={() => handleLinkClick('addition')}>
        Addition
      </button>
      <button className='subtraction' onClick={() => handleLinkClick('subtraction')}>
        Subtraction
      </button>
      <button className='multiplication' onClick={() => handleLinkClick('multiplication')}>
        Multiplication
      </button>
      <button className='division' onClick={() => handleLinkClick('division')}>
        Division
      </button>
    </div>
  );
};

export default GamePage;
