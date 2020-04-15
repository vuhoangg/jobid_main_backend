const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({

}, {timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}});

const Company = mongoose.model('Company', companySchema);
export default Company;