"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const jobAlertSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    job_level: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'JobLevel',
    },
    job_location: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'JobLocation',
        }
    ],
    job_category: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'JobCategory',
        }
    ],
    job_salary: {
        type: Number,
        required: true,
    },
    recurring: {
        type: String,
        enum: ['daily', 'weekly'],
    }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });
const JobAlert = mongoose.model('JobAlert', jobAlertSchema);
exports.default = JobAlert;
//# sourceMappingURL=JobAlert.js.map