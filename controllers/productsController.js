const fs = require('fs');
const path = './src/data/products.json';

const getAllProducts = (req, res) => {
  const products = JSON.parse(fs.readFileSync(path));
  const limit = req.query.limit ? parseInt(req.query.limit) : products.length;
  res.json(products.slice(0, limit));
};

const getProductById = (req, res) => {
  const products = JSON.parse(fs.readFileSync(path));
  const product = products.find(p => p.id === req.params.pid);
  if (product) {
    res.json(product);
  } else {
    res.status(404).send('Product not found');
  }
};

const addProduct = (req, res) => {
  const products = JSON.parse(fs.readFileSync(path));
  const newProduct = {
    id: products.length ? products[products.length - 1].id + 1 : 1,
    ...req.body,
    status: req.body.status !== undefined ? req.body.status : true
  };
  products.push(newProduct);
  fs.writeFileSync(path, JSON.stringify(products));
  res.status(201).json(newProduct);
};

const updateProduct = (req, res) => {
  const products = JSON.parse(fs.readFileSync(path));
  const index = products.findIndex(p => p.id === req.params.pid);
  if (index !== -1) {
    products[index] = { ...products[index], ...req.body, id: products[index].id };
    fs.writeFileSync(path, JSON.stringify(products));
    res.json(products[index]);
  } else {
    res.status(404).send('Product not found');
  }
};

const deleteProduct = (req, res) => {
  const products = JSON.parse(fs.readFileSync(path));
  const newProducts = products.filter(p => p.id !== req.params.pid);
  fs.writeFileSync(path, JSON.stringify(newProducts));
  res.status(204).send();
};

module.exports = {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct
};
