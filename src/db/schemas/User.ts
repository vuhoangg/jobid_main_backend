import JobSkill from "./JobSkill";

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true
  },
  password: {
    type: String,
  },
  first_name: {
    default: "",
    type: String,
  },
  last_name: {
    default: "",
    type: String,
  },
  birth_day: {
    default: "",
    type: Date,
  },
  avatar: {
    default: "",
    type: String,
  },
  gender: {
    default: "",
    type: String,
  },

  // == info filter
  intro: String,
  skill: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'JobSkill'
    }
  ],
  employment_history: [
    {
      position: {
        type: String,
        required: true,
      },
      company: {
        type: String,
        required: true,
      },
      from_month: Date,
      to_month: Date,
      description: String,
    }
  ],
  education_history: [
    {
      subject: {
        type: String,
        required: true,
      },
      school: {
        type: String,
        required: true,
      },
      qualification: {
        type: String,
        required: true,
      },
      from_month: Date,
      to_month: Date,
      achievement: String,
    }
  ],
  work_preference: {
    job_location: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'JobLocation'
      }
    ],
    job_category: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'JobCategory'
      }
    ],
    job_level: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'JobLevel'
    },
    salary: {
      type: Number,
      default: 0,
    },
    benefit: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Benefit'
      }
    ]
  },
  // == end info filter
  spam: {
    default: 0,
    type: Number
  },
}, {timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}});

const User = mongoose.model('User', userSchema);
export default User;
