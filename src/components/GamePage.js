import React, { useState, useEffect } from 'react';
import '../styles/GamePage.css';
import { Link, useNavigate } from 'react-router-dom';

const GamePage = () => {
  const navigate = useNavigate();
  
  
  
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    setModalOpen(true);
  }, []);



  const fetchProblems = async (type) => {
    try {
      const response = await fetch(`http://localhost:5000/api/problems/${type}`);
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        return [];
      }
    } catch (error) {
      return [];
    }
  };

  const handleLinkClick = async (type) => {
    const problems = await fetchProblems(type);
    navigate(`/problems/${type}`);
  };


const handleModalOpen = () => {
  setModalOpen(true);
};

const handleModalClose = () => {
  setModalOpen(false);
};



  return (
    <div className='game-page'>
      <div className='farm-background'></div>
      <button className='addition' onClick={() => handleLinkClick('addition')}>
      </button>
      <button className='subtraction' onClick={() => handleLinkClick('subtraction')}>
      </button>
      <button className='multiplication' onClick={() => handleLinkClick('multiplication')}>
      </button>
      <button className='division' onClick={() => handleLinkClick('division')}>
      </button>


      {isModalOpen && (
        <div className='instruction-modal'>
          <button className='close-modal-button' autoFocus onClick={handleModalClose}>Close Instructions</button>
          <div className='modal-text'>
            <p>Welcome to (insert farm name here) Farm, (insert player name here)! We have some work to do here to take care of everything.</p>
            <p>In order to get the chores done, we have to answer some math questions! Click on a section of farm, and answer the question to get that chore done.</p>
            <p>If you need to see this message again, click on your house in the middle of the farm.</p>
            <p>Good luck, and happy learning!</p>
          </div>
        </div>
      )}
      <button className='open-modal-button' onClick={handleModalOpen}></button>



    </div>
  );
};

export default GamePage;
