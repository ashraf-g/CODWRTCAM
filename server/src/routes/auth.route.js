module.exports = (app) => {
  require("dotenv").config();
  const base_URL = process.env.BASE_URL;

  const routes = require("express").Router();
  const isAuthenticated = require("../middlewares/auth.middleware");

  const user = require("../controllers/auth.controller");

  routes.post("/user/auth/signup", user.signUp);
  routes.post("/user/auth/login", user.login);
  routes.get("/user/auth/verify-email", user.verifyEmail);
  routes.post("/user/auth/forgot-password", user.forgotPassword);
  routes.post("/user/auth/reset-password", user.resetPassword);
  routes.put("/user/update-profile", isAuthenticated, user.updateProfile);

  app.use(base_URL, routes);
};
