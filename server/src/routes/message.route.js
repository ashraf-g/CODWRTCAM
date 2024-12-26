module.exports = (app) => {
  require("dotenv").config();
  const base_URL = process.env.BASE_URL;
  const routes = require("express").Router();

  const message = require("../controllers/message.controller");
  const isAuthenticated = require("../middlewares/auth.middleware");

  routes.post("/message/sendMessage", message.sendMessage);
  routes.get(
    "/message/getMessagesByProject/:project_id",
    message.getMessagesByProject
  );
  routes.get("/message/getMessageById/:message_id", message.getMessageById);
  routes.delete("/message/delete/:message_id", message.deleteMessage);

  app.use(isAuthenticated);
  app.use(base_URL, routes);
};
