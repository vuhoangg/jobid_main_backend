"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const jobLocationSchema = new mongoose.Schema({
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
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });
const JobLocation = mongoose.model('JobLocation', jobLocationSchema);
exports.default = JobLocation;
//# sourceMappingURL=JobLocation.js.map