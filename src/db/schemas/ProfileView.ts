const mongoose = require("mongoose");

const profileViewSchema = new mongoose.Schema({
  user_hunter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  user_profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  view_count: {
    type: Number,
    default: 0
  },
}, {timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}});

const ProfileView = mongoose.model('ProfileView', profileViewSchema);
export default ProfileView;
