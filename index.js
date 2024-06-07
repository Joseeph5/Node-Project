const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const roomRoutes = require("./routes/room.route");

const authRoutes = require("./routes/auth.route");

const app = express();

app.use(express.json());

app.use("/rooms", roomRoutes);
app.use("/auth", authRoutes);

mongoose.connect(process.env.MONGODB_URL).then(() => {
  console.log("Connected to MongoDB");

  app.listen(3000, () => {
    console.log(`Server is running on PORT: 3000`);
  });
});
