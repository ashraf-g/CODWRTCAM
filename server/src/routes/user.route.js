module.exports = (app) => {
  const { base_URL } = require("../config/baseURL");
  const routes = require("express").Router();

  const user = require("../controllers/user.controller");

  routes.post("/user/signup", user.signUp);
  routes.post("/user/login", user.login);

  app.use(base_URL, routes);
};
