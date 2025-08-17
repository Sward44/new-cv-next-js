import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    done: { type: Boolean, default: false },
    name: { type: String },
    surname: { type: String },
    phone: { type: String },
    site: { type: String },
  },
  { timestamps: true }
);

const UserModel = mongoose.models.user || mongoose.model("user", userSchema);

export default UserModel;
