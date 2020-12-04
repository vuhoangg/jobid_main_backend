"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const cvRequestSchema = new mongoose.Schema({
    request: {
        type: String,
        default: "",
    },
    cv_user: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: "CvUser",
    },
    response: {
        type: String,
        default: "",
    },
    status: {
        type: String,
        enum: ["request", 'response'],
        default: "request",
    },
}, { timestamps: { createdAt: "created_at", updatedAt: "updated_at" }, });
const CvRequest = mongoose.model("CvRequest", cvRequestSchema);
exports.default = CvRequest;
//# sourceMappingURL=CvRequest.js.map