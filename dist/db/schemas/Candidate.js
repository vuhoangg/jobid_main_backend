"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const candidateSchema = new mongoose.Schema({
    first_name: {
        type: String,
    },
    last_name: {
        type: String,
    },
    interest: [String],
    job_open: {
        type: Boolean,
        default: false,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    avatar: String,
    photos: [String],
    cv: String,
    files: [
        {
            name: String,
            url: String,
        }
    ],
    birthday: Date,
    gender: String,
    phone: String,
    email: String,
    address: String,
    website: String,
    target: String,
    study: [{
            timeline: String,
            position: String,
            description: String,
        }],
    exp: [{
            timeline: String,
            position: String,
            description: String,
        }],
    project: [{
            name: String,
            url: String,
            member: Number,
            position: String,
            description: String,
        }],
    public: {
        type: Boolean,
        default: false,
    },
    note: [String],
    upload_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });
const Candidate = mongoose.model('Candidate', candidateSchema);
exports.default = Candidate;
//# sourceMappingURL=Candidate.js.map