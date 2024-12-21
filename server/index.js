const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

require("dotenv").config({ path: "./src/config/.env" });
const PORT = process.env.PORT;

const dbConnect = require("./src/config/db.connect");

//connect to database
dbConnect();

//init app and middleware
const app = express();

//middleware to handle CORS requests (Cross-Origin Resource Sharing)
let corsPolicy = {
  origin: "*",
};
app.use(cors(corsPolicy));

//body parser middleware to parse incoming request bodies
app.use(bodyParser.json({ limit: "10mb" }));

//express middleware to parse JSON and url-encoded data
app.use(express.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//home route
app.get("/", (req, res) => {
  res.send("Welcome to Sever");
});

//use routes
// require("./src/routes/userRoute")(app);

//listen server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} `);
});