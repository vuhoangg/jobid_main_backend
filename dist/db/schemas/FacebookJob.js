"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable-next-line:no-var-requires
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const facebookJobSchema = new Schema({
    employer: {
        avatar: String,
        name: String,
    },
    address: {
        text: String,
    },
    long_description: String,
    share_url: String,
    title: String,
    sub_title: String,
    map: {
        lat: Number,
        lng: Number,
    }
}, { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } });
const FacebookJob = mongoose.model("FacebookJob", facebookJobSchema);
exports.default = FacebookJob;
//# sourceMappingURL=FacebookJob.js.map