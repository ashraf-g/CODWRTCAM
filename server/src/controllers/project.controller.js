const Project = require("../models/project.model");

exports.createProject = async (req, res) => {
  try {
    const { project_name, description, owner_id } = req.body;
    if (!project_name || !owner_id) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const newProject = new Project({
      project_name,
      description,
      owner_id,
    });
    await newProject.save();
    res.status(201).json({ message: "Project created successfully" });
  } catch (error) {
    console.error("Error in creating project:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    console.error("Error in fetching projects:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getProjectByOwnerId = async (req, res) => {
  try {
    const projects = await Project.find({ owner_id: req.params.owner_id });
    res.json(projects);
  } catch (error) {
    console.error("Error in fetching projects by owner_id:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getProjectByName = async (req, res) => {
  try {
    const project = await Project.findOne({
      project_name: req.params.project_name,
    });
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.json(project);
  } catch (error) {
    console.error("Error in fetching project by name:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.json(project);
  } catch (error) {
    console.error("Error in fetching project by id:", error);
    res.status(500).json({ message: "Server error" });
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
    res.status(500).json({ message: "Server error" });
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
    res.status(500).json({ message: "Server error" });
  }
};
