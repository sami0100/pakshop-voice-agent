import Customer from "../models/Customer.js";


export const getCustomerById = async (req, res) => {

  try {

    const customer = await Customer.findOne({
      id: req.params.id,
    });


    if (!customer) {

      return res.status(404).json({
        message: "Customer not found",
      });

    }


    res.json(customer);


  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};



export const getCustomers = async (req, res) => {

  try {

    const customers = await Customer.find();

    res.json(customers);


  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};