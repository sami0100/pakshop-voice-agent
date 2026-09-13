import express from "express";

import {
  getRevenue,
  getRevenueByPeriod,
  getTopCustomers,
  getTrendingProducts,
  getSalesTrend,
} from "../controllers/analyticsController.js";


const router = express.Router();


router.get(
  "/revenue",
  getRevenue
);


router.get(
  "/revenue-period",
  getRevenueByPeriod
);


router.get(
  "/top-customers",
  getTopCustomers
);


router.get(
  "/trending-products",
  getTrendingProducts
);


router.get(
  "/sales-trend",
  getSalesTrend
);


export default router;