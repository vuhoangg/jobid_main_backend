"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const notificationSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
    },
    subject: {
        type: String,
        required: true,
    },
    target: {
        object_type: String,
        ref: String,
    },
    message: {
        type: String,
        required: true,
    },
    href: {
        type: String,
        default: "",
    },
    read: {
        type: Boolean,
        default: false,
    }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });
const Notification = mongoose.model('Notification', notificationSchema);
exports.default = Notification;
//# sourceMappingURL=Notification.js.map