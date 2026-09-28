import express from "express";

import {
  getRevenue,
  getRevenueByPeriod,
  getTopCustomers,
  getTrendingProducts,
  getSalesTrend,
  getBusinessOverview,
  getSupportOverview,
  getDashboardSummary,
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


router.get(
  "/business-overview",
  getBusinessOverview
);

router.get(
  "/support-overview",
  getSupportOverview
);

router.get(
  "/dashboard-summary",
  getDashboardSummary
);
export default router;