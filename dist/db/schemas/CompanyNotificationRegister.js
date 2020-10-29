"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const companyNotificationRegisterSchema = new mongoose.Schema({
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });
const CompanyNotificationRegister = mongoose.model('CompanyNotificationRegister', companyNotificationRegisterSchema);
exports.default = CompanyNotificationRegister;
//# sourceMappingURL=CompanyNotificationRegister.js.map