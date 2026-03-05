import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  image: { type: String },
  googleId: { type: String, unique: true, sparse: true },
  password: { type: String },
  role: { type: String, default: "user" },
  blogs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'blog' }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;
