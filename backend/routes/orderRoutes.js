import express from "express";

import {
  getOrders,
  getOrderById,
  getCustomerOrders,
} from "../controllers/orderController.js";


const router = express.Router();



router.get(
  "/",
  getOrders
);



router.get(
  "/customer/:customerId",
  getCustomerOrders
);



router.get(
  "/:id",
  getOrderById
);



export default router;