const jwt = require("jsonwebtoken");

require("dotenv").config({ path: "../config/.env" });
const JWT_SECRET = process.env.JWT_SECRET;

const isAuthenticated = (req, res, next) => {
  // Extract token from headers
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    // console.log(decoded);

    // Step 3: Attach the user data (e.g., userId) to the request object
    req.userId = decoded.userId; // Assuming the token contains the userId as "id"

    // Call the next middleware or route handler
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token is not valid" });
  }
};

module.exports = isAuthenticated;
