// DivisionProblem.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import '../styles/DivisionProblem.css';
import { useNavigate } from "react-router-dom";

const DivisionProblem = () => {
  const [problem, setProblem] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/problems/division/random");
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
        await axios.post("http://localhost:5000/api/chickenComplete", {
          chickenComplete: true,
        });
  
        console.log('Correct answer!');
      } catch (error) {
        console.error("Failed to change chickenComplete to true:", error.message);
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
    <div className="division-page">
      <div className="division-background"></div>
      <h1 className="question-asker">The chickens need to be let out and fed! Solve the equation below to take care of your coop!</h1>
      <div className="division-questions-and-answers">
      <h2>{problem.question}</h2>
      <ul>
      {problem.options.map((option, index) => (
          <li className="division-answers" key={index} onClick={() => handleAnswerSelection(option)}>
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

export default DivisionProblem;
