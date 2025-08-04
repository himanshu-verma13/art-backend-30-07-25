// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');

// const { sequelize } = require('./db');

// const authRoutes = require('./routes/auth');
// const productRoutes = require('./routes/products');
// const feedbackRoutes = require('./routes/feedback');
// const cartRoutes = require('./routes/cart');
// const orderRoutes = require('./routes/orders');

// const User = require('./models/user');
// const Product = require('./models/product');
// const Feedback = require('./models/feedback');
// const CartItem = require('./models/cart');
// const { Order, OrderItem } = require('./models/order');

// // Make sure associations are initialized by requiring models (already done in model files)

// // Sync DB and start server
// const app = express();

// app.use(cors());
// app.use(express.json()); // for parsing application/json

// // Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/products', productRoutes);
// app.use('/api/feedback', feedbackRoutes);
// app.use('/api/cart', cartRoutes);
// app.use('/api/orders', orderRoutes);

// app.get('/', (req, res) => {
//   res.send('Art Ecommerce Backend is running.');
// });

// const PORT = process.env.PORT || 5000;

// sequelize.sync({ alter: true }).then(() => {
//   console.log('Database synced');
//   app.listen(PORT, () => {
//     console.log(`Server started on port ${PORT}`);
//   });
// }).catch(err => {
//   console.error('Unable to connect to DB:', err);
// });

// -----------------------------------------------------------------
// app.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const { sequelize } = require('./db');

const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const feedbackRoutes = require('./routes/feedback');
const cartRoutes = require('./routes/cart');
const orderRoutes = require('./routes/orders');
const contactRoutes = require('./routes/contact');

const User = require('./models/user');
const Product = require('./models/product');
const TopProduct = require('./models/topProduct');
const Feedback = require('./models/feedback');
const CartItem = require('./models/cart');
const { Order, OrderItem } = require('./models/order');

const app = express();

app.use(cors());
app.use(express.json()); // for parsing application/json

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/contact', contactRoutes);

app.get('/', (req, res) => {
  res.send('Art Ecommerce Backend is running.');
});

const PORT = process.env.PORT || 11860;

sequelize.sync({ alter: true }).then(() => {
  console.log('Database synced');
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
}).catch(err => {
  console.error('Unable to connect to DB:', err);
});