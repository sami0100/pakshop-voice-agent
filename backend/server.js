import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

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
const PORT = process.env.PORT || 5000;

const allowedOrigins = new Set([
  "https://pakshop-voice-agent.vercel.app",
  "http://localhost:5173",
  "http://127.0.0.1:5173",
]);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.has(origin)) {
        return callback(null, true);
      }

      return callback(new Error(`CORS blocked origin: ${origin}`));
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());

// Ensure every API request has a usable MongoDB connection.
// The cached connection promise makes this safe for Vercel serverless invocations.
app.use("/api/v1", async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);

    res.status(503).json({
      success: false,
      message: "Database connection unavailable.",
    });
  }
});

app.use("/api/v1/products", productRoutes);
app.use("/api/v1/customers", customerRoutes);
app.use("/api/v1/orders", orderRoutes);
app.use("/api/v1/inventory", inventoryRoutes);
app.use("/api/v1/analytics", analyticsRoutes);
app.use("/api/v1/support", supportRoutes);
app.use("/api/v1/returns", returnRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "PakShop API is running",
  });
});

app.get("/api/v1/health", (req, res) => {
  res.json({
    success: true,
    service: "PakShop Backend",
    status: "healthy",
    database:
      mongoose.connection.readyState === 1
        ? "connected"
        : "connecting",
    timestamp: new Date().toISOString(),
  });
});

app.use((error, req, res, next) => {
  if (error?.message?.startsWith("CORS blocked origin:")) {
    return res.status(403).json({
      success: false,
      message: error.message,
    });
  }

  console.error("Unhandled backend error:", error);

  res.status(500).json({
    success: false,
    message: "Internal server error.",
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`PakShop backend running on port ${PORT}`);
});
