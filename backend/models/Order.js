import mongoose from "mongoose";


const orderItemSchema = new mongoose.Schema(
  {
    productId: {
      type: String,
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },
  },
  {
    _id: false,
  }
);



const customerSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
    },

    email: {
      type: String,
    },

    phone: {
      type: String,
    },
  },
  {
    _id: false,
  }
);



const deliverySchema = new mongoose.Schema(
  {
    province: {
      type: String,
    },

    city: {
      type: String,
    },

    address: {
      type: String,
    },

    postalCode: {
      type: String,
    },

    notes: {
      type: String,
    },

    estimate: {
      type: String,
    },
  },
  {
    _id: false,
  }
);



const trackingHistorySchema = new mongoose.Schema(
  {
    status: {
      type: String,
    },

    label: {
      type: String,
    },

    at: {
      type: Date,
    },
  },
  {
    _id: false,
  }
);



const orderSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },

    orderNumber: {
      type: String,
    },


    customerId: {
      type: String,
      required: true,
    },


    customer: {
      type: customerSchema,
    },


    date: {
      type: Date,
      required: true,
    },


    status: {
      type: String,
      default: "Processing",
    },


    trackingStatus: {
      type: String,
    },


    trackingHistory: [
      trackingHistorySchema
    ],


    delivery: {
      type: deliverySchema,
    },


    items: [
      orderItemSchema
    ],


    totalAmount: {
      type: Number,
      required: true,
    },


    paymentMethod: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);



const Order = mongoose.model(
  "Order",
  orderSchema
);


export default Order;