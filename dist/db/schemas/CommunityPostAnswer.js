"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable-next-line:no-var-requires
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const communityPostAnswerSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    community_post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CommunityPost"
    },
    reply: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CommunityPostAnswer"
    },
    description: {
        type: String,
        require: true,
    },
    like_count: {
        type: Number,
        default: 0,
    },
    reply_count: {
        type: Number,
        default: 0,
    },
}, { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } });
const CommunityPostAnswer = mongoose.model("CommunityPostAnswer", communityPostAnswerSchema);
exports.default = CommunityPostAnswer;
//# sourceMappingURL=CommunityPostAnswer.js.map