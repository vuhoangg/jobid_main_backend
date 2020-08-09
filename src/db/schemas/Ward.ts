// tslint:disable-next-line:no-var-requires
const mongoose = require("mongoose");

const Schema: any = mongoose.Schema;

const wardSchema: any = new Schema(
  {
    district: {
      required: true,
      type: Schema.Types.ObjectId,
      ref: "District",
    },
    name: {
      required: true,
      type: String,
    },
    title: {
      default: "",
      type: String,
    },
    slug: {
      required: true,
      type: String,
    },
    description: {
      default: "",
      type: String,
    },
    focus_keyword: {
      default: "",
      type: String,
    },
    seo_title: {
      default: "",
      type: String,
    },
    seo_description: {
      default: "",
      type: String,
    },
    image: {
      default: "",
      type: String,
    },
    image_description: {
      default: "",
      type: String,
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const Ward = mongoose.model("Ward", wardSchema);
export default Ward;
