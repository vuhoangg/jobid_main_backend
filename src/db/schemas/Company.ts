const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
  {
    name: String,
    business_code: String,
    slogan: String,
    logo: String,
    cover: String,
    website: String,
    email: String,
    phone: String,
    facebook: String,
    youtube: String,
    description: String,
    company_type: String,
    video: [String],
    job_category: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "JobCategory",
      },
    ],

    verify_status: {
      type: Boolean,
      default: false,
    },
    premium_status: {
      type: Boolean,
      default: false,
    },
    album: [
      {
        name: String,
        images: [
          {
            src: String,
            description: String,
          }
        ]
      }
    ],
    slug: {
      type: String,
      unique: true,
    },

    size: {
      from: {
        type: Number,
        default: 0,
      },
      to: {
        type: Number,
        default: 0,
      }
    },
    story: [
      {
        title: String,
        content: String,
        media_type: String,
        media_link: String,
      }
    ],

    people: [
      {
        name: String,
        content: String,
        position: String,
        avatar: String,
      },
    ],
    office: [
      {
        city: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "City",
        },
        district: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "District",
        },
        ward: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Ward",
        },
        address: String,
        lat: Number,
        lng: Number,
      }
    ],
    benefit: [
      {
        content: String,
        id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Benefit",
        },
      },
    ],
    follow: {
      type: Number,
      default: 0,
    },
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    seo_title: String,
    seo_description: String,
  },
  {timestamps: {createdAt: "created_at", updatedAt: "updated_at"}}
);

const Company = mongoose.model("Company", companySchema);
export default Company;
