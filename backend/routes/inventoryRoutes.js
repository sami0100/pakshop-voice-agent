import express from "express";

import {
  getInventory,
  getLowStockItems,
} from "../controllers/inventoryController.js";


const router = express.Router();


router.get(
  "/",
  getInventory
);


router.get(
  "/low-stock",
  getLowStockItems
);


export default router;