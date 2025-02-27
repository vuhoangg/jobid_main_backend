"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const bannerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        require: true
    },
    href: {
        type: String,
        require: true
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
    }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });
const Banner = mongoose.model('Banner', bannerSchema);
exports.default = Banner;
//# sourceMappingURL=Banner.js.map