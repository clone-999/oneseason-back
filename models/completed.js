import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const completedSchema = new mongoose.Schema(
  {
    user: {
      type: ObjectId,
      ref: "User",
    },
    place: {
      type: ObjectId,
      ref: "Place",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Completed", completedSchema);
