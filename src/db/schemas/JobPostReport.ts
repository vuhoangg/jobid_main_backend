const mongoose = require("mongoose");

const jobPostReportSchema = new mongoose.Schema({
  job_post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'JobPost',
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  reason: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

const JobPostReport = mongoose.model('JobPostReport', jobPostReportSchema);
export default JobPostReport;
