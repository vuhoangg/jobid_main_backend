"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const communityPostViewSchema = new mongoose.Schema({
    community_post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CommunityPost',
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });
const CommunityPostView = mongoose.model('CommunityPostView', communityPostViewSchema);
exports.default = CommunityPostView;
//# sourceMappingURL=CommunityPostView.js.map