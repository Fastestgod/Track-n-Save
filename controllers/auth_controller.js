const User = require("../models/user_model");

module.exports.registerUser = async (req, res) => {
  const {fullname, email, password } = req.body;

  if (!fullname || !email || !password) {
    return res.status(400).send("Please provide all required fields.");
  }

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).send("Email already exists.");
    }

    const newUser = await User.create({ fullname, email, password });
    res.status(201).send("User registered successfully.");
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).send("Error registering user.");
  }
};

const User = require("../models/user_model");
const jwt = require("jsonwebtoken");

module.exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send("Please provide both email and password.");
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send("Invalid email or password.");
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).send("Invalid email or password.");
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).send("Error logging in.");
  }
};