const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

exports.register = async (req, res) => {
  const { username, password, role } = req.body;
  try {
    const user = new User({ username, password, role });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const payload = {
      id: user._id,
      username: user.username,
      role: user.role,
    };
    const token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: "7d",
    });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
