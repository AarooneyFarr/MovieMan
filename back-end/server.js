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
    rating: Number,
    reviewText: String,
    title: String,
    url: String,
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
    console.log(req.params.id);
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

app.post('/api/movies', async (req, res) => {


    const movie = new Movie({
        imdbID: req.body.imdbID,
        img: req.body.img,
        plotText: req.body.plotText,
        rating: req.body.rating,
        reviewText: req.body.reviewText,
        title: req.body.title,
        url: req.body.url,
    });



    try {
        await movie.save();
        res.send(movie);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.listen(3000, () => console.log('Server listening on port 3000!'));