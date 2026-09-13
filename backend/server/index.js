import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./db.js";

import productRoutes from "../routes/productRoutes.js";
import customerRoutes from "../routes/customerRoutes.js";
import orderRoutes from "../routes/orderRoutes.js";
import inventoryRoutes from "../routes/inventoryRoutes.js";
import analyticsRoutes from "../routes/analyticsRoutes.js";
dotenv.config();


const app = express();

const PORT = process.env.PORT || 5000;


connectDB();


app.use(cors());

app.use(express.json());


// Product APIs  {API SECTIONNN}
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

app.get("/", (req, res) => {

  res.json({
    message: "PakShop API is running",
  });

});



app.listen(PORT, () => {

  console.log(
    `PakShop backend running on port ${PORT}`
  );

});