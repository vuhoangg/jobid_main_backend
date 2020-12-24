"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable-next-line:no-var-requires
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const communityPostSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    thumbnail: {
        type: String,
        default: "",
    },
    title: {
        type: String,
        default: "",
    },
    community_category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CommunityCategory"
    },
    slug: {
        type: String,
        require: true,
    },
    community_tag: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "CommunityTag"
        }
    ],
    description: {
        default: "",
        type: String,
    },
    seo_robots: {
        type: String,
        default: ""
    },
    seo_title: {
        type: String,
        default: "",
    },
    seo_description: {
        type: String,
        default: "",
    },
    like_count: {
        type: Number,
        default: 0,
    },
    view_count: {
        type: Number,
        default: 0,
    },
    answer_count: {
        type: Number,
        default: 0,
    },
    status: {
        type: String,
        enum: ["active", "delete", "hidden"],
    },
}, { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } });
const CommunityPost = mongoose.model("CommunityPost", communityPostSchema);
exports.default = CommunityPost;
//# sourceMappingURL=CommunityPost.js.map