import dotenv from "dotenv";
import mongoose from "mongoose";

import connectDB from "../server/db.js";

import Product from "../models/Product.js";
import Customer from "../models/Customer.js";
import Order from "../models/Order.js";
import Inventory from "../models/Inventory.js";


import { products } from "../data/products.js";
import { customers } from "../data/customers.js";
import { orders } from "../data/orders.js";
import { inventory } from "../data/inventory.js";


dotenv.config();


const seedDatabase = async () => {

  try {

    await connectDB();


    await Product.deleteMany();
    await Customer.deleteMany();
    await Order.deleteMany();
    await Inventory.deleteMany();


    await Product.insertMany(products);

    await Customer.insertMany(customers);

    await Order.insertMany(orders);

    await Inventory.insertMany(inventory);


    console.log("Database seeded successfully");


    await mongoose.connection.close();


  } catch (error) {

    console.error(
      "Seeding failed:",
      error.message
    );

    process.exit(1);
  }
};


seedDatabase();