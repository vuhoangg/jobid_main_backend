// tslint:disable-next-line:no-var-requires
const mongoose = require("mongoose");

const Schema: any = mongoose.Schema;

const communityPostAnswerSchema: any = new Schema(
    {
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
    },
    { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const CommunityPostAnswer = mongoose.model("CommunityPostAnswer", communityPostAnswerSchema);
export default CommunityPostAnswer;
