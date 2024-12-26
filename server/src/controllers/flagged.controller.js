const Flagged = require("../models/flagged.model");
const { sendErrorResponse } = require("../helpers/responseHelper.js");

exports.createFlagged = async (req, res) => {
  try {
    const { file_id, issue_type, description, flagged_by } = req.body;
    if (!file_id || !issue_type || !description || !flagged_by) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const newFlagged = new Flagged({
      file_id,
      issue_type,
      description,
      flagged_by,
    });
    await newFlagged.save();
    res.json(newFlagged);
  } catch (error) {
    console.error("Error in creating flagged issue:", error);
    sendErrorResponse(res, 500, "Server error");
  }
};

exports.getFlaggedIssues = async (req, res) => {
  try {
    const flaggedIssues = await Flagged.find()
      .populate("file_id")
      .populate("flagged_by", "username email");
    res.json(flaggedIssues);
  } catch (error) {
    console.error("Error in fetching flagged issues:", error);
    sendErrorResponse(res, 500, "Server error");
  }
};

exports.getFlaggedIssueById = async (req, res) => {
  try {
    const flaggedIssue = await Flagged.findById(req.params.id)
      .populate("file_id")
      .populate("flagged_by", "username email");
    if (!flaggedIssue) {
      return res.status(404).json({ message: "Flagged issue not found" });
    }
    res.json(flaggedIssue);
  } catch (error) {
    console.error("Error in fetching flagged issue by ID:", error);
    sendErrorResponse(res, 500, "Server error");
  }
};

exports.updateFlaggedIssue = async (req, res) => {
  try {
    const updatedFlaggedIssue = await Flagged.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedFlaggedIssue) {
      return res.status(404).json({ message: "Flagged issue not found" });
    }
    res.json(updatedFlaggedIssue);
  } catch (error) {
    console.error("Error in updating flagged issue:", error);
    sendErrorResponse(res, 500, "Server error");
  }
};

exports.deleteFlaggedIssue = async (req, res) => {
  try {
    const deletedFlaggedIssue = await Flagged.findByIdAndDelete(req.params.id);
    if (!deletedFlaggedIssue) {
      return res.status(404).json({ message: "Flagged issue not found" });
    }
    res.json({ message: "Flagged issue deleted successfully" });
  } catch (error) {
    console.error("Error in deleting flagged issue:", error);
    sendErrorResponse(res, 500, "Server error");
  }
};

exports.getFlaggedIssuesByUserId = async (req, res) => {
  try {
    const flaggedIssues = await Flagged.find({ flagged_by: req.params.user_id })
      .populate("file_id")
      .populate("flagged_by", "username email");
    res.json(flaggedIssues);
  } catch (error) {
    console.error("Error in fetching flagged issues by user ID:", error);
    sendErrorResponse(res, 500, "Server error");
  }
};

exports.getFlaggedIssuesByFileId = async (req, res) => {
  try {
    const flaggedIssues = await Flagged.find({ file_id: req.params.file_id })
      .populate("file_id")
      .populate("flagged_by", "username email");
    res.json(flaggedIssues);
  } catch (error) {
    console.error("Error in fetching flagged issues by file ID:", error);
    sendErrorResponse(res, 500, "Server error");
  }
};
