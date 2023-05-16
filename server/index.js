const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const mysql = require('mysql');
const cors = require('cors');

// server pass
const db = mysql.createPool({
    host: 'localhost',
    user: 'test',
    password: 'password',
    database: 'MovieReviewsDatabase',
});

// middle wares
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// setting up CRUD api endpoints
app.get('/api/get', (req, res) => {
    const sqlSelect = "SELECT * FROM movie_reviews";
    db.query(sqlSelect, (err, result) => {
        if (err) {
            console.log("Error:", err);
            res.status(204).send('Error selecting data from database');
        } else {
            console.log("sent GET result...");
            res.send(result);
        }
    });
})


app.post("/api/insert", (req, res) => {
    const movieName = req.body.movieName;
    const movieReview = req.body.movieReview;
    const movieRating = req.body.stars;

    const sqlInsert = "INSERT INTO movie_reviews (movieName, movieReview, stars) VALUES (?, ?, ?)"
    db.query(sqlInsert, [movieName, movieReview, movieRating], (err, result) => {
        if (err) {
            console.log("Error:", err);
            res.status(500).send('Error inserting data into database');
        } else {
            res.send('Successfully inserted data into database');
        }
    });
});

app.delete("/api/delete/:movieName", (req, res) => {
    const movieName = req.params.movieName;
    const sqlDel = "DELETE FROM movie_reviews WHERE movieName = ?";
    db.query(sqlDel, movieName, (err, result) => {
        if (err) {
            console.log("Error:", err);
            res.status(500).send('Error deleting data');
        } else {
            res.send('Successfully deleted data');
        }
    })
})

app.put("/api/update", (req, res) => {
    const movieName = req.body.movieName;
    const movieReview = req.body.movieReview;
    const sqlUpdate = "UPDATE movie_reviews SET movieReview = ? WHERE movieName = ?";
    db.query(sqlUpdate, [movieReview, movieName], (err, result) => {
        if (err) {
            console.log("Error:", err);
            res.status(500).send('Error updating data');
        } else {
            res.send('Successfully udpated data');
        }
    })
})

app.listen(3001, () => {
    console.log('Running on port 3001!');
});
