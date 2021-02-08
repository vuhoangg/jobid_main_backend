"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    email: {
        type: String,
    },
    fbid: {
        type: String,
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
    full_name: {
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
        type: Number,
    },
    user_chiase: {
        type: mongoose.Schema.Types.ObjectId,
    },
    accessToken: {
        type: String,
    },
    refreshToken: {
        type: String,
    },
    // -- company role
    company_role: [
        {
            company_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Company",
            },
            group_permission: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "GroupPermission",
            },
        },
    ],
    manager_cv: [
        {
            cv_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "CurriculumVitae",
            },
        },
    ],
    info: {
        job_open: Boolean,
        avatar: String,
        name: String,
        birthday: Date,
        gender: {
            type: String,
            enum: ["male", "female"],
        },
        date: {
            type: String,
            enum: ["married", "alone"],
        },
        phone: String,
        website: String,
        address: {
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
            lat: Number,
            lng: Number,
            text: String,
        },
        intro: String,
        experience: [
            {
                time: {
                    from: Date,
                    to: Date,
                },
                company: String,
                position: String,
                level: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "JobLevel",
                },
                description: String,
                projects: [
                    {
                        time: {
                            from: Date,
                            to: Date,
                        },
                        name: String,
                        url: String,
                        position: String,
                        member: Number,
                        description: String,
                    },
                ],
            },
        ],
        education: [
            {
                time: {
                    from: Date,
                    to: Date,
                },
                school: String,
                major: String,
                description: String,
            },
        ],
        favorite_job: [
            {
                job_type: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "JobType",
                },
                target: String,
                job_category: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "JobCategory",
                },
                job_location: [
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
                    },
                ],
                salary: {
                    from: Number,
                    to: Number,
                },
            },
        ],
    },
    customize_info: {
        cover: String,
        avatar: String,
        files: [String],
        first_name: String,
        last_name: String,
        full_name: String,
        current_job_title: String,
        current_job_company: String,
        current_job_level: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "JobLevel",
        },
        current_experience_number: Number,
        phone: String,
        birthday: Date,
        nation: String,
        gender: String,
        status: String,
        location: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "JobLocation",
        },
        level_desired: String,
        specific_address: String,
        intro: String,
        education: String,
        form_of_work: String,
        work_of_location: String,
        career_goals: String,
        skill: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "JobSkill",
            },
        ],
        language: [
            {
                lang: String,
                level: String,
            },
        ],
        reference_person: [
            {
                name: String,
                company: String,
                phone: String,
                email: String,
            },
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
            },
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
            },
        ],
        work_preference: {
            job_category: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "JobCategory",
                },
            ],
            job_level: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "JobLevel",
            },
            salary: {
                type: Number,
                default: 0,
            },
            benefit: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Benefit",
                },
            ],
        },
    },
}, { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } });
const User = mongoose.model("User", userSchema);
exports.default = User;
//# sourceMappingURL=User.js.map