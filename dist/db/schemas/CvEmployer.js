"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const cvEmployer = new mongoose.Schema({
    cv_warehouse: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: "CvWarehouse",
    },
    title: {
        type: String,
        required: true,
    },
    origin_url: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    birthday: {
        type: Date,
    },
    gender: {
        type: String,
    },
    num_experience: {
        type: String,
    },
    skill: [String],
    position: {
        type: String,
    },
    city: {
        type: Schema.Types.ObjectId,
        ref: "City",
    },
    job_level: {
        type: Schema.Types.ObjectId,
        ref: "JobLevel",
    },
    job_type: {
        type: Schema.Types.ObjectId,
        ref: "JobType",
    },
}, { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } });
const CvEmployer = mongoose.model("CvEmployer", cvEmployer);
exports.default = CvEmployer;
//# sourceMappingURL=CvEmployer.js.map