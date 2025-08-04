const Product = require("../models/product");
const TopProduct = require("../models/topProduct")

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json({ products });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching products" });
  }
};

exports.getTopProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json({ products });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching products" });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching product" });
  }
};


// to upload single prd
// exports.createProduct = async (req, res) => {
//   try {
//     const {
//       name,
//       description,
//       price,
//       originalPrice,
//       images,
//       rating,
//       reviews,
//       category,
//       isCustomizable,
//       features,
//       defaultOptions,
//       sizes,
//       customizationOptions,
//     } = req.body;
//     if (!name || !price)
//       return res.status(400).json({ message: "Name and price are required" });

//     const newProduct = await Product.create({
//       name,
//       description,
//       price,
//       originalPrice,
//       images,
//       rating,
//       reviews,
//       category,
//       isCustomizable,
//       features,
//       defaultOptions,
//       sizes,
//       customizationOptions: customizationOptions || [],
//     });

//     res.status(201).json({ product: newProduct });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Error creating product" });
//   }
// };



// ------------------------------------------------------------
// to upload mulit proudct at onces
exports.createProduct = async (req, res) => {

  try {
    const products = req.body; // Expecting an array of product objects

    if (!Array.isArray(products) || products.length === 0) {
      return res
        .status(400)
        .json({
          message: "Request body must be a non-empty array of products",
        });
    }

    const createdProducts = [];

    for (const productData of products) {
      const {
        name,
        description,
        price,
        originalPrice,
        images,
        rating,
        reviews,
        category,
        isCustomizable,
        features,
        defaultOptions,
        sizes,
        customizationOptions,
      } = productData;

      if (!name || !price) {
        // Optionally, skip invalid products or handle as needed
        return res
          .status(400)
          .json({ message: "Each product must have a name and price" });
      }

      const newProduct = await Product.create({
        name,
        description,
        price,
        originalPrice,
        images,
        rating,
        reviews,
        category,
        isCustomizable,
        features,
        defaultOptions,
        sizes,
        customizationOptions: customizationOptions || [],
      });

      createdProducts.push(newProduct);
    }

    res.status(201).json({ products: createdProducts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating products" });
  }
};
exports.createTopProduct = async (req, res) => {

  try {
    const TopProducts = req.body; // Expecting an array of product objects

    if (!Array.isArray(TopProducts) || TopProducts.length === 0) {
      return res
        .status(400)
        .json({
          message: "Request body must be a non-empty array of products",
        });
    }

    const createdProducts = [];

    for (const productData of TopProduct) {
      const {
        name,
        description,
        price,
        originalPrice,
        images,
        rating,
        reviews,
        category,
        isCustomizable,
        features,
        defaultOptions,
        sizes,
        customizationOptions,
      } = productData;

      if (!name || !price) {
        // Optionally, skip invalid products or handle as needed
        return res
          .status(400)
          .json({ message: "Each product must have a name and price" });
      }

      const newProduct = await TopProduct.create({
        name,
        description,
        price,
        originalPrice,
        images,
        rating,
        reviews,
        category,
        isCustomizable,
        features,
        defaultOptions,
        sizes,
        customizationOptions: customizationOptions || [],
      });

      createdProducts.push(newProduct);
    }

    res.status(201).json({ products: createdProducts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating products" });
  }
};