const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const fileSchema = new Schema(
  {
    project_id: {
      type: Schema.Types.ObjectId,
      ref: "Projects",
      required: true,
    },
    file_name: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    file_type: {
      type: String,
      enum: ["text", "binary"],
      default: "text",
    },
    version: {
      type: String,
      default: "1.0.0",
    },
  },
  { timestamps: true }
);

const File = mongoose.model("Files", fileSchema);
module.exports = File;
