import ReturnRequest from "../models/ReturnRequest.js";



export const createReturnRequest = async (req, res) => {

  try {

    const returnRequest =
      new ReturnRequest({

        returnId:
          req.body.returnId,


        customerId:
          req.body.customerId,


        orderNumber:
          req.body.orderNumber,


        reason:
          req.body.reason,


        status:
          req.body.status || "Requested",


        notes:
          req.body.notes,

      });



    const savedReturn =
      await returnRequest.save();



    res.status(201).json(savedReturn);



  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};





export const getCustomerReturns = async (req, res) => {

  try {

    const returns =
      await ReturnRequest.find({
        customerId:
          req.params.customerId,
      });



    res.json(returns);



  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};





export const getReturnById = async (req, res) => {

  try {

    const returnRequest =
      await ReturnRequest.findOne({
        returnId:
          req.params.returnId,
      });



    if (!returnRequest) {

      return res.status(404).json({
        message:
          "Return request not found",
      });

    }



    res.json(returnRequest);



  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};