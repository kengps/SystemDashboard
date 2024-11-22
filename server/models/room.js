const mongoose = require('mongoose');

const roomSchema = mongoose.Schema({
  floor: {
    type: Number,
    required: true,
  },
  roomNumber: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['available', 'rented'],
    default: 'available',
  },
});

const Room = mongoose.model('Room', roomSchema);
module.exports = Room;
