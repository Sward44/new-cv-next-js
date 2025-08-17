import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Types.ObjectId, ref: "User" },
    body: { type: String, required: true },
  },
  { timestamps: true }
);

const PostModel = mongoose.models.post || mongoose.model("post", postSchema);

export default PostModel;
