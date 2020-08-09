const mongoose = require("mongoose");

const benefitSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  icon: String,
  seo_title: String,
  seo_description: String
}, {timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}});

const Benefit = mongoose.model('Benefit', benefitSchema);
export default Benefit;
