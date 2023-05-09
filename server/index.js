const express = require('express');
const app = express();
const mysql = require('mysql');

const db = mysql.createPool({
    host: 'localhost',
    user: 'test',
    password: 'password',
    database: 'MovieReviewsDatabase',
});

app.get("/", (req, res) => {
    const sqlInsert = "INSERT INTO movie_reviews (movieName, movieReview) VALUES ('inception', 'good movie');"
    db.query(sqlInsert, (err, result) => {
        if (err) {
            console.log("Error:", err);
            res.send("Error occurred.");
        } else {
            // console.log("Result:", result);
            res.send("Inserted successfully.");
        }
    });
});

app.listen(3001, () => {
    console.log('Running on port 3001!');
});
