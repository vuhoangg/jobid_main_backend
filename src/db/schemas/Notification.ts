const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  type: {
    type: String, // user | system | channel
    required: true,
  },
  subject: {
    type: String, // user_apply_job
    required: true,
  },
  target: {
    object_type: String, // user | company
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
}, {timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}});

const Notification = mongoose.model('Notification', notificationSchema);
export default Notification;
