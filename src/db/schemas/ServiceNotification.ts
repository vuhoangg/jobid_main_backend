const mongoose = require("mongoose");

const ServiceNotificationSchema = new mongoose.Schema(
  {
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
    image: {
      type: String,
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const ServiceNotification = mongoose.model("ServiceNotification", ServiceNotificationSchema);
export default ServiceNotification;
