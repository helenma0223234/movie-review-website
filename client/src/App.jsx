/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import './App.css';

function App() {
  const [movieName, setMovieName] = useState('');

  return (
    <div className="App">
      <h2>Leave a review</h2>
      <div className="review-port">
        <label>Movie Name:</label>
        <input type="text" name="movieName" />
        <label>Movie review:</label>
        <input type="text" name="review" />

        <button type="submit">Submit</button>
      </div>
    </div>
  );
}

export default App;
