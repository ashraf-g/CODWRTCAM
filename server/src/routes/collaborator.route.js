module.exports = (app) => {
  require("dotenv").config();
  const base_URL = process.env.BASE_URL;
  const routes = require("express").Router();

  const collaborator = require("../controllers/collaborator.controller");
  const isAuthenticated = require("../middlewares/auth.middleware");

  routes.post("/collaborator/create", collaborator.createCollaborator);
  routes.get(
    "/collaborator/getByProject/:project_id",
    collaborator.getCollaboratorsByProject
  );
  routes.get("/collaborator/getById/:id", collaborator.getCollaborator);
  routes.put("/collaborator/update/:id", collaborator.updateCollaborator);
  routes.delete("/collaborator/delete/:id", collaborator.deleteCollaborator);

  app.use(isAuthenticated);
  app.use(base_URL, routes);
};
