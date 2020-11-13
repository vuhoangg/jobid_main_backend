"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable-next-line:no-var-requires
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const communityPostLikeSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    community_post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CommunityPost'
    },
}, { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } });
const CommunityPostLike = mongoose.model("CommunityPostLike", communityPostLikeSchema);
exports.default = CommunityPostLike;
//# sourceMappingURL=CommunityPostLike.js.map