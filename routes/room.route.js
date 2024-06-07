const express = require("express");
const router = express.Router();
const {
  createRoom,
  getAllRooms,
  getRoomById,
  updateRoom,
  deleteRoom,
} = require("../controllers/room.controller");
const authenticateJWT = require("../middleware/auth");

// Create a new room
router.post("/", authenticateJWT, createRoom);

// Get all rooms
router.get("/", authenticateJWT, getAllRooms);

// Get a single room by ID
router.get("/:id", authenticateJWT, getRoomById);

// Update a room by ID
router.put("/:id", authenticateJWT, updateRoom);

// Delete a room by ID
router.delete("/:id", authenticateJWT, deleteRoom);

module.exports = router;
