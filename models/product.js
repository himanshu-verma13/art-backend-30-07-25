// models/Product.js
const { DataTypes } = require("sequelize");
const { sequelize } = require("../db");

const Product = sequelize.define(
  "Product",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: true },
    price: { type: DataTypes.FLOAT, allowNull: false },
    originalPrice: { type: DataTypes.FLOAT, allowNull: true },
    images: { type: DataTypes.JSON, allowNull: true }, // Array of image URLs
    rating: { type: DataTypes.FLOAT, allowNull: false },
    reviews: { type: DataTypes.INTEGER, allowNull: false },
    category: { type: DataTypes.STRING, allowNull: true },
    isCustomizable: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    features: { type: DataTypes.JSON, allowNull: true }, // Array of features
    defaultOptions: { type: DataTypes.JSON, allowNull: true }, // Array of default option objects
    sizes: { type: DataTypes.JSON, allowNull: true }, // Array of size objects
  },
  {
    tableName: "products",
    timestamps: true,
  }
);

module.exports = Product;
