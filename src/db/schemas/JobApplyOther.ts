const mongoose = require("mongoose");

const jobApplyOtherSchema = new mongoose.Schema(
  {
    job_post: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    email: String,
    description: String,
    file: String,
    type: {
      type: String,
      enum: ["facebook", "google"],
    },
    status: {
      type: String,
      enum: ["pending", "approve", "decline"],
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const JobApplyOther = mongoose.model("JobApplyOther", jobApplyOtherSchema);
export default JobApplyOther;
