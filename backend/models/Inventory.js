import mongoose from "mongoose";


const inventorySchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },

    productId: {
      type: String,
      required: true,
    },

    stock: {
      type: Number,
      default: 0,
    },

    reserved: {
      type: Number,
      default: 0,
    },

    lowStockThreshold: {
      type: Number,
      default: 10,
    },

    warehouse: {
      type: String,
    },

    lastUpdated: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);


const Inventory = mongoose.model(
  "Inventory",
  inventorySchema
);


export default Inventory;