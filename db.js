// const { Sequelize } = require('sequelize');
// require('dotenv').config();

// const sequelize = new Sequelize(process.env.DATABASE_URL, {
//   dialect: 'postgres',
//   logging: false,
//   dialectOptions: {
//     ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
//   },
// });

// const testConnection = async () => {
//   try {
//     await sequelize.authenticate();
//     console.log('PostgreSQL DB connection established');
//   } catch (error) {
//     console.error('Unable to connect to database:', error);
//   }
// };

// testConnection();

// module.exports = {
//   sequelize,
// };
// -------------------------------------------------

// db.js
require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'mysql', // Change dialect to mysql
  logging: false,
  dialectOptions: {
    // For local dev, you might not need ssl
    // For production, configure SSL as needed
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  },
});

// Test connection
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('MySQL DB connection established');
  } catch (error) {
    console.error('Unable to connect to database:', error);
  }
};

testConnection();

module.exports = {
  sequelize,
};