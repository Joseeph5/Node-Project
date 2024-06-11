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

/**
 * @swagger
 * components:
 *   schemas:
 *     Room:
 *       type: object
 *       required:
 *         - name
 *         - capacity
 *         - amenities
 *         - price
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the room
 *         name:
 *           type: string
 *           description: The name of the room
 *         capacity:
 *           type: integer
 *           description: The capacity of the room
 *         amenities:
 *           type: array
 *           items:
 *             type: string
 *           description: The amenities available in the room
 *         price:
 *           type: number
 *           description: The price of the room
 *       example:
 *         id: d5fE_asz
 *         name: Conference Room
 *         capacity: 50
 *         amenities:
 *           - Projector
 *           - Whiteboard
 *         price: 100
 */

/**
 * @swagger
 * tags:
 *   name: Rooms
 *   description: The rooms managing API
 */

/**
 * @swagger
 * /rooms:
 *   post:
 *     summary: Create a new room
 *     tags: [Rooms]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Room'
 *     responses:
 *       201:
 *         description: The room was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Room'
 *       500:
 *         description: Some server error
 */
router.post("/", authenticateJWT, createRoom);

/**
 * @swagger
 * /rooms:
 *   get:
 *     summary: Get all rooms
 *     tags: [Rooms]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The list of the rooms
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Room'
 */
router.get("/", authenticateJWT, getAllRooms);

/**
 * @swagger
 * /rooms/{id}:
 *   get:
 *     summary: Get a room by ID
 *     tags: [Rooms]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The room id
 *     responses:
 *       200:
 *         description: The room description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Room'
 *       404:
 *         description: The room was not found
 */
router.get("/:id", authenticateJWT, getRoomById);

/**
 * @swagger
 * /rooms/{id}:
 *   put:
 *     summary: Update a room by ID
 *     tags: [Rooms]
 *     security:
 *       - bearerAuth: []
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
 *             $ref: '#/components/schemas/Room'
 *     responses:
 *       200:
 *         description: The room was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Room'
 *       404:
 *         description: The room was not found
 *       500:
 *         description: Some server error
 */
router.put("/:id", authenticateJWT, updateRoom);

/**
 * @swagger
 * /rooms/{id}:
 *   delete:
 *     summary: Delete a room by ID
 *     tags: [Rooms]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The room id
 *     responses:
 *       200:
 *         description: The room was deleted
 *       404:
 *         description: The room was not found
 */
router.delete("/:id", authenticateJWT, deleteRoom);

module.exports = router;
