import './App.css';

function App() {
  return (
    <div className="App">
      <h2>Leave a review</h2>
      <div className="review-port">
        <label>Movie Name:</label>
        <input type="text" name="movieName" />
        <label>Movie review:</label>
        <input type="text" name="review" />

        <button>Submit</button>
      </div>
    </div>
  );
}

export default App;
