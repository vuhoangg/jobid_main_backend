// tslint:disable-next-line:no-var-requires
const mongoose = require("mongoose");

const Schema: any = mongoose.Schema;

const communityAnswerSchema: any = new Schema(
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
            ref: "CommunityAnswer"
        },
        description: {
            type: String,
            default: "",
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

const CommunityAnswer = mongoose.model("CommunityAnswer", communityAnswerSchema);
export default CommunityAnswer;
