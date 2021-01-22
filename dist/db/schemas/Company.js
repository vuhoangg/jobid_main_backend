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
const companySchema = new mongoose.Schema({
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
    view_count: {
        type: Number,
        default: 0,
    },
    follow: {
        type: Number,
        default: 0,
    },
    one_star_count: {
        type: Number,
        default: 0,
    },
    two_star_count: {
        type: Number,
        default: 0,
    },
    three_star_count: {
        type: Number,
        default: 0,
    },
    four_star_count: {
        type: Number,
        default: 0,
    },
    five_star_count: {
        type: Number,
        default: 0,
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employer",
    },
    seo_title: String,
    seo_description: String,
}, { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } });
// if (process.env.ELASTICSEARCH_ENABLE === "true") {
//   companySchema.plugin(mongoosastic, {
//     esClient: elClient,
//   });
// }
const Company = mongoose.model("Company", companySchema);
// First time sync db from mongodb to elasticsearch
// if (process.env.ELASTICSEARCH_ENABLE === "true" && process.env.ELASTICSEARCH_ENABLE_FIRST_TIME === "true") {
//   const stream = Company.synchronize();
//   let count = 0;
//   stream.on("data", (err, doc) => {
//     console.log(`company ${count}`);
//     count++;
//   });
//   stream.on('close', function () {
//     console.log("Indexed " + count + " documents");
//   });
//   stream.on('error', function (err) {
//     console.log(err);
//   });
// }
exports.default = Company;
//# sourceMappingURL=Company.js.map