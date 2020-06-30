"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const ClientSubscriberSchema = new mongoose.Schema({
    clientId: {
        type: String,
    },
    location: {
        type: String,
    },
    browser: {
        type: String,
    }
}, { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } });
const ClientSubscriber = mongoose.model("ClientSubscriber", ClientSubscriberSchema);
exports.default = ClientSubscriber;
//# sourceMappingURL=ClientSubscriber.js.map