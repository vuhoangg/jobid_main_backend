const mongoose = require("mongoose");

const jobKeywordSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    },
    keyword: {
        type: String,
    },
    seo_title: String,
    seo_description: String
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

const JobKeyword = mongoose.model('JobKeyword', jobKeywordSchema);
export default JobKeyword;
