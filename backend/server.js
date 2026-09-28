import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./server/db.js";

import productRoutes from "./routes/productRoutes.js";
import customerRoutes from "./routes/customerRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import inventoryRoutes from "./routes/inventoryRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";
import supportRoutes from "./routes/supportRoutes.js";
import returnRoutes from "./routes/returnRoutes.js";


dotenv.config();


const app = express();

const PORT =
  process.env.PORT || 5000;


// =====================================
// Database
// =====================================

connectDB();


// =====================================
// Middleware
// =====================================

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(
  express.json()
);


// =====================================
// API Routes
// =====================================

app.use(
  "/api/v1/products",
  productRoutes
);

app.use(
  "/api/v1/customers",
  customerRoutes
);

app.use(
  "/api/v1/orders",
  orderRoutes
);

app.use(
  "/api/v1/inventory",
  inventoryRoutes
);

app.use(
  "/api/v1/analytics",
  analyticsRoutes
);

app.use(
  "/api/v1/support",
  supportRoutes
);

app.use(
  "/api/v1/returns",
  returnRoutes
);


// =====================================
// Health / Root
// =====================================

app.get(
  "/",
  (req, res) => {

    res.json({
      success: true,
      message:
        "PakShop API is running",
    });

  }
);


app.get(
  "/api/v1/health",
  (req, res) => {

    res.json({
      success: true,
      service:
        "PakShop Backend",
      status:
        "healthy",
      timestamp:
        new Date().toISOString(),
    });

  }
);


// =====================================
// Server
// =====================================

app.listen(
  PORT,
  "0.0.0.0",
  () => {

    console.log(
      `PakShop backend running on port ${PORT}`
    );

  }
);