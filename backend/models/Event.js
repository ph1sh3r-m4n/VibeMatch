const mongoose = require('mongoose');
const eventSchema = new mongoose.Schema({
  title: String,
  mood: String,
  moodEmoji: String,
  location: String,
  time: String,
  host: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  maxParticipants: Number,
  description: String,
  isPublic: Boolean,
  x: Number,
  y: Number
});
module.exports = mongoose.model('Event', eventSchema);
