module.exports = (app) => {
  require("dotenv").config();
  const base_URL = process.env.BASE_URL;
  const routes = require("express").Router();

  const file = require("../controllers/file.controller");
  const isAuthenticated = require("../middlewares/auth.middleware");

  routes.post("/file/create", file.createFile);
  routes.get("/file/getAll", file.getAll);
  routes.get("/file/getById/:id", file.getFileById);
  routes.put("/file/update/:id", file.updateFile);
  routes.delete("/file/delete/:id", file.deleteFile);

  app.use(isAuthenticated);
  app.use(base_URL, routes);
};
