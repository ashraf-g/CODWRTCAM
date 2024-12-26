const Project = require("../models/project.model");
const { sendErrorResponse } = require("../helpers/responseHelper.js");

exports.createProject = async (req, res) => {
  try {
    const { project_name, description, owner_id, tag } = req.body;
    if (!project_name || !owner_id) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const newProject = new Project({
      project_name,
      description,
      owner_id,
      tag,
    });
    await newProject.save();
    res.status(201).json({ message: "Project created successfully" });
  } catch (error) {
    console.error("Error in creating project:", error);
    sendErrorResponse(res, 500, "Server error");
  }
};

exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find().populate(
      "owner_id",
      "username email "
    );
    res.json(projects);
  } catch (error) {
    console.error("Error in fetching projects:", error);
    sendErrorResponse(res, 500, "Server error");
  }
};

exports.getProjectByOwnerId = async (req, res) => {
  try {
    const projects = await Project.find({
      owner_id: req.params.owner_id,
    }).populate("owner_id", "username email ");
    res.json(projects);
  } catch (error) {
    console.error("Error in fetching projects by owner_id:", error);
    sendErrorResponse(res, 500, "Server error");
  }
};

exports.getProjectByName = async (req, res) => {
  try {
    const project = await Project.findOne({
      project_name: req.params.project_name,
    }).populate("owner_id", "username email ");
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.json(project);
  } catch (error) {
    console.error("Error in fetching project by name:", error);
    sendErrorResponse(res, 500, "Server error");
  }
};

exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate(
      "owner_id",
      "username email "
    );
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.json(project);
  } catch (error) {
    console.error("Error in fetching project by id:", error);
    sendErrorResponse(res, 500, "Server error");
  }
};

exports.updateProject = async (req, res) => {
  try {
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedProject) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.json(updatedProject);
  } catch (error) {
    console.error("Error in updating project:", error);
    sendErrorResponse(res, 500, "Server error");
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params.id);
    if (!deletedProject) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error("Error in deleting project:", error);
    sendErrorResponse(res, 500, "Server error");
  }
};

exports.getArchiveProject = async (req, res) => {
  try {
    const archivedProjects = await Project.find({
      status: "archived",
    }).populate("owner_id", "username email ");
    res.json(archivedProjects);
  } catch (error) {
    console.error("Error in fetching archived projects:", error);
    sendErrorResponse(res, 500, "Server error");
  }
};
