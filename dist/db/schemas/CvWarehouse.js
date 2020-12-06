"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const cvWarehouse = new mongoose.Schema({
    employer: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: "Employer",
    },
    thumnail: {
        type: String,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    access: {
        type: String,
        enum: ["public", "private"],
        default: "private"
    },
    status: {
        type: String,
        enum: ["active", "trash"],
        default: "active",
    }
}, { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } });
const CvWarehouse = mongoose.model("CvWarehouse", cvWarehouse);
exports.default = CvWarehouse;
//# sourceMappingURL=CvWarehouse.js.map