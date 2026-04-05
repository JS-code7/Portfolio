import mongoose from "mongoose";

const LogSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["visit", "click", "project"],
    required: true,
  },
  action: { type: String, required: true, trim: true, maxlength: 200 },
  metadata: { type: mongoose.Schema.Types.Mixed, default: {} },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Log || mongoose.model("Log", LogSchema);
