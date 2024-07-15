const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const seatSchema = new Schema({
  row: Number,
  number: Number,
  isAvailable: { type: Boolean, default: true }
});

module.exports = seatSchema;
