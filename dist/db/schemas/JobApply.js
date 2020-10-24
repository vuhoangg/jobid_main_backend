"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const jobApplySchema = new mongoose.Schema({
    job_post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "JobPost",
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    email: String,
    description: String,
    file: String,
    status: {
        type: String,
        enum: ["pending", "approve", "decline"],
    },
}, { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } });
const JobApply = mongoose.model("JobApply", jobApplySchema);
exports.default = JobApply;
//# sourceMappingURL=JobApply.js.map