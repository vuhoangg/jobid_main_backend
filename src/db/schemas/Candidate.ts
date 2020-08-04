const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
    unique: true,
  },
  interest: [String], // important
  job_open: {
    type: Boolean,
    default: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  cv: String,
  photos: [String],
  files: [
    {
      name: String,
      url: String,
    }
  ],
}, {timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}});

const Candidate = mongoose.model('Candidate', candidateSchema);
export default Candidate;
