const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  project_name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  owner_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Project = mongoose.model("Project", projectSchema);
module.exports = Project;
