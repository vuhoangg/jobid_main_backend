"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const ServiceNotificationSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
    },
    text: {
        type: String,
    },
    href: {
        type: String,
    },
    tag: {
        type: String,
    },
    icon: {
        type: String,
    },
    badge: {
        type: String,
    },
    image: {
        type: String,
    },
}, { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } });
const ServiceNotification = mongoose.model("ServiceNotification", ServiceNotificationSchema);
exports.default = ServiceNotification;
//# sourceMappingURL=ServiceNotification.js.map