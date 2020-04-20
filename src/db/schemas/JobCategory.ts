const mongoose = require("mongoose");

const jobCategorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    },
    seo_title: {
        type: String,
        default: "",
    },
    seo_description: {
        type: String,
        default: "",
    }
}, {timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}});

const JobCategory = mongoose.model('JobCategory', jobCategorySchema);
export default JobCategory;