"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const jobLevelSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    },
    seo_title: String,
    seo_description: String
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });
const JobLevel = mongoose.model('JobLevel', jobLevelSchema);
exports.default = JobLevel;
//# sourceMappingURL=JobLevel.js.map