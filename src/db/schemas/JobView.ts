const mongoose = require("mongoose");

const jobViewSchema = new mongoose.Schema({
  job_post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'JobPost',
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  view_count: {
    type: Number,
    default: 0,
  }
}, {timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}});

const JobView = mongoose.model('JobView', jobViewSchema);
export default JobView;
