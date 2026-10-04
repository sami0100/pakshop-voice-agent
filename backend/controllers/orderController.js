import Order from "../models/Order.js";



export const getOrders = async (req, res) => {

  try {

    const orders = await Order.find();

    res.json(orders);


  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};





export const getOrderById = async (req, res) => {

  try {

    const order = await Order.findOne({
      id: req.params.id,
    });


    if (!order) {

      return res.status(404).json({
        message: "Order not found",
      });

    }


    res.json(order);


  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};





export const getCustomerOrders = async (req, res) => {

  try {

    const orders = await Order.find({
      customerId: req.params.customerId,
    });


    res.json(orders);


  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};





export const createOrder = async (req, res) => {

  try {

    const {
      orderNumber,
      customerId,
      customer,
      placedAt,
      status,
      trackingStatus,
      trackingHistory,
      delivery,
      items,
      total,
      paymentMethod,
    } = req.body || {};


    if (!orderNumber) {
      return res.status(400).json({
        message: "orderNumber is required.",
      });
    }


    if (!customerId) {
      return res.status(400).json({
        message: "customerId is required.",
      });
    }


    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        message: "Order items are required.",
      });
    }


    if (!Number.isFinite(Number(total))) {
      return res.status(400).json({
        message: "A valid order total is required.",
      });
    }


    const order = new Order({

      id:
        orderNumber,


      orderNumber,


      customerId,


      customer,


      date:
        placedAt
          ? new Date(placedAt)
          : new Date(),


      status:
        status || "Processing",


      trackingStatus,


      trackingHistory:
        Array.isArray(trackingHistory)
          ? trackingHistory
          : [],


      delivery,


      items:
        items.map((item) => ({

          productId:
            String(item.id ?? item.productId ?? ""),

          quantity:
            Number(item.quantity),

          price:
            Number(item.price),

        })),


      totalAmount:
        Number(total),


      paymentMethod,

    });


    const invalidItem =
      order.items.find(
        (item) =>
          !item.productId ||
          !Number.isFinite(item.quantity) ||
          item.quantity <= 0 ||
          !Number.isFinite(item.price)
      );


    if (invalidItem) {
      return res.status(400).json({
        message: "One or more order items are invalid.",
      });
    }


    const savedOrder =
      await order.save();


    res.status(201).json(savedOrder);


  } catch (error) {

    console.error(
      "createOrder error:",
      error
    );


    if (error?.code === 11000) {
      return res.status(409).json({
        message:
          "An order with this order number already exists.",
      });
    }


    res.status(500).json({
      message: error.message,
    });

  }

};
