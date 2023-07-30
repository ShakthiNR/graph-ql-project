import { Schema, model } from "mongoose";

const userSchema = new Schema({
  username: {
    type: String,
    default: null,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
  },
});

const User = model("User", userSchema);

export default User;
