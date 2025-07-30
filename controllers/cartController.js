const CartItem = require('../models/cart');
const Product = require('../models/product');

exports.getCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const cartItems = await CartItem.findAll({
      where: { UserId: userId },
      include: [{ model: Product }],
    });

    const items = cartItems.map(ci => ({
      id: ci.Product.id,
      name: ci.Product.name,
      price: ci.price || ci.Product.price,
      quantity: ci.quantity,
      image: ci.Product.image,
      customization: ci.customization,
      size: ci.size,
    }));

    const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

    res.json({ items, total, itemCount });
  } catch(err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching cart' });
  }
};

exports.addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id: productId, quantity, customization, size, price } = req.body;

    if(!productId || !quantity || quantity < 1) {
      return res.status(400).json({ message: 'Product id and valid quantity required' });
    }

    const product = await Product.findByPk(productId);
    if(!product) return res.status(404).json({ message: 'Product not found' });

    let cartItem = await CartItem.findOne({
      where: {
        UserId: userId,
        ProductId: productId,
        customization: customization || null,
        size: size || null,
      }
    });

    if(cartItem) {
      cartItem.quantity += quantity;
      if(price) cartItem.price = price;
      await cartItem.save();
    } else {
      cartItem = await CartItem.create({
        UserId: userId,
        ProductId: productId,
        quantity,
        customization,
        size,
        price: price || product.price
      });
    }

    res.status(201).json({ message: 'Item added/updated to cart' });
  } catch(err) {
    console.error(err);
    res.status(500).json({ message: 'Error adding item to cart' });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id: productId, customization, size } = req.body;

    if(!productId) return res.status(400).json({ message: 'Product id required' });

    const deleteCount = await CartItem.destroy({
      where: {
        UserId: userId,
        ProductId: productId,
        customization: customization || null,
        size: size || null,
      }
    });

    if(deleteCount === 0) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    res.json({ message: 'Item removed from cart' });
  } catch(err) {
    console.error(err);
    res.status(500).json({ message: 'Error removing item from cart' });
  }
};