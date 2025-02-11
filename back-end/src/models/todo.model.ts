import mongoose, { Schema, Document } from "mongoose";

const TodoSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: { type: String, required: true },
    description: { type: String },
    status: {
      type: String,
      enum: ["PENDING", "COMPLETED"],
      default: "PENDING",
    },
    dueDate: { type: Date, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Todo", TodoSchema);
