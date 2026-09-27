import mongoose from "mongoose";


const supportTicketSchema = new mongoose.Schema(
  {
    ticketId: {
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


    issue: {
      type: String,
      required: true,
    },


    priority: {
      type: String,
      default: "Medium",
    },


    status: {
      type: String,
      default: "Open",
    },
  },
  {
    timestamps: true,
  }
);



const SupportTicket = mongoose.model(
  "SupportTicket",
  supportTicketSchema
);



export default SupportTicket;