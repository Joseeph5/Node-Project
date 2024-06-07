const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  name: String,
  capacity: Number,
  amenities: [String],
  price: Number,
});

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;
