"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const jobRatingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "JobPost",
    },
    rat_value: Number,
    rat_comment: String,
}, { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } });
const JobRating = mongoose.model("JobRating", jobRatingSchema);
exports.default = JobRating;
//# sourceMappingURL=JobRating.js.map