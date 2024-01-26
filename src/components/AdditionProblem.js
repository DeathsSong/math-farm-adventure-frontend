// AdditionProblem.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import '../styles/AdditionProblem.css'

const AdditionProblem = () => {
  const [problem, setProblem] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

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
      {isCorrect !== null && <p>{isCorrect ? 'Correct answer!' : 'Incorrect answer. Try again!'}</p>}
      </div>
      </div>
    </div>
  );
};

export default AdditionProblem;
