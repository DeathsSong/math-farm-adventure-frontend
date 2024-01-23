// AdditionProblem.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const AdditionProblem = () => {
  const [problem, setProblem] = useState(null);

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

  if (!problem) {
    return <div>Loading...</div>;
  }

  return (
    <div className="addition">
      <h2>{problem.question}</h2>
      <ul>
        {problem.options.map((option, index) => (
          <li key={index}>{option}</li>
        ))}
      </ul>
    </div>
  );
};

export default AdditionProblem;
