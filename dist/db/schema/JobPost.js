"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const jobPostSchema = new mongoose.Schema({}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });
const JobPost = mongoose.model('JobPost', jobPostSchema);
exports.default = JobPost;
//# sourceMappingURL=JobPost.js.map