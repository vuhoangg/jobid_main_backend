const mongoose = require("mongoose");

const jobCommentReplySchema = new mongoose.Schema(
  {
    comment: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "JobPost",
    },
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "JobComment",
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const JobCommentReply = mongoose.model("JobCommentReply", jobCommentReplySchema);
export default JobCommentReply;
