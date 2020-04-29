const mongoose = require("mongoose");

const jobPreferLanguageSchema = new mongoose.Schema({
  vi_title: {
    type: String,
    required: true,
  },
  en_title: {
    type: String,
    required: true,
  },
  vi_slug: {
    type: String,
    required: true,
    unique: true,
  },
  en_slug: {
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
}, {timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}});

const JobPreferLanguage = mongoose.model('JobPreferLanguage', jobPreferLanguageSchema);
export default JobPreferLanguage;
