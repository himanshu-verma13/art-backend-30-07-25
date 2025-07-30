// models/Contact.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');
const Contact = sequelize.define('Contact', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
  },
  subject: {
    type: DataTypes.STRING,
  },
  message: {
    type: DataTypes.TEXT,
  },
  inquiryType: {
    type: DataTypes.STRING,
  },
}, {
  timestamps: true,
});

module.exports = Contact;