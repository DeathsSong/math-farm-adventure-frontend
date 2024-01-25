// SubtractionProblem.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const SubtractionProblem = () => {
  const [problem, setProblem] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/problems/subtraction/random");
        setProblem(response.data);
      } catch (error) {
        console.error("Failed to fetch problem:", error.message);
      }
    };

    fetchProblem();
  }, []);

  const handleAnswerSelection = (selectedOption) => {
    setSelectedAnswer(selectedOption);
  
    const correctOption = String(problem.correctOption);
    const isCorrect = String(selectedOption) === correctOption;
    setIsCorrect(isCorrect);
  
    if (isCorrect) {
      console.log('Correct answer!');
    } else {
      console.log('Incorrect answer. Try again!');
    }
  };

  if (!problem) {
    return <div>Loading...</div>;
  }

  if (!problem) {
    return <div>Loading...</div>;
  }

  return (
    <div className="subtraction">
      <h2>{problem.question}</h2>
      <ul>
        {problem.options.map((option, index) => (
          <li key={index} onClick={() => handleAnswerSelection(option)}>
          {option}
          </li>
        ))}
      </ul>
      <p>{selectedAnswer !== null && `Selected Answer: ${selectedAnswer}`}</p>
      {isCorrect !== null && <p>{isCorrect ? 'Correct answer!' : 'Incorrect answer. Try again!'}</p>}
    </div>
  );
};

export default SubtractionProblem;
