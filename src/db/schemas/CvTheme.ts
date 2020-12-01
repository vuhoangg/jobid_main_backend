const mongoose = require("mongoose");
const Schema: any = mongoose.Schema;

const cvThemeSchema = new mongoose.Schema(
    {
        created_by: {
            required: true,
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        title: {
            type: String,
            default: "",
        },
        type: {
            type: String,
            default: "",
        },
        image: {
            type: String,
            default: "",
        },
        html: {
            type: String,
            default: "",
        },
        status: {
            type: String,
            enum: ["active", "inactive"],
            default: "active"
        }
    },
    { timestamps: { createdAt: "created_at", updatedAt: "updated_at" }, }
);

const CvTheme = mongoose.model("CvTheme", cvThemeSchema);
export default CvTheme;