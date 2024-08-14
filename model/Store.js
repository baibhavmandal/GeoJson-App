import mongoose from "mongoose";
import geocoder from "../utils/geocoder.js";

const StoreSchema = new mongoose.Schema({
  storeId: {
    type: String,
    required: [true, "Add store Id"],
    unique: true,
    trim: true,
    maxLength: [10, "Store Id should be less than 10 chars"],
  },
  address: {
    type: String,
    required: [true, "Please add an address"],
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
      index: "2dsphere",
    },
    formattedAddress: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

StoreSchema.pre("validate", async function (next) {
  try {
    const loc = await geocoder.geocode(this.address);
    this.location = {
      type: "Point",
      coordinates: [loc[0].longitude, loc[0].latitude],
      formattedAddress: loc[0].formattedAddress,
    };

    next();
  } catch (error) {
    console.log(error.message);
    next(error); // Pass the error to Mongoose error handling
  }
});

const Store = mongoose.model("Store", StoreSchema);

export default Store;
