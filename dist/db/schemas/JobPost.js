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
    job_type: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'JobType',
    },
    job_level: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'JobLevel',
    },
    job_category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'JobCategory',
    },
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
    address: {
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
        text: String,
        lat: Number,
        lng: Number,
    },
    company: {
        ref: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Company',
        },
        name: String,
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
    end_date: Date,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
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
const JobPost = mongoose.model('JobPost', jobPostSchema);
exports.default = JobPost;
//# sourceMappingURL=JobPost.js.map