const mongoose = require("mongoose");

const jobCategorySchema = new mongoose.Schema({

}, {timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}});

const JobCategory = mongoose.model('JobCategory', jobCategorySchema);
export default JobCategory;