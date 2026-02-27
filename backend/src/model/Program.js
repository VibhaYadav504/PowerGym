import mongoose from "mongoose";

const programSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    photo: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
  },
  { timestamps: true }
);


const Program =
  mongoose.models.Program || mongoose.model("Program", programSchema);

export default Program;