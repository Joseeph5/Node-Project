const express = require("express");
const router = express.Router();
const {
  availableRooms,
  bookRoom,
  updateReservation,
  reservation,
  cancelReservation,
} = require("../controllers/room.controller");
const authenticateJWT = require("../middleware/auth");

/**
 * @swagger
 * tags:
 *   name: Reservations
 *   description: The Reservations managing API
 */

/**
 * @swagger
 * /booking:
 *   get:
 *     summary: Get all reservations for the authenticated user
 *     tags: [Reservations]
 *     responses:
 *       '200':
 *         description: Successfully retrieved reservations
 *       '500':
 *         description: Server error
 *     security:
 *       - bearerAuth: []
 */
router.get("/", authenticateJWT, reservation);

/**
 * @swagger
 * /booking/:roomId/:reservationId:
 *   put:
 *     summary: Modify an existing reservation
 *     tags: [Reservations]
 *     parameters:
 *       - in: path
 *         name: roomId
 *         schema:
 *           type: string
 *         required: true
 *         description: The room id
 *       - in: path
 *         name: reservationId
 *         schema:
 *           type: string
 *         required: true
 *         description: The reservation id
 *       - in: body
 *         name: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             startHour:
 *               type: integer
 *             endHour:
 *               type: integer
 *     responses:
 *       '200':
 *         description: Successfully modified reservation
 *       '400':
 *         description: Validation error
 *       '500':
 *         description: Server error
 *     security:
 *       - bearerAuth: []
 */
router.put("/:id/:reservationId", authenticateJWT, updateReservation);

/**
 * @swagger
 * /booking/{id}:
 *   put:
 *     summary: Reserve a room if available for specific hours
 *     tags: [Reservations]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The room id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               startHour:
 *                 type: integer
 *                 description: Start hour for the booking
 *                 example: 9
 *               endHour:
 *                 type: integer
 *                 description: End hour for the booking
 *                 example: 11
 *     responses:
 *       '200':
 *         description: Room reserved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Room reserved successfully"
 *       '400':
 *         description: Validation error or room not available
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Room not available for the requested hours"
 *       '500':
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 *     security:
 *       - bearerAuth: []
 */
router.put("/:id", authenticateJWT, bookRoom);

/**
 * @swagger
 * /booking/available:
 *   get:
 *     summary: Get all available rooms
 *     tags: [Reservations]
 *     responses:
 *       '200':
 *         description: Successfully retrieved available rooms
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 availableRooms:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Room'
 *       '500':
 *         description: Server error
 *     security:
 *       - bearerAuth: []
 */
router.get("/available", authenticateJWT, availableRooms);

/**
 * @swagger
 * /booking/{roomId}/{reservationId}:
 *   delete:
 *     summary: Cancel an existing reservation
 *     tags: [Reservations]
 *     parameters:
 *       - in: path
 *         name: roomId
 *         schema:
 *           type: string
 *         required: true
 *         description: The room id
 *       - in: path
 *         name: reservationId
 *         schema:
 *           type: string
 *         required: true
 *         description: The reservation id
 *     responses:
 *       '200':
 *         description: Successfully canceled reservation
 *       '500':
 *         description: Server error
 *     security:
 *       - bearerAuth: []
 */
router.delete("/:roomId/:reservationId", authenticateJWT, cancelReservation);

module.exports = router;
