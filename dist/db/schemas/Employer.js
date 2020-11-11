"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const employerSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
    },
    psid: {
        type: String,
    },
    password: {
        type: String,
    },
    first_name: {
        default: "",
        type: String,
    },
    last_name: {
        default: "",
        type: String,
    },
    full_name: {
        default: "",
        type: String,
    },
    birth_day: {
        default: "",
        type: Date,
    },
    avatar: {
        default: "",
        type: String,
    },
    gender: {
        default: "",
        type: String,
    },
    spam: {
        default: 0,
        type: Number,
    },
    accessToken: {
        type: String,
    },
    refreshToken: {
        type: String,
    },
}, { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } });
const Employer = mongoose.model("Employer", employerSchema);
exports.default = Employer;
//# sourceMappingURL=Employer.js.map