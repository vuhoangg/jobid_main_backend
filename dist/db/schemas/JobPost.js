"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const mongoosastic = require("mongoosastic");
const elasticsearch_1 = require("@elastic/elasticsearch");
const elClient = new elasticsearch_1.Client({
    node: process.env.ELASTICSEARCH_HOST,
    auth: {
        username: process.env.ELASTICSEARCH_AUTH_USERNAME,
        password: process.env.ELASTICSEARCH_AUTH_PASSWORD,
    },
});
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
    },
    staff_pick: {
        type: Boolean,
        default: false
    }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });
jobPostSchema.index({
    title: "text",
    "company.name": "text",
}, {
    weights: {
        "title": 10,
        "company.name": 8,
    }
});
jobPostSchema.index({
    end_date: 1,
});
jobPostSchema.index({
    employer: 1,
});
jobPostSchema.index({
    "company.ref": 1,
});
// if (process.env.ELASTICSEARCH_ENABLE === "true") {
//   jobPostSchema.plugin(mongoosastic, {
//     esClient: elClient,
//   });
// }
const JobPost = mongoose.model('JobPost', jobPostSchema);
// First time sync db from mongodb to elasticsearch
// if (process.env.ELASTICSEARCH_ENABLE === "true" && process.env.ELASTICSEARCH_ENABLE_FIRST_TIME === "true") {
//   const stream = JobPost.synchronize();
//   let count = 0;
//   stream.on("data", (err, doc) => {
//     console.log(`jobpost ${count}`);
//     count++;
//   });
//   stream.on('close', function () {
//     console.log("Indexed " + count + " documents");
//   });
//   stream.on('error', function (err) {
//     console.log(err);
//   });
// }
exports.default = JobPost;
//# sourceMappingURL=JobPost.js.map