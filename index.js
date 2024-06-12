const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const swaggerSetup = require("./swagger");

const roomRoutes = require("./routes/room.route");

const authRoutes = require("./routes/auth.route");

const bookingsRoutes = require("./routes/booking.route");

const app = express();

app.use(express.json());

app.use("/rooms", roomRoutes);
app.use("/auth", authRoutes);
app.use("/booking", bookingsRoutes);

swaggerSetup(app);

mongoose.connect(process.env.MONGODB_URL).then(() => {
  console.log("Connected to MongoDB");

  app.listen(3000, () => {
    console.log(`Server is running on PORT: 3000`);
  });
});
