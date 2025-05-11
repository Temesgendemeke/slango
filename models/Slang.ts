import mongoose from "mongoose";

const slangSchema = new mongoose({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  example: {
    type: [String],
  },
  explaination: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Category",
  },
  origin: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Origin",
  },
  like: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Like",
  },
  view: {
    type: Number,
    default: 0,
  },
});

export default mongoose.model("Slang", slangSchema);
