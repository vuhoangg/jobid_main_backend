"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const jobLocationSchema = new mongoose.Schema({
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
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });
const JobLocation = mongoose.model('JobLocation', jobLocationSchema);
exports.default = JobLocation;
//# sourceMappingURL=JobLocation.js.map