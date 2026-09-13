import Inventory from "../models/Inventory.js";


// =====================================
// Get All Inventory
// =====================================
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




// =====================================
// Low Stock Items
// =====================================
export const getLowStockItems = async (req, res) => {

  try {


    const items = await Inventory.aggregate([


      {
        $match: {

          $expr: {

            $lt: [

              "$stock",

              "$lowStockThreshold"

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


    ]);



    res.json(items);



  } catch (error) {


    res.status(500).json({

      message: error.message,

    });


  }

};