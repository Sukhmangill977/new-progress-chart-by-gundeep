import React, { useState } from 'react';
import './App.css'; // Import your CSS file for styling (optional)
import Navbar from './components/Navbar'; // Import Navbar component
import { BrowserRouter as Router } from 'react-router-dom';

const App = () =>{
  const [subject1Marks, setSubject1Marks] = useState(45); // Default for subject 1
  const [subject2Marks, setSubject2Marks] = useState(45); // Default for subject 2

  const handleSubject1Change = (event) => {
    const enteredMarks = parseInt(event.target.value);
    if (!isNaN(enteredMarks) && enteredMarks >= 0 && enteredMarks <= 60) {
      setSubject1Marks(enteredMarks);
    } else {
      alert('Please enter a valid mark between 0 and 60 for Subject 1.');
    }
  };

  const handleSubject2Change = (event) => {
    const enteredMarks = parseInt(event.target.value);
    if (!isNaN(enteredMarks) && enteredMarks >= 0 && enteredMarks <= 60) {
      setSubject2Marks(enteredMarks);
    } else {
      alert('Please enter a valid mark between 0 and 60 for Subject 2.');
    }
  };

  const getProgressPercentage = (marks) => {
    return Math.round((marks / 60) * 100);
  };

  return (
    <Router>
    <div>
        <Navbar /> 
    <div className="container"> {/* Container with white background */}
      <div className="content"> {/* Main content container */}
        <h1 className="black-text">Progress Chart</h1> {/* Black title */}
        <div>
          <h2>Subject 1</h2>
          <input
            type="number"
            value={subject1Marks}
            onChange={handleSubject1Change}
            placeholder="Enter marks (0-60)"
          />
          <p className="black-text">Progress: {getProgressPercentage(subject1Marks)}%</p> {/* Black progress text */}
          <div className="progress-bar">
            <div
              className="progress"
              style={{ width: `${getProgressPercentage(subject1Marks)}%` }}
            ></div>
          </div>
        </div>
        <div>
          <h2>Subject 2</h2>
          <input
            type="number"
            value={subject2Marks}
            onChange={handleSubject2Change}
            placeholder="Enter marks (0-60)"
          />
          <p className="black-text">Progress: {getProgressPercentage(subject2Marks)}%</p> {/* Black progress text */}
          <div className="progress-bar">
            <div
              className="progress"
              style={{ width: `${getProgressPercentage(subject2Marks)}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
    </div>
    </Router>
  );
}

export default App;
