const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { productService } = require('../services');

const createProduct = catchAsync(async (req, res) => {
  const product = await productService.createProduct(req);
  res.status(httpStatus.OK).send(product);
});

const getAllProducts = catchAsync(async (req, res) => {
  const products = await productService.getAllProducts(req);
  res.status(httpStatus.OK).send(products);
});

const getHomeSections = catchAsync(async (req, res) => {
  const products = await productService.getHomeSections(req);
  res.status(httpStatus.OK).send(products);
});

const deleteProduct = catchAsync(async (req, res) => {
  const product = await productService.deleteProduct(req);
  res.status(httpStatus.OK).send(product);
});

const updateProduct = catchAsync(async (req, res) => {
  const product = await productService.updateProduct(req);
  res.status(httpStatus.OK).send(product);
});

module.exports = {
  createProduct,
  getAllProducts,
  getHomeSections,
  deleteProduct,
  updateProduct,
};
