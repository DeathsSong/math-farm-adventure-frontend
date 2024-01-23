// MultiplicationProblem.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const MultiplicationProblem = () => {
  const [problem, setProblem] = useState(null);

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

  if (!problem) {
    return <div>Loading...</div>;
  }

  return (
    <div className="multiplication">
      <h2>{problem.question}</h2>
      <ul>
        {problem.options.map((option, index) => (
          <li key={index}>{option}</li>
        ))}
      </ul>
    </div>
  );
};

export default MultiplicationProblem;
