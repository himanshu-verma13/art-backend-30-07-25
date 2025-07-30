const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');
const User = require('./user');
const Product = require('./product');

const CartItem = sequelize.define('CartItem', {
  quantity: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
  customization: { type: DataTypes.STRING },
  size: { type: DataTypes.STRING },
  price: { type: DataTypes.FLOAT },
}, {
  timestamps: true,
});

User.hasMany(CartItem, { foreignKey: 'UserId', onDelete: 'CASCADE' });
CartItem.belongsTo(User, { foreignKey: 'UserId' });

Product.hasMany(CartItem, { foreignKey: 'ProductId', onDelete: 'CASCADE' });
CartItem.belongsTo(Product, { foreignKey: 'ProductId' });

module.exports = CartItem;