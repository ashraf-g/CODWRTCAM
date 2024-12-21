const jwt = require("jsonwebtoken");

require("dotenv").config({ path: "../config/.env" });
const jwtConfig = process.env.JWT_SECRET;

const isAuthenticated = (req, res, next) => {
  // Extract token from headers
  const authHeader = req.header("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Login required" });
  }

  // Get the token from the Authorization header
  const token = authHeader.split(" ")[1];
  // console.log(token);

  // Verify the token
  jwt.verify(token, jwtConfig, async (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }
    req.user = decoded; // Attach user data to the request
    next(); // Proceed to the next middleware or route handler
  });
};

module.exports = isAuthenticated;
