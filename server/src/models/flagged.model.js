const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const flaggedIssueSchema = new Schema(
  {
    file_id: {
      type: Schema.Types.ObjectId,
      ref: "Files",
      required: true,
    },
    // start_line: {
    //   type: Number,
    //   required: true,
    // },
    // end_line: {
    //   type: Number,
    //   required: true,
    // },
    issue_type: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    flagged_by: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
  },
  { timestamps: true }
);

const FlaggedIssue = mongoose.model("FlaggedIssue", flaggedIssueSchema);

module.exports = FlaggedIssue;
