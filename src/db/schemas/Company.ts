const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
  {
    default_lang: {
      type: String,
      required: true,
    },
    en_name: String,
    vi_name: String,

    job_category: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "JobCategory",
      },
    ],
    company_type: String,
    job_location: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "JobLocation",
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
    address: [String],
    album: [String],
    en_slug: {
      type: String,
      unique: true,
    },
    vi_slug: {
      type: String,
      unique: true,
    },
    logo: String,
    cover: String,
    website: String,
    min_size: {
      type: Number,
      default: 0,
    },
    max_size: {
      type: Number,
      default: 0,
    },
    email: {
      type: String,
      unique: true,
    },
    region: String,
    phone: String,
    facebook: String,
    youtube: String,
    address_contact: String,
    description: String,
    slogan: String,
    media_story: [
      {
        vi_title: String,
        en_title: String,
        vi_content: [String],
        en_content: [String],
        media_type: String,
        media_link: String,
      },
    ],
    text_story: [
      {
        vi_title: String,
        en_title: String,
        vi_content: [String],
        en_content: [String],
      },
    ],
    people: [
      {
        vi_name: String,
        en_name: String,
        vi_content: [String],
        en_content: [String],
        vi_position: String,
        en_position: String,
        media_link: String,
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
        vi_content: String,
        en_content: String,
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
    list_user: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        target_permission: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "GroupPermission",
        },
      },
    ],

    seo_title: String,
    seo_description: String,
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const Company = mongoose.model("Company", companySchema);
export default Company;
