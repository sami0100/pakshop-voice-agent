import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
    },

    name: {
      type: String,
      required: true,
    },

    brand: String,

    category: String,

    subCategory: String,

    collection: String,

    image: String,

    gallery: [String],

    price: Number,

    originalPrice: Number,

    discount: Number,

    stock: Number,

    sold: Number,

    rating: Number,

    reviews: Number,

    badge: String,

    sizes: [String],

    colors: [String],

    specifications: Object,

    description: String,

    tags: [String],
  },
  {
    timestamps: true,
  }
);


const Product = mongoose.model(
  "Product",
  productSchema
);


export default Product;