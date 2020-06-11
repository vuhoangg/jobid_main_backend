const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true
  },
  psid: {
    type: String,
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
  spam: {
    default: 0,
    type: Number
  },
  // -- company role
  company_role: [
    {
      company_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
      },
      group_permission: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'GroupPermission'
      }
    }
  ],
  customize_info: {
    psid: String, // facebook chat page id
    cover: String,
    avatar: String,
    files: [String],
    first_name: String,
    last_name: String,
    current_job_title: String,
    current_job_company: String,
    current_job_level: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "JobLevel"
    },
    current_experience_number: Number,
    phone: String,
    birthday: Date,
    nation: String, //  Quốc tịch
    gender: String,
    status: String, // Tình trạng hôn nhân
    location: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "JobLocation"
    },
    specific_address: String,
    intro: String,
    skill: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'JobSkill'
      }
    ],
    language: [
      {
        lang: String,
        level: String,
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
  }
}, {timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}});

const User = mongoose.model('User', userSchema);
export default User;
