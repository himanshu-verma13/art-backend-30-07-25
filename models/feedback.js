const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');
const User = require('./user');
const Product = require('./product');

const Feedback = sequelize.define('Feedback', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  rating: { type: DataTypes.INTEGER, allowNull: false, validate: { min: 1, max: 5 } },
  comment: { type: DataTypes.TEXT, allowNull: true },
}, {
  timestamps: true,
});

User.hasMany(Feedback, { foreignKey: 'userId', onDelete: 'CASCADE' });
Feedback.belongsTo(User, { foreignKey: 'userId' });

Product.hasMany(Feedback, { foreignKey: 'productId', onDelete: 'CASCADE' });
Feedback.belongsTo(Product, { foreignKey: 'productId' });

module.exports = Feedback;