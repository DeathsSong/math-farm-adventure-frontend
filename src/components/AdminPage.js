import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/AdminPage.css';


//Show all the problems with their data
const ProblemTable = ({ problem, onDelete, onEdit }) => {
  const questionDeleteButton = () => {
    onDelete(problem._id);
  };

  const questionEditButton = () => {
    onEdit(problem._id);
  };

  return (
    <tr>
      <td>{problem._id}</td>
      <td>{problem.question}</td>
      <td>{Array.isArray(problem.options) ? problem.options.join(', ') : problem.options}</td>
      <td>{problem.correctOption}</td>
      <td>{problem.problemType}</td>
      <td>
        <button onClick={questionEditButton}>Edit</button>
        <button onClick={questionDeleteButton}>Delete</button>
      </td>
    </tr>
  );
};



//Create new question
const CreateNewQuestion = ({ onCreate }) => {
  const [formData, setFormData] = useState({
    question: '',
    options: '',
    correctOption: '',
    problemType: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      //Convert the options to an array by splitting the string using commas
      const optionsArray = formData.options.split(',').map((option) => option.trim());
  
      //Ensure that optionsArray has exactly 4 answer options
      if (optionsArray.length !== 4) {
        console.error('Please enter exactly 4 options.');
        return;
      }
  
      //Send a POST request to create a new question
      const response = await axios.post('http://localhost:5000/api/admin/problems', {
        ...formData,
        options: optionsArray,
      });
  
      //Refresh the problems list
      onCreate(response.data);
  
      //Clear the form data after a new question has been submitted
      setFormData({
        question: '',
        options: '',
        correctOption: '',
        problemType: '',
      });
    } catch (error) {
      console.error('Failed to create a new problem');
    }
  };




  return (
    <form onSubmit={handleSubmit}>
      <label>
        Question:
        <input
          type="text"
          name="question"
          value={formData.question}
          onChange={handleChange}
        />
      </label>

      <label>
        Options (separate by comma):
        <input
          name="options"
          value={formData.options}
          onChange={handleChange}
        />
      </label>

      <label>
        Correct Option:
        <input
          type="text"
          name="correctOption"
          value={formData.correctOption}
          onChange={handleChange}
        />
      </label>

      <label>
        Problem Type:
        <input
          type="text"
          name="problemType"
          value={formData.problemType}
          onChange={handleChange}
        />
      </label>

      <button type="submit">Create Problem</button>
    </form>
  );
};



const AdminPage = () => {
  const [problems, setProblems] = useState([]);
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [editFormData, setEditQuestionData] = useState({
    question: '',
    options: '',
    correctOption: '',
    problemType: '',
  });

  //Only change the overflow to visible on the admin page
  useEffect(() => {
    document.body.style.overflow = 'visible';

    return () => {
      document.body.style.overflow = 'hidden';
    };
  }, []);

  //Make a GET request for all the problems from the server
  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/admin/problems');
        setProblems(response.data);
      } catch (error) {
        console.error('Failed to fetch all problems');
      }
    };

    fetchProblems();
  }, []);

  //Send DELETE request to the server
  const deleteQuestion = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/problems/${id}`);
      const updatedProblems = problems.filter((problem) => problem._id !== id);
      setProblems(updatedProblems);
      console.log(`${id} has been deleted`);
    } catch (error) {
      console.error('Failed to delete problem');
    }
  };

  //Function for editing questions
  const editQuestion = (id) => {
    const selected = problems.find((problem) => problem._id === id);
    setSelectedProblem(selected);

    //Populates the form data for editing the questions
    setEditQuestionData({
      question: selected.question,
      options: Array.isArray(selected.options) ? selected.options.join('\n') : selected.options,
      correctOption: selected.correctOption,
      problemType: selected.problemType,
    });
  };

  //Sends a PUT request to update a specific problem's data
  const updateQuestion = async () => {
    try {
      await axios.put(`http://localhost:5000/api/admin/problems/${selectedProblem._id}`, editFormData);

      const updatedProblems = problems.map((problem) =>
        problem._id === selectedProblem._id ? { ...problem, ...editFormData } : problem
      );

      setProblems(updatedProblems);
      console.log(`${selectedProblem._id} has been updated`);

      setSelectedProblem(null);
      setEditQuestionData({
        question: '',
        options: '',
        correctOption: '',
        problemType: '',
      });
    } catch (error) {
      console.error('Failed to update problem');
    }
  };

  //Updates the editFormData state when there are changes to the edit form
  const handleEditFormChange = (e) => {
    setEditQuestionData({
      ...editFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreate = (newProblem) => {
    setProblems([...problems, newProblem]);
  };

  return (
    <div className='admin-page'>
      <h2>All Problems</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Question</th>
            <th>Options</th>
            <th>Correct Option</th>
            <th>Problem Type</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {problems.map((problem) => (
            <ProblemTable
              key={problem._id}
              problem={problem}
              onDelete={deleteQuestion}
              onEdit={editQuestion}
            />
          ))}
        </tbody>
      </table>
      {selectedProblem && (
        <div>
          <h2>Edit Problem</h2>
          <form>
            <label>
              Question:
              <input
                type="text"
                name="question"
                value={editFormData.question}
                onChange={handleEditFormChange}
              />
            </label>

            
            <label>
              Options:
              <input
                name="options"
                value={editFormData.options}
                onChange={handleEditFormChange}
              />
            </label>



            <label>
              Correct Option:
              <input
                type="text"
                name="correctOption"
                value={editFormData.correctOption}
                onChange={handleEditFormChange}
              />
            </label>
            <label>
              Problem Type:
              <input
                type="text"
                name="problemType"
                value={editFormData.problemType}
                onChange={handleEditFormChange}
              />
            </label>
            <button type="button" onClick={updateQuestion}>
              Update
            </button>
          </form>
        </div>
      )}
      <div>
        <h2>Create New Problem</h2>
        <CreateNewQuestion onCreate={handleCreate} />
      </div>
    </div>
  );
};

export default AdminPage;