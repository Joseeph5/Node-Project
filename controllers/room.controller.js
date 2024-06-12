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
    console.log(req.params.id);
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

exports.bookRoom = async (req, res) => {
  const id = req.params.id;
  const { startHour, endHour } = req.body;
  console.log(req.body);
  try {
    const room = await Room.findById(id);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    const isAvailable = room.bookings.every((booking) => {
      return booking.endHour <= startHour || booking.startHour >= endHour;
    });

    if (!isAvailable) {
      return res
        .status(400)
        .json({ message: "Room is not available for the specified hours" });
    }

    room.bookings.push({
      bookedBy: req.user.id,
      startHour,
      endHour,
    });

    await room.save();
    res.json({
      message: "Room reserved successfully",
      booking: { startHour, endHour },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.availableRooms = async (req, res) => {
  const { startHour, endHour } = req.query;
  try {
    const availableRooms = await Room.find({
      bookings: {
        $not: {
          $elemMatch: {
            $or: [
              { startHour: { $lt: endHour, $gte: startHour } },
              { endHour: { $gt: startHour, $lte: endHour } },
            ],
          },
        },
      },
    });
    res.json({ availableRooms });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.reservation = async (req, res) => {
  try {
    const rooms = await Room.find({ "bookings.bookedBy": req.user.id }).select(
      "bookings"
    );
    const userReservations = rooms.reduce((reservations, room) => {
      room.bookings.forEach((booking) => {
        if (booking.bookedBy.toString() === req.user.id) {
          reservations.push({ roomId: room._id, ...booking._doc });
        }
      });
      return reservations;
    }, []);
    res.json({ reservations: userReservations });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateReservation = async (req, res) => {
  const { roomId, reservationId } = req.params;
  const { startHour, endHour } = req.body;

  try {
    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    const reservation = room.bookings.id(reservationId);
    if (!reservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }

    if (reservation.bookedBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    reservation.startHour = startHour;
    reservation.endHour = endHour;

    await room.save();
    res.json({ message: "Reservation modified successfully", reservation });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.cancelReservation = async (req, res) => {
  const { roomId, reservationId } = req.params;

  try {
    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    const reservation = room.bookings.id(reservationId);
    if (!reservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }

    if (reservation.bookedBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    room.bookings.remove(reservationId);
    await room.save();
    res.json({ message: "Reservation canceled successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
