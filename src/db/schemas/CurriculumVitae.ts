const mongoose = require("mongoose");

const CurriculumVitaeSchema = new mongoose.Schema(
  {
    theme_id: {
      type: String,
      required: true,
    },
    user_created: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    image_url: {
      type: String,
      require: true,
    },
    pdf_url: {
      type: String,
      require: true,
    },
    avatar: {
      type: String,
    },
    info: {
      info_resumeTitle: {
        type: String,
      },
      info_name: {
        type: String,
      },
      info_birthday: {
        type: String,
      },
      info_email: {
        type: String,
      },
      info_phone: {
        type: String,
      },
      info_address: {
        type: String,
      },
    },
    education: [
      {
        id: {
          type: String,
        },
        education_school: {
          type: String,
        },
        education_course: {
          type: String,
        },
        education_specialized: {
          type: String,
        },
        education_detail: {
          type: String,
        },
      },
    ],
    target: {
      target_short: {
        type: String,
      },
      target_long: {
        type: String,
      },
      target_detail: {
        type: String,
      },
    },
    interest: [
      {
        id: { type: String },
        interest_name: { type: String },
      },
    ],
    experience: [
      {
        id: {
          type: String,
        },
        experience_time: {
          type: String,
        },
        experience_company: {
          type: String,
        },
        experience_title: {
          type: String,
        },
        experience_detail: {
          type: String,
        },
      },
    ],
    skill: [
      {
        id: {
          type: String,
        },
        skill_title: {
          type: String,
        },
        skill_level: {
          type: Number,
        },
      },
    ],
    person: [
      {
        id: {
          type: String,
        },
        person_name: {
          type: String,
        },
        person_company: {
          type: String,
        },
        person_email: {
          type: String,
        },
        person_phone: {
          type: String,
        },
      },
    ],
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const CurriculumVitae = mongoose.model("CurriculumVitae", CurriculumVitaeSchema);
export default CurriculumVitae;
