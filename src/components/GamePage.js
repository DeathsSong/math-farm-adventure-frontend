import React, { useState, useEffect } from 'react';
import '../styles/GamePage.css';
import { useNavigate } from 'react-router-dom';

const GamePage = () => {
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);

  
  
  const [barnComplete, setBarnComplete] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/game");
        const data = await response.json();
        if (response.ok) {
          setBarnComplete(data.barnComplete);
        } else {
          console.error("Failed to fetch barnComplete:", data);
        }
      } catch (error) {
        console.error("Error while fetching barnComplete:", error.message);
      }
    };
  
    fetchData();
    setModalOpen(true);
  }, []);


useEffect(() => {
  if (barnComplete) {

  }
}, [barnComplete])


  const handleLinkClick = async (type) => {
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
      
      {barnComplete ? (
        <div className="farm-background">
          <p>Barn is Complete</p>
        </div>
      ) : (
        <div className="farm-background">
          <p>Work on completing the barn!</p>
        </div>
      )}

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
