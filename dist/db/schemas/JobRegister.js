"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const jobRegisterSchema = new mongoose.Schema({
    contact_name: {
        type: String,
        required: true,
    },
    job_title: {
        type: String,
        required: true,
    },
    job_location: {
        type: String,
        required: true,
    },
    contact_phone: {
        type: String,
        required: true,
    },
    contact_email: {
        type: String,
    }
}, { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } });
const JobRegister = mongoose.model("JobRegister", jobRegisterSchema);
exports.default = JobRegister;
//# sourceMappingURL=JobRegister.js.map