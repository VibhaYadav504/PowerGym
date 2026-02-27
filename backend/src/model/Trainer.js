import mongoose from "mongoose";

const trainerSchema = new mongoose.Schema(
  {
    photo: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    position: {
      type: String,
      required: true,
      trim: true,
    },
   status: { type: String, enum: ["Active", "Inactive"], default: "Active" }
  },
  { timestamps: true }
);


const Trainer =
  mongoose.models.Trainer || mongoose.model("Trainer", trainerSchema);

export default Trainer;