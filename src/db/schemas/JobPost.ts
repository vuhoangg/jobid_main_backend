const mongoose = require("mongoose");

const jobPostSchema = new mongoose.Schema({
  source: {
    type: String,
  },
  title: {
    type: String,
  },
  slug: {
    type: String,
    unique: true,
  },
  job_type: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'JobType',
  },
  job_level: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'JobLevel',
  },
  job_category: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'JobCategory',
    }
  ],
  number: Number,
  description: String,
  requirement: String,
  salary: {
    min: Number,
    max: Number,
    show: {
      type: Boolean,
      default: true
    }
  },
  job_skill: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'JobSkill',
    }
  ],
  address: [
    {
      city: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'City',
      },
      district: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'District',
      },
      ward: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ward',
      },
      specific: String,
      text: String,
      lat: Number,
      lng: Number,
    }
  ],
  company: {
    ref: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company',
    },
    name: String,
  },
  contact: {
    name: String,
    email: String,
    phone: String,
  },
  image: String,
  photos: [String],
  video: String,
  benefit: [
    {
      benefit_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Benefit',
      },
      content: String,
    },
  ],
  exp: Number,
  gender: String,
  end_date: Date,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  employer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employer'
  },
  view_count: {
    type: Number,
    default: 0
  },
  seo_title: String,
  seo_description: String,
  status: {
    type: String,
    enum: ['active', 'trash', 'draft'],
  }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

jobPostSchema.index({
  title: "text",
  "company.name": "text",
  "description": "text",
  "requirement": "text",
}, {
  weights: {
    "title": 10,
    "company.name": 8,
    "description": 2,
    "requirement": 2,
  }
});

const JobPost = mongoose.model('JobPost', jobPostSchema);
export default JobPost;
