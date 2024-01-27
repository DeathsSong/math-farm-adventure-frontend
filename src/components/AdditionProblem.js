// AdditionProblem.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import '../styles/AdditionProblem.css';
import {useNavigate} from 'react-router-dom';

const AdditionProblem = () => {
  const [problem, setProblem] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  const navigate = useNavigate();  

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/problems/addition/random");
        setProblem(response.data);
      } catch (error) {
        console.error("Failed to fetch problem:", error.message);
      }
    };

    fetchProblem();
  }, []);

  const handleAnswerSelection = async (selectedOption) => {
    setSelectedAnswer(selectedOption);
  
    const correctOption = String(problem.correctOption);
    const isCorrect = String(selectedOption) === correctOption;
    setIsCorrect(isCorrect);
  
    if (isCorrect) {

      try {
        await axios.post("http://localhost:5000/api/barnComplete", {
          barnComplete: true,
        });
  
        console.log('Correct answer!');
      } catch (error) {
        console.error("Failed to change barnComplete to true:", error.message);
      }
    } else {
      console.log('Incorrect answer. Try again!');
    }
  };

const handleNavigate = () => {
  navigate('/game')
}


  if (!problem) {
    return <div>Loading...</div>;
  }

  return (
    <div className="addition-page">
      <div className='addition-background'></div>
      <h1 className="question-asker">Oh no! The barn is closed and the cows need to be let out and fed! The only way you can do that is by solving the equation below</h1>
      <div className="addition-question-and-answers">
      <h2>{problem.question}</h2>
      <ul>
        {problem.options.map((option, index) => (
          <li className="addition-answers" key={index} onClick={() => handleAnswerSelection(option)}>
            {option}
          </li>
        ))}
      </ul>
      <div className="answer-result">
      <p>{selectedAnswer !== null && `Selected Answer: ${selectedAnswer}`}</p>
      {isCorrect && <button className="correct-answer-button" onClick={handleNavigate}>That was correct!</button>}
      </div>
      </div>
    </div>
  );
};

export default AdditionProblem;
