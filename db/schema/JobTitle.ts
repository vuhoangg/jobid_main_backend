const mongoose = require("mongoose");

const jobTitleSchema = new mongoose.Schema({
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

const JobTitle = mongoose.model('JobTitle', jobTitleSchema);
export default JobTitle;