const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');
const User = require('./user');
const Product = require('./product');

const Order = sequelize.define('Order', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  totalAmount: { type: DataTypes.FLOAT, allowNull: false },
  status: { type: DataTypes.STRING, allowNull: false, defaultValue: 'pending' }, // pending, paid, shipped, delivered
  paymentMethod: { type: DataTypes.STRING },
  paymentStatus: { type: DataTypes.STRING, defaultValue: 'pending' }, // pending, completed, failed
}, {
  timestamps: true,
});

const OrderItem = sequelize.define('OrderItem', {
  quantity: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
  price: { type: DataTypes.FLOAT, allowNull: false },
  customization: { type: DataTypes.STRING },
  size: { type: DataTypes.STRING },
}, {
  timestamps: false,
});

User.hasMany(Order, { foreignKey: 'userId', onDelete: 'CASCADE' });
Order.belongsTo(User, { foreignKey: 'userId' });

Order.belongsToMany(Product, { through: OrderItem });
Product.belongsToMany(Order, { through: OrderItem });

module.exports = { Order, OrderItem };