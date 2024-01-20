import mongoose from "mongoose";

const urlSchema = new mongoose.Schema(
  {
    shortId: {
      type: String,
      required: true,
      unique: true,
    },
    redirectUrl: {
      type: String,
      require: true,
    },
    visitHistory: [{ timestamps: { type: String } }],
  },
  {
    timestamps: true,
  }
);

const UrlModel = mongoose.model("url", urlSchema);
export default UrlModel;
