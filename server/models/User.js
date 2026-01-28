import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  image: { type: String },
  googleId: { type: String, unique: true },
  password: { type: String },
  role: { type: String, default: "user" },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;
