const mongoose = require("mongoose");

const jobLocationSchema = new mongoose.Schema({

}, {timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}});

const JobLocation = mongoose.model('JobLocation', jobLocationSchema);
export default JobLocation;