import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema;

const placeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      minlength: 3,
      maxlength: 320,
      required: true,
    },
    slug: {
      type: String,
      lowercase: true,
    },
    address: {
      type: String,
      minlength: 3,
      maxlength: 320,
      required: true,
    },
    photos: [
      {
        public_id: {
          type: String,
        },
        url: { 
          type: String,
          required: true
        }
      }
    ],
    description: {
      type: {},
      minlength: 100,
      required: true,
    },
    perks: {
      type: [String],
    },
    extraInfo: {
      type: String,
      required: true,
    },
    checkIn: {
      type: String,
      required: true,
    },
    checkOut: {
      type: String,
      required: true,
    },
    maxGuests: {
      type: Number,
    },
    price: {
      type: Number,
      default: 9.99,
      required: true,
    },
    partner: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Place", placeSchema);
