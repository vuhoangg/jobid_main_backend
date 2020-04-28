const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true
  },
  password: {
    type: String,
  },
  first_name: {
    default: "",
    type: String,
  },
  last_name: {
    default: "",
    type: String,
  },
  birth_day: {
    default: "",
    type: Date,
  },
  avatar: {
    default: "",
    type: String,
  },
  gender: {
    default: "",
    type: String,
  },

  // == info filter
  intro: String,


  // == end info filter
  spam: {
    default: 0,
    type: Number
  },
}, {timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}});

const User = mongoose.model('User', userSchema);
export default User;
