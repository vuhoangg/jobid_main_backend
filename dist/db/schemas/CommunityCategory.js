"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable-next-line:no-var-requires
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const communityCategorySchema = new Schema({
    parent_category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CommunityCategory"
    },
    title: {
        require: true,
        type: String,
    },
    description: {
        type: String,
        default: "",
    },
    slug: {
        required: true,
        type: String,
    },
    image: {
        type: String,
        default: "",
    },
    count: {
        type: Number,
        default: 0,
    },
    seo_title: {
        default: "",
        type: String,
    },
    seo_description: {
        type: String,
        default: "",
    },
}, { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } });
const CommunityCategory = mongoose.model("CommunityCategory", communityCategorySchema);
exports.default = CommunityCategory;
//# sourceMappingURL=CommunityCategory.js.map