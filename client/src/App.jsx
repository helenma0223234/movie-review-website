/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import './App.css';

function App() {
  const [movieName, setMovieName] = useState('');
  const [review, setReview] = useState('');

  return (
    <div className="App">
      <h2>Leave a review</h2>
      <div className="review-port">
        <label>Movie Name:</label>
        <input type="text" name="movieName" onChange={(e) => { setMovieName(e.target.value); }} />
        <label>Movie review:</label>
        <input type="text" name="review" onChange={(e) => { setReview(e.target.value); }} />

        <button type="submit">Submit</button>
      </div>
    </div>
  );
}

export default App;
