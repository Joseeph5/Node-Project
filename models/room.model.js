const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  name: String,
  capacity: Number,
  amenities: [String],
  bookings: [
    {
      bookedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      startHour: Number,
      endHour: Number,
    },
  ],
});

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;
