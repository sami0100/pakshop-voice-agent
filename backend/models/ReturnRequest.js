import mongoose from "mongoose";


const returnRequestSchema = new mongoose.Schema(
  {
    returnId: {
      type: String,
      required: true,
      unique: true,
    },


    customerId: {
      type: String,
      required: true,
    },


    orderNumber: {
      type: String,
      required: true,
    },


    reason: {
      type: String,
      required: true,
    },


    status: {
      type: String,
      default: "Requested",
    },


    notes: {
      type: String,
    },

  },
  {
    timestamps: true,
  }
);



const ReturnRequest = mongoose.model(
  "ReturnRequest",
  returnRequestSchema
);



export default ReturnRequest;