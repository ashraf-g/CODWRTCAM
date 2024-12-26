module.exports = (app) => {
  require("dotenv").config();
  const base_URL = process.env.BASE_URL;
  const routes = require("express").Router();

  const flagged = require("../controllers/flagged.controller");
  const isAuthenticated = require("../middlewares/auth.middleware");

  routes.post("/flag/create", flagged.createFlagged);
  routes.get("/flag/getAll", flagged.getFlaggedIssues);
  routes.get("/flag/getById/:id", flagged.getFlaggedIssueById);
  routes.get("/flag/getByUserId/:user_id", flagged.getFlaggedIssuesByUserId);
  routes.get("/flag/getByFileId/:file_id", flagged.getFlaggedIssuesByFileId);
  routes.put("/flag/update/:id", flagged.updateFlaggedIssue);
  routes.delete("/flag/delete/:id", flagged.deleteFlaggedIssue);

  app.use(isAuthenticated);
  app.use(base_URL, routes);
};
