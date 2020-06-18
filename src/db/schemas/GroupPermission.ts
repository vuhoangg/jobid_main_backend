const mongoose = require("mongoose");

const groupPermissionSchema = new mongoose.Schema(
  {
    name: String,
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
    },
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
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const GroupPermission = mongoose.model("GroupPermission", groupPermissionSchema);
export default GroupPermission;
