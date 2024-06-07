const Room = require("../models/room.model");

exports.createRoom = async (req, res) => {
  const { name, capacity, amenities, price } = req.body;
  try {
    const newRoom = new Room({ name, capacity, amenities, price });
    await newRoom.save();
    res.status(201).json(newRoom);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getRoomById = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) return res.status(404).json({ message: "Room not found" });
    res.json(room);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateRoom = async (req, res) => {
  const { name, capacity, amenities, price } = req.body;
  try {
    const room = await Room.findById(req.params.id);
    if (!room) return res.status(404).json({ message: "Room not found" });

    room.name = name;
    room.capacity = capacity;
    room.amenities = amenities;
    room.price = price;

    await room.save();
    res.json(room);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteRoom = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) return res.status(404).json({ message: "Room not found" });

    await room.remove();
    res.json({ message: "Room deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
