import mongoose, { Schema, models } from "mongoose";

const postSchema = new Schema(
  {
    user: { type: mongoose.Types.ObjectId, ref: "User" },
    body: { type: String, required: true },
  },
  { timestamps: true }
);

const PostModel = models.post || mongoose.model("post", postSchema);

export default PostModel;
