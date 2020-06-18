"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const CompanyFeatureSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
}, { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } });
const CompanyFeature = mongoose.model("CompanyFeature", CompanyFeatureSchema);
exports.default = CompanyFeature;
//# sourceMappingURL=CompanyFeature.js.map