const express = require('express');
const router = express.Router();
const Movie = require('../models/movie');

// שליפת כל ההקרנות עם שם ותאריך
router.get('/', async (req, res) => {
  try {
    const movies = await Movie.find({});
    const screenings = [];

    movies.forEach(movie => {
      if (movie.screenings.length > 0) {
        movie.screenings.forEach(screening => {
          screenings.push({
            movieId: movie._id,
            title: movie.title,
            description: movie.description,
            screeningId: screening._id,
            date: screening.date,
            duration: movie.duration,
            seats: screening.seats
          });
        });
      } else {
        // להוסיף סרטים ללא תזמונים
        screenings.push({
          movieId: movie._id,
          title: movie.title,
          description: movie.description,
          screeningId: null,
          date: null,
          duration: movie.duration,
          seats: []
        });
      }
    });

    res.json(screenings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// שליפת הקרנה מסוימת עם שם, תאריך, תיאור, משך וכיסאות
router.get('/:screeningId', async (req, res) => {
  try {
    const movie = await Movie.findOne({ 'screenings._id': req.params.screeningId });
    if (!movie) return res.status(404).json({ message: 'Movie not found' });

    const screening = movie.screenings.id(req.params.screeningId);
    if (!screening) return res.status(404).json({ message: 'Screening not found' });

    const response = {
      movieId: movie._id,
      title: movie.title,
      description: movie.description,
      duration: movie.duration,
      date: screening.date,
      seats: screening.seats
    };

    res.json(response);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// הזמנת מושב בהקרנה מסוימת
router.post('/:screeningId/book', async (req, res) => {
  const { row, number } = req.body;

  try {
    const movie = await Movie.findOne({ 'screenings._id': req.params.screeningId });
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    const screening = movie.screenings.id(req.params.screeningId);
    if (!screening) {
      return res.status(404).json({ message: 'Screening not found' });
    }

    const seat = screening.seats.find(seat => seat.row === row && seat.number === number);
    if (!seat) {
      return res.status(404).json({ message: 'Seat not found' });
    }

    if (!seat.isAvailable) {
      return res.status(400).json({ message: 'Seat is already taken' });
    }

    seat.isAvailable = false;

    await movie.save();

    res.json({ message: 'Seat booked successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
