module.exports = (app) => {
  require("dotenv").config({ path: "../config/.env" });
  const base_URL = process.env.BASE_URL;
  const routes = require("express").Router();

  const project = require("../controllers/project.controller");
  const isAuthenticated = require("../middlewares/auth.middleware");

  routes.post("/project/create", project.createProject);
  routes.get("/project/getAll", project.getProjects);
  routes.get("/project/getByOwner/:owner_id", project.getProjectByOwnerId);
  routes.get(
    "/project/getByProjectName/:project_name",
    project.getProjectByName
  );
  routes.get("/project/getById/:id", project.getProjectById);
  routes.put("/project/update/:id", project.updateProject);
  routes.delete("/project/delete/:id", project.deleteProject);

  app.use(isAuthenticated);
  app.use(base_URL, routes);
};
