/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import './App.css';
import Axios from 'axios';
import { produce } from 'immer';


import { GiRingedPlanet } from 'react-icons/gi';

const colors = {
  orange: "#8BC34A",
  grey: "#a9a9a9"
};

function App() {
  const [movieName, setMovieName] = useState('');
  const [review, setReview] = useState('');
  const [reviewList, setReviewList] = useState([]);
  const [newReview, setNewReview] = useState('');
  // for star rating
  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);
  const stars = Array(5).fill(0)
  // for alert
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    Axios.get('http://localhost:3001/api/get')
    .then((response) => {
      console.log(response.data);
      setReviewList(response.data);
    })
  }, []);

  const submitReview = () => {
    if (movieName === '' || review === '' || currentValue === 0) {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 1500);
      return;
    }
    Axios.post('http://localhost:3001/api/insert', {
      movieName: movieName, 
      movieReview: review,
      stars: currentValue
    }).then (() => {
      // add it to render locally too
      setReviewList(produce(reviewList, draft => {
        draft.push({movieName: movieName, movieReview: review, stars:currentValue});
      }));
    }).then(() => {
      // setCurrentValue(0);
      setMovieName('');
      setReview('');
    });
  };

  const deleteReview = (movieName) => {
    Axios.delete(`http://localhost:3001/api/delete/${movieName}`);
    setReviewList(produce(reviewList, draft => {
      // filter out the review and del it
      draft = draft.filter(review => review.movieName !== movieName);
      return draft;
    }));
  };

  const updateReview = (movieName) => {
    if (movieName === '' || review === '' || currentValue === 0) {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 1500);
      return;
    }
    Axios.put("http://localhost:3001/api/update", {
      movieName: movieName, 
      movieReview: newReview,
    }).then ( () => {
      setReviewList(produce(reviewList, draft => {
        const itemIndex = draft.findIndex(item => item.movieName === movieName);
        if (itemIndex !== -1) {
          draft[itemIndex].movieReview = newReview;
        }
      }));
      setNewReview('');
    })
  }

  /* for start ratings */
  const handleClick = value => {
    setCurrentValue(value)
  };

  const handleMouseOver = newHoverValue => {
    setHoverValue(newHoverValue)
  };

  const handleMouseLeave = () => {
    setHoverValue(undefined)
  }

  // mapping stars
  const displayStars = (stars) => {
    const starArray = [];
    for (let i = 1; i <= 5; i++) {
      starArray.push(
        <GiRingedPlanet
          key={i}
          size={24}
          color={i <= stars ? colors.orange : colors.grey}
          style={{
            marginRight: 10,
            cursor: "default"
          }}
        />
      );
    }
    return starArray;
  };

  return (
    
    <div className="App">
      <div className='img' role="img"></div>
      <div className='content'>
        <div className="review-port">
          <h2>Leave a review for a movie!</h2>
          <label>Movie Name:</label>
          <input type="text" name="movieName" value={movieName} onChange={(e) => { setMovieName(e.target.value); }} />
          <label>Movie review:</label>
          <input type="text" name="review" value={review} onChange={(e) => { setReview(e.target.value); }} />

          <div className='stars-wrapper'>
            {stars.map((_, index) => {
              return (
                <GiRingedPlanet
                  key={index}
                  size={28}
                  onClick={() => handleClick(index + 1)}
                  onMouseOver={() => handleMouseOver(index + 1)}
                  onMouseLeave={handleMouseLeave}
                  color={(hoverValue || currentValue) > index ? colors.orange : colors.grey}
                  style={{
                    marginRight: 10,
                    cursor: "pointer"
                  }}
                />
              )
            })}
          </div>
          <button type="submit" onClick={submitReview}>Submit</button>
          {showAlert && (
          <div className="alert">
            Please fill in everything.
          </div>
          )}
        </div>
        <div className='card-list'>
          {reviewList.map((val)=> {
            return (
              <div className='card' key={val.id}>
                <h2>{val.movieName}</h2>
                <div className="card-stars">
                  {displayStars(val.stars)}
                </div>
                <p>{val.movieReview}</p>
                <div className='card-footer'>
                  <button onClick={() => deleteReview(val.movieName)}>Delete</button>
                  <div id="update-text-box">
                    <input type="text" onChange={(e) => { setNewReview(e.target.value); }}/>
                  </div>
                  <button onClick={() => updateReview(val.movieName)}>Update</button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
