const express = require('express');
const router = express.Router();
const Movie = require('../models/movie');

// יצירת סרט חדש
router.post('/', async (req, res) => {
    const { title, description, duration, poster } = req.body;
    const movie = new Movie({ title, description, duration, poster });

    try {
        const newMovie = await movie.save();
        res.status(201).json(newMovie);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// עדכון סרט קיים
router.put('/:id', async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) return res.status(404).json({ message: 'Movie not found' });

        Object.assign(movie, req.body);
        const updatedMovie = await movie.save();
        
        res.json(updatedMovie);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// מחיקת סרט
router.delete('/:id', async (req, res) => {
    try {
        const movie = await Movie.findByIdAndDelete(req.params.id);
        if (!movie) return res.status(404).json({ message: 'Movie not found' });

        res.json({ message: 'Movie deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// תזמון הקרנה
router.post('/:id/screenings', async (req, res) => {
    const { date } = req.body;
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) return res.status(404).json({ message: 'Movie not found' });

        // המרת התאריך לאובייקט Date ולהשוות בצורה מדויקת
        const screeningDate = new Date(date);
        const overlappingScreening = await Movie.findOne({ 'screenings.date': screeningDate });
        if (overlappingScreening) return res.status(400).json({ message: 'There is already a screening at this time' });

        movie.screenings.push({
            date: screeningDate,
            seats: Array.from({ length: 10 }, (_, row) =>
                Array.from({ length: 10 }, (_, number) => ({ row: row + 1, number: number + 1, isAvailable: true }))
            ).flat()
        });
        await movie.save();
        res.status(201).json(movie);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// ביטול הקרנה
router.delete('/:id/screenings/:screeningId', async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) return res.status(404).json({ message: 'Movie not found' });

        const screening = movie.screenings.id(req.params.screeningId);
        if (!screening) return res.status(404).json({ message: 'Screening not found' });

        movie.screenings.pull({ _id: req.params.screeningId });
        await movie.save();
        res.json({ message: 'Screening deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;