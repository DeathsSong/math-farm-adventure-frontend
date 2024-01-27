import React, { useState, useEffect } from 'react';
import '../styles/GamePage.css';
import { useNavigate } from 'react-router-dom';

const GamePage = () => {
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);

  const [barnComplete, setBarnComplete] = useState(false);
  const [chickenComplete, setChickenComplete] = useState(false);
  const [cropComplete, setCropComplete] = useState(false);
  const [penComplete, setPenComplete] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/game");
        const data = await response.json();
        if (response.ok) {
          setBarnComplete(data.barnComplete);
          setChickenComplete(data.chickenComplete);
          setCropComplete(data.cropComplete);
          setPenComplete(data.penComplete);
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
      <div className='farm-background'/>

      {barnComplete && (
        <div className='barn-overlay'>
          <img src='./completed-barn.gif' alt='Barn' />
        </div>
      )}

      {chickenComplete && (
        <div className='chicken-overlay'>
          <img src='./chicken-coop-with-chickens.gif' alt='Chickens'/>
          </div>
      )}

      {cropComplete && (
        <div className='crop-overlay'>
          <img src='./crop-grown.png' alt='grown-crop'/>
          </div>
      )}

      {penComplete && (
        <div className='pen-overlay'>
          <img src='./completed-field.gif' alt='pig-pen'/>
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
            <p>Welcome to your Farm! We have some work to do here to take care of everything.</p>
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
