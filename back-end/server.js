const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

mongoose.connect('mongodb://localhost:27017/movies', {
    useNewUrlParser: true
});

const itemSchema = new mongoose.Schema({
    imdbID: String,
    img: String,
    plotText: String,
    title: String,
    url: String,
    avgRating: Number,
    comments: [{

        reviewText: String,
        rating: Number,
    }],
});

const Movie = mongoose.model('Movie', itemSchema);

app.get('/api/movies', async (req, res) => {
    try {
        let movies = await Movie.find();
        res.send(movies);

    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.get('/api/movie/:id', async (req, res) => {

    try {
        let movie = await Movie.find({
            imdbID: req.params.id
        });

        res.send(movie[0]);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);

    }
});

app.delete('/api/movie/:id', async (req, res) => {
    try {
        await Movie.deleteOne({
            imdbID: req.params.id
        });
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);

    }
});

app.post('/api/movies/:id', async (req, res) => {


    const newMovie = new Movie({
        imdbID: req.body.imdbID,
        img: req.body.img,
        plotText: req.body.plotText,
        title: req.body.title,
        url: req.body.url,
        avgRating: req.body.rating,
        comments: [{
            reviewText: req.body.reviewText,
            rating: req.body.rating,
        }]
    });

    try {
        let movie = await Movie.find({
            imdbID: req.params.id
        });

        if (movie.length == 0) {
            await newMovie.save();
            res.send(movie);
        }
        else {
            console.log("ERROR: movie already exists");
        }




    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.put('/api/movies/:id', async (req, res) => {
    let item = await Movie.findOne({ imdbID: req.params.id });

    item.comments.push({
        reviewText: req.body.reviewText,
        rating: req.body.rating,
    });

    let sum = 0;
    for (let i = 0; i < item.comments.length; i++) {
        sum += item.comments[i].rating;

    }


    item.avgRating = (sum / item.comments.length);

    item.save();
    res.send(item);
    console.log("PUT REQUEST SUCCESSFUL");
});

app.listen(3000, () => console.log('Server listening on port 3000!'));