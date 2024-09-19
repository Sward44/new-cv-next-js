import mongoose, { Schema, models } from "mongoose";

const userSchema = new Schema(
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

const UserModel = models.user || mongoose.model("user", userSchema);

export default UserModel;
