const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");

require("dotenv").config({ path: "../config/.env" });
const jwtConfig = process.env.JWT_SECRET;

//** Signup
exports.signUp = [
  // Validation
  body("username", "Enter a valid username").isLength({ min: 3 }),
  body("email", "Enter a valid email").isEmail(),
  body("password", "Password must be at least 5 characters").isLength({
    min: 5,
  }),

  // Signup logic
  async (req, res) => {
    try {
      // Validate request body
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { username, email, password } = req.body;

      // Check if the user or email already exists in a more efficient way
      const existingUser = await User.findOne({
        $or: [{ username }, { email }],
      });

      if (existingUser) {
        return res.status(400).json({
          message:
            existingUser.username === username
              ? "Username already exists"
              : "Email already exists",
        });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create new user
      const user = new User({
        username,
        email,
        password: hashedPassword,
        verified: false,
      });
      await user.save();

      res.status(201).json({ message: "User created successfully" });
    } catch (error) {
      console.error("Error in sign up:", error);
      res.status(500).json({ message: "Server error" });
    }
  },
];

//** Login
exports.login = [
  // Validation
  body("email", "Enter a valid email").isEmail(),
  body("password", "Password is required").exists(),

  // Login logic
  async (req, res) => {
    try {
      // Validate request body
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password } = req.body;

      // Check if the user exists in the database
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      // Compare provided password with the stored hashed password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      // Generate JWT token
      const payload = {
        userId: user._id,
        username: user.username,
        email: user.email,
      };

      // Sign JWT token (with a secret and expiry time)
      const token = jwt.sign(payload, jwtConfig, {
        expiresIn: "24h",
      });

      // Return the token as a response
      res.status(200).json({
        message: "Login successful",
        token,
        payload,
      });
    } catch (error) {
      console.error("Error during login:", error);
      res
        .status(500)
        .json({ message: "Server error. Please try again later." });
    }
  },
];
