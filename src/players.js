const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlayersSchema = new Schema({
  name: String,
  wins: Number,
}, { timestamps: true });

module.exports = mongoose.model('Player', PlayersSchema);
