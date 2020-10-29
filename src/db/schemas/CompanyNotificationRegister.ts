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
export default CompanyNotificationRegister;
