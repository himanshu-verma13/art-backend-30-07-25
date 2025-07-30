const { Order, OrderItem } = require('../models/order');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      where: { userId: req.user.id },
      include: [{ model: OrderItem, include: ['Product'] }],
      order: [['createdAt', 'DESC']],
    });
    res.json(orders);
  } catch(err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching orders' });
  }
};

exports.createOrder = async (req, res) => {
  /*
    Expected body:
    {
      paymentMethod: "stripe",
      items: [{ id, name, price, quantity, customization, size, image }]
    }
  */
  try {
    const userId = req.user.id;
    const { paymentMethod, items } = req.body;

    if(!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'Items array is required' });
    }

    const totalAmount = items.reduce((acc, i) => acc + i.price * i.quantity, 0);

    const order = await Order.create({
      userId,
      totalAmount,
      status: 'pending',
      paymentMethod,
      paymentStatus: 'pending',
    });

    await Promise.all(items.map(i => OrderItem.create({
      OrderId: order.id,
      ProductId: i.id,
      quantity: i.quantity,
      price: i.price,
      customization: i.customization,
      size: i.size,
    })));

    if(paymentMethod === 'stripe') {
      const line_items = items.map(i => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: i.name,
            description: i.customization || '',
            images: [i.image || ''],
          },
          unit_amount: Math.round(i.price * 100),
        },
        quantity: i.quantity,
      }));

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        line_items,
        success_url: `${req.headers.origin}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/payment-cancel`,
        metadata: {
          order_id: order.id.toString(),
          user_id: userId.toString(),
        },
      });

      return res.json({ checkoutUrl: session.url });
    } else {
      return res.status(400).json({ message: 'Unsupported payment method' });
    }
  } catch(err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating order' });
  }
};

// Stripe webhook handler - expects raw body parse in route
exports.handleStripeWebhook = async (req, res) => {
  const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.log(`Webhook signature verification failed.`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if(event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const orderId = session.metadata.order_id;
    if(orderId){
      try {
        const order = await Order.findByPk(orderId);
        if(order){
          order.paymentStatus = 'completed';
          order.status = 'paid';
          await order.save();
        }
      } catch(err) {
        console.error('Error updating order after payment', err);
      }
    }
  }

  res.json({ received: true });
};