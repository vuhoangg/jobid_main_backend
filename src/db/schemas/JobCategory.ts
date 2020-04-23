const mongoose = require("mongoose");

const jobCategorySchema = new mongoose.Schema({
  vi_title: {
    type: String,
    required: true
  },
  en_title: {
    type: String,
    required: true
  },
  vi_slug: {
    type: String,
    required: true,
    unique: true,
  },
  en_slug: {
    type: String,
    required: true,
    unique: true,
  },
  seo_title: String,
  seo_description: String
}, {timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}});

const JobCategory = mongoose.model('JobCategory', jobCategorySchema);
export default JobCategory;
