import mongoose from "mongoose";

const originSchema = new mongoose.Schema({
  flag: {
    type: String,
    required: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
});

export default mongoose.model("Origin", originSchema);
