const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const seatSchema = require('./seat');

const screeningSchema = new Schema({
  date: { type: Date, index: true },
  seats: [seatSchema]
});

module.exports = screeningSchema;
