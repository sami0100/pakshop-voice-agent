import express from "express";

import {
  getOrders,
  getOrderById,
  getCustomerOrders,
  createOrder,
} from "../controllers/orderController.js";


const router = express.Router();



router.get(
  "/",
  getOrders
);



router.post(
  "/",
  createOrder
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