"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable-next-line:no-var-requires
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const communityTagSchema = new Schema({
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
    seo_title: {
        default: "",
        type: String,
    },
    seo_description: {
        type: String,
        default: "",
    },
}, { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } });
const CommunityTag = mongoose.model("CommunityTag", communityTagSchema);
exports.default = CommunityTag;
//# sourceMappingURL=CommunityTag.js.map