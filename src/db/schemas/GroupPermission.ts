const mongoose = require("mongoose");

const groupPermissionSchema = new mongoose.Schema({
  name: String,
  permission: {

  },
}, {timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}});

const GroupPermission = mongoose.model('GroupPermission', groupPermissionSchema);
export default GroupPermission;
