import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },

    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    city: String,

    totalOrders: {
      type: Number,
      default: 0,
    },

    totalSpent:

    {
      type: Number,
      default: 0,
    },

    joinedDate: String,
  },
  {
    timestamps: true,
  }
);


const Customer = mongoose.model(
  "Customer",
  customerSchema
);


export default Customer;