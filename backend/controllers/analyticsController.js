import Order from "../models/Order.js";
import Customer from "../models/Customer.js";
import Inventory from "../models/Inventory.js";
import SupportTicket from "../models/SupportTicket.js";
import ReturnRequest from "../models/ReturnRequest.js";


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
// /api/v1/analytics/revenue-period?days=30
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
// Calculated dynamically from real orders
// =====================================
export const getTopCustomers = async (req, res) => {

  try {

    const customers =
      await Order.aggregate([

        // Latest order first so the most recent
        // customer profile is used for demo customers.
        {
          $sort: {
            date: -1,
          },
        },


        // Group all orders by customer.
        {
          $group: {

            _id:
              "$customerId",


            totalSpent: {
              $sum:
                "$totalAmount",
            },


            totalOrders: {
              $sum: 1,
            },


            orderCustomerName: {
              $first:
                "$customer.fullName",
            },


            orderCustomerEmail: {
              $first:
                "$customer.email",
            },


            orderCustomerCity: {
              $first:
                "$delivery.city",
            },

          },
        },


        // Match seeded customer information
        // when the customer exists in customers.
        {
          $lookup: {

            from:
              "customers",

            localField:
              "_id",

            foreignField:
              "id",

            as:
              "customer",

          },
        },


        {
          $unwind: {

            path:
              "$customer",

            preserveNullAndEmptyArrays:
              true,

          },
        },


        // Return the same shape expected
        // by the existing admin UI.
        {
          $project: {

            _id: 0,


            id:
              "$_id",


            name: {

              $ifNull: [

                "$customer.name",

                {
                  $ifNull: [
                    "$orderCustomerName",
                    "$_id",
                  ],
                },

              ],

            },


            email: {

              $ifNull: [

                "$customer.email",

                {
                  $ifNull: [
                    "$orderCustomerEmail",
                    "",
                  ],
                },

              ],

            },


            city: {

              $ifNull: [

                "$customer.city",

                {
                  $ifNull: [
                    "$orderCustomerCity",
                    "",
                  ],
                },

              ],

            },


            totalOrders: 1,

            totalSpent: 1,

          },
        },


        // Highest real spending first.
        {
          $sort: {
            totalSpent: -1,
          },
        },


        {
          $limit: 5,
        },

      ]);


    res.json(
      customers
    );


  } catch (error) {

    res.status(500).json({
      message:
        error.message,
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




// =====================================
// Business Overview
// Combined executive summary for Admin AI
// =====================================
export const getBusinessOverview = async (req, res) => {

  try {

    const [
      revenueResult,
      topCustomers,
      trendingProducts,
      lowStockItems,
    ] = await Promise.all([


      Order.aggregate([

        {
          $group: {

            _id: null,

            totalRevenue: {
              $sum: "$totalAmount",
            },

            totalOrders: {
              $sum: 1,
            },

            averageOrderValue: {
              $avg: "$totalAmount",
            },

          },

        },

      ]),



      Customer.find()

        .sort({
          totalSpent: -1,
        })

        .limit(5),



      Order.aggregate([

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
          $limit: 5,
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
          $unwind: {
            path: "$product",
            preserveNullAndEmptyArrays: true,
          },
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

      ]),



      Inventory.aggregate([

        {
          $match: {

            $expr: {

              $lt: [
                "$stock",
                "$lowStockThreshold",
              ],

            },

          },

        },

        {
          $lookup: {

            from: "products",

            localField: "productId",

            foreignField: "id",

            as: "product",

          },

        },

        {
          $unwind: {

            path: "$product",

            preserveNullAndEmptyArrays: true,

          },

        },

        {
          $project: {

            _id: 0,

            productId: 1,

            stock: 1,

            reserved: 1,

            lowStockThreshold: 1,

            warehouse: 1,

            name: "$product.name",

            category: "$product.category",

            image: "$product.image",

          },

        },

      ]),

    ]);


    const revenue =
      revenueResult[0] || {
        totalRevenue: 0,
        totalOrders: 0,
        averageOrderValue: 0,
      };


    res.json({

      revenue: {
        totalRevenue:
          revenue.totalRevenue || 0,

        totalOrders:
          revenue.totalOrders || 0,

        averageOrderValue:
          Math.round(
            revenue.averageOrderValue || 0
          ),
      },


      topCustomer:
        topCustomers?.[0] || null,


      topCustomers,


      topProduct:
        trendingProducts?.[0] || null,


      trendingProducts,


      inventoryRisks:
        lowStockItems,


      inventoryRiskCount:
        lowStockItems.length,


      generatedAt:
        new Date().toISOString(),

    });


  } catch (error) {

    res.status(500).json({

      message: error.message,

    });

  }

};

// =====================================
// Customer Support Overview
// Support tickets + return requests
// =====================================
export const getSupportOverview = async (req, res) => {

  try {

    const [
      totalTickets,
      openTickets,
      totalReturns,
      requestedReturns,
      recentTickets,
      recentReturns,
    ] = await Promise.all([

      SupportTicket.countDocuments(),

      SupportTicket.countDocuments({
        status: "Open",
      }),

      ReturnRequest.countDocuments(),

      ReturnRequest.countDocuments({
        status: "Requested",
      }),

      SupportTicket.find()
        .sort({
          createdAt: -1,
        })
        .limit(5),

      ReturnRequest.find()
        .sort({
          createdAt: -1,
        })
        .limit(5),

    ]);


    res.json({

      tickets: {

        total:
          totalTickets,

        open:
          openTickets,

        resolved:
          Math.max(
            totalTickets -
              openTickets,
            0
          ),

      },


      returns: {

        total:
          totalReturns,

        requested:
          requestedReturns,

        processed:
          Math.max(
            totalReturns -
              requestedReturns,
            0
          ),

      },


      attentionRequired:
        openTickets +
        requestedReturns,


      recentTickets:


        recentTickets.map(
          (ticket) => ({

            ticketId:
              ticket.ticketId,

            customerId:
              ticket.customerId,

            orderNumber:
              ticket.orderNumber,

            issue:
              ticket.issue,

            priority:
              ticket.priority,

            status:
              ticket.status,

            createdAt:
              ticket.createdAt,

          })
        ),


      recentReturns:

        recentReturns.map(
          (returnRequest) => ({

            returnId:
              returnRequest.returnId,

            customerId:
              returnRequest.customerId,

            orderNumber:
              returnRequest.orderNumber,

            reason:
              returnRequest.reason,

            status:
              returnRequest.status,

            createdAt:
              returnRequest.createdAt,

          })
        ),


      generatedAt:
        new Date().toISOString(),

    });


  } catch (error) {

    res.status(500).json({
      message:
        error.message,
    });

  }

};

// =====================================
// Dashboard Summary
// Real KPI data for admin dashboard
// =====================================
export const getDashboardSummary = async (req, res) => {

  try {

    const now =
      new Date();


    const last30DaysStart =
      new Date(now);

    last30DaysStart.setDate(
      last30DaysStart.getDate() - 30
    );


    const previous30DaysStart =
      new Date(now);

    previous30DaysStart.setDate(
      previous30DaysStart.getDate() - 60
    );


    const [
      totalRevenueResult,
      totalOrders,
      last30DaysRevenueResult,
      last30DaysOrders,
      previous30DaysRevenueResult,
      previous30DaysOrders,
      uniqueCustomers,
      inventoryAlerts,
    ] = await Promise.all([

      Order.aggregate([
        {
          $group: {
            _id: null,

            totalRevenue: {
              $sum:
                "$totalAmount",
            },
          },
        },
      ]),


      Order.countDocuments(),


      Order.aggregate([
        {
          $match: {
            date: {
              $gte:
                last30DaysStart,
              $lte:
                now,
            },
          },
        },

        {
          $group: {
            _id: null,

            totalRevenue: {
              $sum:
                "$totalAmount",
            },
          },
        },
      ]),


      Order.countDocuments({
        date: {
          $gte:
            last30DaysStart,
          $lte:
            now,
        },
      }),


      Order.aggregate([
        {
          $match: {
            date: {
              $gte:
                previous30DaysStart,
              $lt:
                last30DaysStart,
            },
          },
        },

        {
          $group: {
            _id: null,

            totalRevenue: {
              $sum:
                "$totalAmount",
            },
          },
        },
      ]),


      Order.countDocuments({
        date: {
          $gte:
            previous30DaysStart,
          $lt:
            last30DaysStart,
        },
      }),


      Order.distinct(
        "customerId"
      ),


      Inventory.countDocuments({
        $expr: {
          $lte: [
            "$stock",
            "$lowStockThreshold",
          ],
        },
      }),

    ]);


    const totalRevenue =
      totalRevenueResult[0]
        ?.totalRevenue || 0;


    const last30DaysRevenue =
      last30DaysRevenueResult[0]
        ?.totalRevenue || 0;


    const previous30DaysRevenue =
      previous30DaysRevenueResult[0]
        ?.totalRevenue || 0;


    const calculateChange = (
      current,
      previous
    ) => {

      if (
        previous === 0
      ) {

        return current > 0
          ? 100
          : 0;

      }


      return (
        (
          (current - previous) /
          previous
        ) * 100
      );

    };


    const revenueChange =
      calculateChange(
        last30DaysRevenue,
        previous30DaysRevenue
      );


    const orderChange =
      calculateChange(
        last30DaysOrders,
        previous30DaysOrders
      );


    res.json({

      revenue: {

        total:
          totalRevenue,

        last30Days:
          last30DaysRevenue,

        previous30Days:
          previous30DaysRevenue,

        changePercent:
          Number(
            revenueChange.toFixed(1)
          ),

      },


      orders: {

        total:
          totalOrders,

        last30Days:
          last30DaysOrders,

        previous30Days:
          previous30DaysOrders,

        changePercent:
          Number(
            orderChange.toFixed(1)
          ),

      },


      customers: {

        unique:
          uniqueCustomers.length,

      },


      inventory: {

        alerts:
          inventoryAlerts,

      },


      generatedAt:
        new Date().toISOString(),

    });


  } catch (error) {

    res.status(500).json({
      message:
        error.message,
    });

  }

};