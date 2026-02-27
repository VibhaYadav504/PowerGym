import mongoose from "mongoose";

const planSchema = new mongoose.Schema(
  {
    price: {
      type: String,
      required: true,
      trim: true,
    },
    service: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
  },
  { timestamps: true }
);

// ✅ Prevent OverwriteModelError
const Plan = mongoose.models.Plan || mongoose.model("Plan", planSchema);

export default Plan;