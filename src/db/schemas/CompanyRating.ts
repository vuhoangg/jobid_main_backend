const mongoose = require("mongoose");

const companyRatingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
    },
    rat_value: Number,
    rat_comment: String,
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const CompanyRating = mongoose.model("CompanyRating", companyRatingSchema);
export default CompanyRating;