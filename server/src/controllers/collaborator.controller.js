const Collaborator = require("../models/collaborator.model");
const { sendErrorResponse } = require("../helpers/responseHelper.js");

exports.createCollaborator = async (req, res) => {
  try {
    const { project_id, user_id, role, permissions } = req.body;

    // Create a new collaborator
    const newCollaborator = new Collaborator({
      project_id,
      user_id,
      role,
      permissions,
    });

    // Save the collaborator to the database
    const savedCollaborator = await newCollaborator.save();

    res.status(201).json({
      message: "Collaborator created successfully",
      collaborator: savedCollaborator,
    });
  } catch (error) {
    console.error("Error creating collaborator:", err);
    sendErrorResponse(res, 500, "Server error");
  }
};

// get all collaborator of specific project
exports.getCollaboratorsByProject = async (req, res) => {
  const { project_id } = req.params;

  try {
    const collaborators = await Collaborator.find({ project_id }).populate(
      "user_id",
      "username email"
    ); // Populate with user info (adjust fields as necessary)

    if (!collaborators || collaborators.length === 0) {
      return res
        .status(404)
        .json({ message: "No collaborators found for this project" });
    }

    res.status(200).json(collaborators);
  } catch (error) {
    console.error("Error fetching collaborators:", err);
    sendErrorResponse(res, 500, "Server error");
  }
};

// Get a specific collaborator by user_id and project_id
exports.getCollaborator = async (req, res) => {
  const { project_id, user_id } = req.params;

  try {
    const collaborator = await Collaborator.findOne({
      project_id,
      user_id,
    }).populate("user_id", "username email");

    if (!collaborator) {
      return res.status(404).json({ message: "Collaborator not found" });
    }

    res.status(200).json(collaborator);
  } catch (error) {
    console.error("Error fetching collaborator:", err);
    sendErrorResponse(res, 500, "Server error");
  }
};

// Update collaborator details (e.g., role, permissions)
exports.updateCollaborator = async (req, res) => {
  const { project_id, user_id } = req.params;
  const { role, permissions } = req.body;

  try {
    const collaborator = await Collaborator.findOne({ project_id, user_id });

    if (!collaborator) {
      return res.status(404).json({ message: "Collaborator not found" });
    }

    // Update fields
    collaborator.role = role || collaborator.role;
    collaborator.permissions = permissions || collaborator.permissions;

    const updatedCollaborator = await collaborator.save();

    res.status(200).json({
      message: "Collaborator updated successfully",
      collaborator: updatedCollaborator,
    });
  } catch (error) {
    console.error("Error updating collaborator:", err);
    sendErrorResponse(res, 500, "Server error");
  }
};

// Delete a collaborator from a project
exports.deleteCollaborator = async (req, res) => {
  const { project_id, user_id } = req.params;

  try {
    const collaborator = await Collaborator.findOneAndDelete({
      project_id,
      user_id,
    });

    if (!collaborator) {
      return res.status(404).json({ message: "Collaborator not found" });
    }

    res.status(200).json({ message: "Collaborator deleted successfully" });
  } catch (error) {
    console.error("Error deleting collaborator:", err);
    sendErrorResponse(res, 500, "Server error");
  }
};
