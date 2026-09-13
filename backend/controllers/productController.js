import Product from "../models/Product.js";


export const getProducts = async (req, res) => {
  try {

    const products = await Product.find();

    res.json(products);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};



export const getProductById = async (req, res) => {

  try {

    const product = await Product.findOne({
      id: req.params.id,
    });


    if (!product) {

      return res.status(404).json({
        message: "Product not found",
      });

    }


    res.json(product);


  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};



export const searchProducts = async (req, res) => {

  try {

    const query = req.query.q;


    const products = await Product.find({
      $or: [
        {
          name: {
            $regex: query,
            $options: "i",
          },
        },
        {
          category: {
            $regex: query,
            $options: "i",
          },
        },
        {
          tags: {
            $regex: query,
            $options: "i",
          },
        },
      ],
    });


    res.json(products);


  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};