import SupportTicket from "../models/SupportTicket.js";



export const createSupportTicket = async (req, res) => {

  try {

    const ticket = new SupportTicket({

      ticketId:
        req.body.ticketId,


      customerId:
        req.body.customerId,


      orderNumber:
        req.body.orderNumber,


      issue:
        req.body.issue,


      priority:
        req.body.priority || "Medium",


      status:
        req.body.status || "Open",

    });



    const savedTicket =
      await ticket.save();



    res.status(201).json(savedTicket);



  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};





export const getCustomerTickets = async (req, res) => {

  try {

    const tickets =
      await SupportTicket.find({
        customerId:
          req.params.customerId,
      }).sort({
        createdAt: -1,
      });



    res.json(tickets);



  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};





export const getTicketById = async (req, res) => {

  try {

    const ticket =
      await SupportTicket.findOne({
        ticketId:
          req.params.ticketId,
      });



    if (!ticket) {

      return res.status(404).json({
        message:
          "Support ticket not found",
      });

    }



    res.json(ticket);



  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};