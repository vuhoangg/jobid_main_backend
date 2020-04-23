"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const companySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    },
    seo_title: {
        type: String,
        default: "",
    },
    seo_description: {
        type: String,
        default: "",
    }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });
const Company = mongoose.model('Company', companySchema);
exports.default = Company;
//# sourceMappingURL=Company.js.map