const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const screeningSchema = require('./screening');

const movieSchema = new Schema({
  title: String,
  description: String,
  duration: Number,
  screenings: [screeningSchema],
  poster: String
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
