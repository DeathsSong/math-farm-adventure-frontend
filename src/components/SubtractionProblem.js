// SubtractionProblem.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const SubtractionProblem = () => {
  const [problem, setProblem] = useState(null);

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

  if (!problem) {
    return <div>Loading...</div>;
  }

  return (
    <div className="subtraction">
      <h2>{problem.question}</h2>
      <ul>
        {problem.options.map((option, index) => (
          <li key={index}>{option}</li>
        ))}
      </ul>
    </div>
  );
};

export default SubtractionProblem;
