const mongoose = require("mongoose");

const jobCommentSchema = new mongoose.Schema(
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
    comment_reply: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        comment: String,
        created_at: {
          type: Date,
          required: true,
        },
        updated_at: {
          type: Date,
          required: true,
        },
      },
    ],
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const JobComment = mongoose.model("JobComment", jobCommentSchema);
export default JobComment;
