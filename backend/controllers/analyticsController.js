import Order from "../models/Order.js";
import Customer from "../models/Customer.js";


export const getRevenue = async (req, res) => {

  try {

    const result = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: {
            $sum: "$totalAmount",
          },
          totalOrders: {
            $sum: 1,
          },
        },
      },
    ]);


    res.json(
      result[0] || {
        totalRevenue: 0,
        totalOrders: 0,
      }
    );


  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};



export const getTopCustomers = async (req, res) => {

  try {

    const customers = await Customer.find()
      .sort({
        totalSpent: -1,
      })
      .limit(5);


    res.json(customers);


  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};