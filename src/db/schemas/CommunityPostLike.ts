// tslint:disable-next-line:no-var-requires
const mongoose = require("mongoose");

const Schema: any = mongoose.Schema;

const communityPostLikeSchema: any = new Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            index: true,
            ref: 'User'
        },
        question: {
            type: mongoose.Schema.Types.ObjectId,
            index: true,
            ref: 'Question'
        },
    },
    { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const CommunityPostLike = mongoose.model("CommunityPostLike", communityPostLikeSchema);
export default CommunityPostLike;
