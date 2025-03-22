const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  playerId: String,
  PlayerName: String,
  Position: String,
  Age: Number,
  Goals: Number,
  Assists: Number,
  Cleansheet: Number,
  Appearances: Number,
  Nationality: String,
  image_url: String,
});

const TeamSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  players: [playerSchema],         // ผู้เล่นที่ซื้อแล้ว
  lineupPlayers: [playerSchema],   // ผู้เล่นในสนาม
  formation: { type: String, default: "4-3-3" }  // แผนที่เลือก
});

module.exports = mongoose.model('Team', TeamSchema);
