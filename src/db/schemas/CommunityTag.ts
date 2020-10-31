// tslint:disable-next-line:no-var-requires
const mongoose = require("mongoose");

const Schema: any = mongoose.Schema;

const communityTagSchema: any = new Schema(
    {
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
    },
    { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const CommunityTag = mongoose.model("CommunityTag", communityTagSchema);
export default CommunityTag;
