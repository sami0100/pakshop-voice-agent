import Order from "../models/Order.js";
import Customer from "../models/Customer.js";


// =====================================
// Total Revenue
// =====================================
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




// =====================================
// Revenue by Date Range
// Example:
// /api/v1/analytics/revenue?days=30
// =====================================
export const getRevenueByPeriod = async (req, res) => {

  try {

    const days = Number(req.query.days) || 30;


    const startDate = new Date();

    startDate.setDate(
      startDate.getDate() - days
    );


    const result = await Order.aggregate([

      {
        $match: {

          date: {
            $gte: startDate,
          },

        },

      },


      {
        $group: {

          _id: null,

          revenue: {
            $sum: "$totalAmount",
          },

          orders: {
            $sum: 1,
          },

        },

      },

    ]);



    res.json({

      period: `${days} days`,

      revenue:
        result[0]?.revenue || 0,

      orders:
        result[0]?.orders || 0,

    });


  } catch (error) {

    res.status(500).json({

      message: error.message,

    });

  }

};




// =====================================
// Top Customers
// =====================================
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




// =====================================
// Trending Products
// =====================================
export const getTrendingProducts = async (req, res) => {

  try {


    const products = await Order.aggregate([


      {
        $unwind: "$items",
      },



      {
        $group: {


          _id: "$items.productId",



          unitsSold: {

            $sum: "$items.quantity",

          },



          revenue: {

            $sum: {

              $multiply: [

                "$items.quantity",

                "$items.price",

              ],

            },

          },


        },

      },



      {
        $sort: {

          unitsSold: -1,

        },

      },



      {
        $limit: 10,

      },



      {
        $lookup: {

          from: "products",

          localField: "_id",

          foreignField: "id",

          as: "product",

        },

      },



      {
        $unwind: "$product",
      },



      {
        $project: {

          _id: 0,

          productId: "$_id",

          name: "$product.name",

          category: "$product.category",

          image: "$product.image",

          unitsSold: 1,

          revenue: 1,

        },

      },


    ]);



    res.json(products);



  } catch (error) {


    res.status(500).json({

      message: error.message,

    });


  }

};




// =====================================
// Sales Trend
// Daily revenue trend
// =====================================
export const getSalesTrend = async (req, res) => {

  try {


    const trend = await Order.aggregate([


      {

        $group: {


          _id: {


            $dateToString: {


              format: "%Y-%m-%d",


              date: "$date",


            },


          },


          revenue: {


            $sum: "$totalAmount",


          },


          orders: {


            $sum: 1,


          },


        },


      },



      {

        $sort: {


          _id: 1,


        },


      },


    ]);



    res.json(trend);



  } catch (error) {


    res.status(500).json({

      message: error.message,

    });


  }

};