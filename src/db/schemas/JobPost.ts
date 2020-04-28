const mongoose = require("mongoose");

const jobPostSchema = new mongoose.Schema({

}, {timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}});

const JobPost = mongoose.model('JobPost', jobPostSchema);
export default JobPost;
