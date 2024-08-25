const fs = require('fs');
const path = './src/data/carts.json';

const createCart = (req, res) => {
  const carts = JSON.parse(fs.readFileSync(path));
  const newCart = {
    id: carts.length ? carts[carts.length - 1].id + 1 : 1,
    products: []
  };
  carts.push(newCart);
  fs.writeFileSync(path, JSON.stringify(carts));
  res.status(201).json(newCart);
};

const getCartById = (req, res) => {
  const carts = JSON.parse(fs.readFileSync(path));
  const cart = carts.find(c => c.id === req.params.cid);
  if (cart) {
    res.json(cart);
  } else {
    res.status(404).send('Cart not found');
  }
};

const addProductToCart = (req, res) => {
  const carts = JSON.parse(fs.readFileSync(path));
  const cart = carts.find(c => c.id === req.params.cid);
  if (cart) {
    const productIndex = cart.products.findIndex(p => p.product === req.params.pid);
    if (productIndex !== -1) {
      cart.products[productIndex].quantity += 1;
    } else {
      cart.products.push({ product: req.params.pid, quantity: 1 });
    }
    fs.writeFileSync(path, JSON.stringify(carts));
    res.json(cart);
  } else {
    res.status(404).send('Cart not found');
  }
};

module.exports = {
  createCart,
  getCartById,
  addProductToCart
};
