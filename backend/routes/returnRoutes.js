import express from "express";

import {
  createReturnRequest,
  getCustomerReturns,
  getReturnById,
} from "../controllers/returnController.js";


const router = express.Router();



router.post(
  "/",
  createReturnRequest
);



router.get(
  "/customer/:customerId",
  getCustomerReturns
);



router.get(
  "/:returnId",
  getReturnById
);



export default router;