const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema({

}, {timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}});

const JobPreferLanguage = mongoose.model('JobPreferLanguage', skillSchema);
export default JobPreferLanguage;