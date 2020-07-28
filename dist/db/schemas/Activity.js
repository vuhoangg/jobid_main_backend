"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const activitySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    message: String,
    href_type: String,
    href_url: String,
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });
const Activity = mongoose.model('Activity', activitySchema);
exports.default = Activity;
//# sourceMappingURL=Activity.js.map