const mongoose = require("mongoose");
const { Schema } = mongoose;

const collaboratorSchema = new Schema(
  {
    project_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Projects",
      required: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    role: {
      type: String,
      enum: ["viewer", "editor", "owner"],
      default: "viewer",
    },
    permissions: {
      type: Schema.Types.Mixed,
      default: null,
    },
    joined_at: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Collaborator = mongoose.model("Collaborators", collaboratorSchema);

module.exports = Collaborator;
