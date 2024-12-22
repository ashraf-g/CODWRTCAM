const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { body, validationResult } = require("express-validator");
const {
  sendVerificationEmail,
  sendResetPasswordOtp,
} = require("../utils/email");
const generateOTP = require("../utils/generateOTP");
const upload = require("../utils/multerConfig");
const cloudinary = require("../utils/cloudinary");

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

      // Generate a verification token (using crypto module)
      const verificationToken = crypto.randomBytes(32).toString("hex");
      const verificationExpiry = Date.now() + 3600000;

      // Create a new user
      const user = new User({
        username,
        email,
        password: hashedPassword,
        verified: false,
        verificationToken,
        verificationExpiry,
      });

      await user.save();

      await sendVerificationEmail(email, verificationToken);

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

      // Update the last_login field with the current timestamp
      user.last_login = Date.now();
      await user.save();

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

exports.verifyEmail = async (req, res) => {
  try {
    const { token } = req.query;

    // Find user with the provided token
    const user = await User.findOne({ verificationToken: token });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired token.",
      });
    }

    // Check if the token has expired
    if (Date.now() > user.verificationExpiry) {
      return res.status(400).json({
        success: false,
        message: "Verification token has expired. Please request a new one.",
      });
    }

    // Update the user's verified status and clear the verification token
    user.verified = true;
    user.verificationToken = null;
    user.verificationExpiry = null;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Email verified successfully. You can now log in.",
    });
  } catch (error) {
    console.error("Error during email verification:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

// Forgot Password Controller - Step 1: Send OTP
exports.forgotPassword = [
  // Validation
  body("email", "Please enter a valid email").isEmail(),

  // Forgot Password Logic
  async (req, res) => {
    try {
      // Validate request body
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
      }

      const { email } = req.body;

      // Find user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ success: false, message: "User not found" });
      }

      // Generate OTP
      const otp = generateOTP();
      const otpExpiry = Date.now() + 600000; // OTP expires in 10 minutes

      // Save OTP and expiry time in the user's record
      user.otp = otp;
      user.otpExpiry = otpExpiry;
      await user.save();

      // Send OTP to user's email
      await sendResetPasswordOtp(email, otp);

      // Respond back to client
      res.status(200).json({
        success: true,
        message: "OTP sent successfully. Please check your email.",
      });
    } catch (error) {
      console.error("Error during forgot password request:", error);
      res.status(500).json({
        success: false,
        message: "Server error. Please try again later.",
      });
    }
  },
];

// Reset Password Controller - Step 2: Verify OTP and reset password
exports.resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    // Validate new password length
    if (!newPassword || newPassword.length < 5) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 5 characters long",
      });
    }

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    // Check if the OTP is valid and not expired
    if (user.otp !== otp) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    if (Date.now() > user.otpExpiry) {
      return res.status(400).json({
        success: false,
        message: "OTP has expired. Please request a new one.",
      });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password and clear OTP fields
    user.password = hashedPassword;
    user.otp = null; // Clear OTP after reset
    user.otpExpiry = null; // Clear OTP expiry time
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password reset successfully. You can now log in.",
    });
  } catch (error) {
    console.error("Error during password reset:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

exports.updateProfile = [
  // File upload handling
  upload.single("profile_image"),

  // Profile update logic
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { username } = req.body;
      const userId = req.userId;

      // Find the user by ID
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Check if the new username is already taken (excluding the current user)
      const existingUser = await User.findOne({ username });
      if (existingUser && existingUser._id.toString() !== userId.toString()) {
        return res.status(400).json({ message: "Username is already taken" });
      }

      let profile_image_url = user.profile_image;

      // If a file is uploaded, upload it to Cloudinary
      if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path);
        profile_image_url = result.secure_url;
      }

      // Update the user profile
      user.username = username;
      user.profile_image = profile_image_url;
      await user.save();

      // Return the updated user profile
      res.status(200).json({
        message: "Profile updated successfully",
        user: {
          username: user.username,
          profile_image: user.profile_image,
        },
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      res
        .status(500)
        .json({ message: "Server error. Please try again later." });
    }
  },
];
