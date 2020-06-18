"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const groupPermissionSchema = new mongoose.Schema({
    name: String,
    permission: [
        {
            resource: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "CompanyFeature",
            },
            actions: {
                read: {
                    type: Boolean,
                    required: true,
                },
                create: {
                    type: Boolean,
                    required: true,
                },
                update: {
                    type: Boolean,
                    required: true,
                },
                delete: {
                    type: Boolean,
                    required: true,
                },
            },
        },
    ],
}, { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } });
const GroupPermission = mongoose.model("GroupPermission", groupPermissionSchema);
exports.default = GroupPermission;
//# sourceMappingURL=GroupPermission.js.map