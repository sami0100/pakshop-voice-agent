import Inventory from "../models/Inventory.js";


export const getInventory = async (req, res) => {

  try {

    const inventory = await Inventory.find();

    res.json(inventory);


  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};



export const getLowStockItems = async (req, res) => {

  try {

    const items = await Inventory.find({
      $expr: {
        $lt: [
          "$stock",
          "$lowStockThreshold"
        ],
      },
    });


    res.json(items);


  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};