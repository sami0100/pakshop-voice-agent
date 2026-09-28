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

    const order = new Order({

      id:
        req.body.orderNumber,


      orderNumber:
        req.body.orderNumber,


      customerId:
        req.body.customerId,


      customer:
        req.body.customer,


      date:
        req.body.placedAt
          ? new Date(req.body.placedAt)
          : new Date(),


      status:
        req.body.status || "Processing",


      trackingStatus:
        req.body.trackingStatus,


      trackingHistory:
        req.body.trackingHistory || [],


      delivery:
        req.body.delivery,


      items:
        req.body.items.map((item) => ({

          productId:
            String(item.id),

          quantity:
            item.quantity,

          price:
            item.price,

        })),


      totalAmount:
        req.body.total,


      paymentMethod:
        req.body.paymentMethod,

    });



    const savedOrder =
      await order.save();



    res.status(201).json(savedOrder);



  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};