const mongoose = require("mongoose");

const companyFollowSchema = new mongoose.Schema({
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
}, {timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}});

const CompanyFollow = mongoose.model('CompanyFollow', companyFollowSchema);
export default CompanyFollow;
