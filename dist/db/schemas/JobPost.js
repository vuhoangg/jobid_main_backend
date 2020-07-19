"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const jobPostSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    slug: {
        type: String,
        unique: true,
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
    description: String,
    requirement: String,
    job_location: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'JobLocation',
        }
    ],
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
    job_prefer_language: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'JobPreferLanguage',
        }
    ],
    email_for_application: {
        type: String,
    },
    company: {
        ref: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Company',
        },
        name: String,
        size: String,
        email: String,
        address: String,
        description: String,
        benefit: [
            {
                benefit_id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Benefit',
                },
                content: String,
            }
        ],
        logo: String,
        photos: [String],
        video: String,
    },
    view_count: {
        type: Number,
        default: 0
    },
    seo_title: String,
    seo_description: String,
    user: {
        in_company: {
            type: Number,
            default: 0,
        },
        ref: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    experience: Number,
    location: {
        lat: String,
        lng: String,
    },
    status: {
        type: String,
        enum: ['active', 'trash', 'draft'],
    }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });
const JobPost = mongoose.model('JobPost', jobPostSchema);
exports.default = JobPost;
//# sourceMappingURL=JobPost.js.map