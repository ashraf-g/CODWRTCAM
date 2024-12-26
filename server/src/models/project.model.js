const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = new Schema(
  {
    project_name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    owner_id: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    tag: {
      type: Schema.Types.Mixed,
    },
    status: {
      type: String,
      enum: ["active", "deleted", "archived"],
      default: "active",
    },
  },
  { timestamps: true }
);

const Project = mongoose.model("Projects", projectSchema);
module.exports = Project;
