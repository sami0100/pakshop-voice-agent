import express from "express";

import {
  getRevenue,
  getTopCustomers,
} from "../controllers/analyticsController.js";


const router = express.Router();


router.get(
  "/revenue",
  getRevenue
);


router.get(
  "/top-customers",
  getTopCustomers
);


export default router;