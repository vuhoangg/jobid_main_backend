"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const jobCommentSchema = new mongoose.Schema({
    comment: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "JobPost",
    },
    children: {
        type: Boolean,
        default: false,
    },
}, { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } });
const JobComment = mongoose.model("JobComment", jobCommentSchema);
exports.default = JobComment;
//# sourceMappingURL=JobComment.js.map