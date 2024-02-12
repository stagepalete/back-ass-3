var express = require('express');
const fetch = require('node-fetch');

var router = express.Router();
var { body, validationResult } = require('express-validator');


const User = require('../models/User');
const Book = require('../models/Books');
const Weather = require('../models/Weather');

router.get('/books', async (req, res) => {
    const user = req.session.user;

    if (!user) {
        res.redirect('/login');
    }
    try {
        let query = {};
        const { name, page, limit } = req.query;

        if (name) {
            query.title = { $regex: new RegExp(name, 'i') };
        }

        const pageNumber = parseInt(page) || 1;
        const pageSize = parseInt(limit) || 10;
        const skip = (pageNumber - 1) * pageSize;

        const books = await Book.find(query).skip(skip).limit(pageSize);
        res.json(books);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/movies', (req, res) => {
    const user = req.session.user;

    if (!user) {
        return res.redirect('/login');
    }

    const { name } = req.query;

    const url = `https://api.themoviedb.org/3/search/movie?query=${name}&include_adult=false&language=en-US&page=1`;

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxYWE3MWE1Mjk4Njk0Mjg3NjhmYmU3MDM5NDcwNGUwYSIsInN1YiI6IjY1Y2ExZTQzOThmMWYxMDE4M2RhODRiNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DG1rKSk_07PzUu8a5ooh6ba8JVryjFSnA23dvLlbAso'
        }
    };

    fetch(url, options)
        .then(res => res.json())
        .then(json => {
            res.json(json.results);
        })
        .catch(err => {
            console.error('Error fetching movies:', err);
            res.status(500).json({ message: 'Internal server error' });
        });
});

router.get('/weather', async (req, res) => {
    const user = req.session.user;

    if (!user) {
        res.redirect('/login');
        return; // Added return to prevent further execution if user is not authenticated
    }

    const { city } = req.query;

    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=2218b143ab45a7062a46a96f461d5ec7`;
        const response = await fetch(url);
        const weatherData = await response.json();

        // Save weather data to database
        const weather = new Weather({
            city: weatherData.name,
            temp: weatherData.main.temp,
            condition: weatherData.weather[0].main,
            user : user.user.id
        });

        await weather.save();

        res.json(weatherData);
    } catch (err) {
        console.error('Error fetching weather:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/weather/history', async (req, res) => {
    const user = req.session.user;

    if (!user) {
        res.redirect('/login');
        return;
    }

    try {
        const history = await Weather.find({ user: user.user.id }).sort({ createdAt: -1 });
        res.json(history);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/login', async (req, res) => {
    const user = req.session.user;
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        if (password !== user.password) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        req.session.user = {
            user: {
                id : user._id,
                username: user.username,
                email: user.email,
                created_at: user.createdAt,
            }
        };
        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/signup', async (req, res) => {
    const user = req.session.user;

    const { username, email, password } = req.body;

    try {
        let existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const newUser = new User({ username, email, password });
        await newUser.save();

        res.status(201).json(newUser);
    } catch (error) {
        console.error("Error in signup:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.post('/logout', (req, res) => {
    req.session.destroy();
    res.json({ message: 'Logout successful' });
});
module.exports = router;