import mongoose from "mongoose";

const logSchema = new mongoose.Schema(
  {
    ip: { type: String, required: true },
    locale: { type: String, required: true },
    url: { type: String, required: true },
  },
  { timestamps: true }
);

const LogModel = mongoose.models.log || mongoose.model("log", logSchema);

export default LogModel;
