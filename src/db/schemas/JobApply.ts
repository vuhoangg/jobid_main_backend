const mongoose = require("mongoose");

const jobApplySchema = new mongoose.Schema(
  {
    job_post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "JobPost",
    },
    target: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    email: String,
    description: String,
    file: String,
    status: {
      type: String,
      enum: ["pending", "approve", "decline"],
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const JobApply = mongoose.model("JobApply", jobApplySchema);
export default JobApply;
