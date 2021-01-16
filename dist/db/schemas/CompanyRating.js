"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const companyRatingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company",
    },
    rate_value: Number,
    rate_title: String,
    rate_detail: String,
    rate_pros: String,
    rate_cons: String,
    rate_improve: String,
}, { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } });
const CompanyRating = mongoose.model("CompanyRating", companyRatingSchema);
exports.default = CompanyRating;
//# sourceMappingURL=CompanyRating.js.map