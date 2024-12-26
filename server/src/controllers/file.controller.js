const File = require("../models/file.model");
const { sendErrorResponse } = require("../helpers/responseHelper.js");

exports.createFile = async (req, res) => {
  try {
    const { project_id, file_name, content, file_type, version } = req.body;
    if (!file_name || !project_id || !content) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const newFile = new File({
      file_name,
      project_id,
      content,
      file_type,
      version,
    });
    await newFile.save();
    res.status(201).json({ message: "File created successfully" });
  } catch (error) {
    console.error("Error in creating file:", error);
    sendErrorResponse(res, 500, "Server error");
  }
};

exports.getAll = async (req, res) => {
  try {
    const files = await File.find().populate({
      path: "project_id",
      populate: {
        path: "owner_id",
        select: "name email",
      },
    });
    res.json(files);
  } catch (error) {
    console.error("Error in fetching all files:", error);
    sendErrorResponse(res, 500, "Server error");
  }
};

exports.getFileById = async (req, res) => {
  try {
    const file = await File.findById(req.params.id).populate({
      path: "project_id",
      populate: {
        path: "owner_id",
        select: "name email",
      },
    });
    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }
    res.json(file);
  } catch (error) {
    console.error("Error in fetching file by ID:", error);
    sendErrorResponse(res, 500, "Server error");
  }
};

exports.updateFile = async (req, res) => {
  try {
    const updatedFile = await File.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedFile) {
      return res.status(404).json({ message: "File not found" });
    }
    res.json(updatedFile);
  } catch (error) {
    console.error("Error in updating file:", error);
    sendErrorResponse(res, 500, "Server error");
  }
};

exports.deleteFile = async (req, res) => {
  try {
    const deletedFile = await File.findByIdAndDelete(req.params.id);
    if (!deletedFile) {
      return res.status(404).json({ message: "File not found" });
    }
    res.json({ message: "File deleted successfully" });
  } catch (error) {
    console.error("Error in deleting file:", error);
    sendErrorResponse(res, 500, "Server error");
  }
};
