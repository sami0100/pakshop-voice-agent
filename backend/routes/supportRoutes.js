import express from "express";

import {
  createSupportTicket,
  getCustomerTickets,
  getTicketById,
} from "../controllers/supportController.js";


const router = express.Router();



router.post(
  "/tickets",
  createSupportTicket
);



router.get(
  "/tickets/customer/:customerId",
  getCustomerTickets
);



router.get(
  "/tickets/:ticketId",
  getTicketById
);



export default router;