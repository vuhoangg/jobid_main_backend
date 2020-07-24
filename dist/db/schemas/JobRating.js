"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const jobRatingSchema = new mongoose.Schema({
    job: String,
    rating: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
            value: Number,
            content: String,
        },
    ],
}, { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } });
const JobRating = mongoose.model("JobRating", jobRatingSchema);
exports.default = JobRating;
//# sourceMappingURL=JobRating.js.map