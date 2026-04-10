const mongoose = require('mongoose');
const messageSchema = new mongoose.Schema({
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  username: String,
  avatar: String,
  message: String,
  time: String
});
module.exports = mongoose.model('Message', messageSchema);
