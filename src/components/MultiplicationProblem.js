// MultiplicationProblem.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import '../styles/MultiplicationProblem.css';
import { useNavigate } from "react-router-dom";

const MultiplicationProblem = () => {
  const [problem, setProblem] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/problems/multiplication/random");
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
        await axios.post("http://localhost:5000/api/penComplete", {
          penComplete: true,
        });
  
        console.log('Correct answer!');
      } catch (error) {
        console.error("Failed to change penComplete to true:", error.message);
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
    <div className="multiplication-page">
      <div className='multiplication-background'></div>
      <h1 className="question-asker">Your piggies are hiding because they're so hungry! Solve the equation below to fill their troughs bring them out of hiding!</h1>
      <div className="multiplication-question-and-answers">
      <h2>{problem.question}</h2>
      <ul>
        {problem.options.map((option, index) => (
          <li className="multiplication-answers" key={index} onClick={() => handleAnswerSelection(option)}>
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

export default MultiplicationProblem;
