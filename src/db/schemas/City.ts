// tslint:disable-next-line:no-var-requires
const mongoose = require("mongoose");

const Schema: any = mongoose.Schema;

const citySchema: any = new Schema(
  {
    name: {
      required: true,
      type: String,
    },
    // seo
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

const City = mongoose.model("City", citySchema);
export default City;
