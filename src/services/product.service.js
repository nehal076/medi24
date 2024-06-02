/* eslint-disable no-console */
const httpStatus = require('http-status');
const { Product, HomeSections, Category } = require('../models');
const ApiError = require('../utils/ApiError');
const { formatResponse } = require('../utils/formatResponse');

const createProduct = async (req) => {
  console.log(req.body);
  console.log(req.files);
  if (req.files.length === 0) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Please upload product image');
  }
  const images = [];
  req.files.forEach((element) => {
    images.push(element.location);
  });
  const [, ...otherImages] = images;
  const product = { ...req.body, images: otherImages, featuredImage: images[0] };
  const response = await Product.create(product);
  if (req.body.categories) {
    await req.body.categories.forEach(async (categoryId) => {
      await Category.findByIdAndUpdate(categoryId, { $addToSet: { products: response._id } });
    });
  }
  if (req.body.homeSection) {
    await req.body.homeSection.forEach(async (sectionId) => {
      await HomeSections.findByIdAndUpdate(sectionId, { $addToSet: { products: response._id } });
    });
  }
  return formatResponse(response);
};

const getAllProducts = async () => {
  const products = await Product.find({});
  return formatResponse(products);
};

const getHomeSections = async () => {
  const products = await HomeSections.find({}).populate('products');
  return formatResponse(products);
};

const deleteProduct = async (req) => {
  const { productId } = req.query;
  const product = await Product.findById(productId);
  console.log(product);
  await product.categories.forEach(async (category) => {
    await Category.findByIdAndUpdate(category._id, { $pull: { products: productId } });
  });

  await HomeSections.updateMany({}, { $pull: { products: productId } });

  await Product.deleteOne({ _id: productId });

  return formatResponse({ message: 'Product Deleted' });
};

const updateProduct = async (req) => {
  const { id } = req.query;
  const product = await Product.findById(id);

  console.log(product);

  const updatedProduct = await Product.updateOne(
    { _id: product.id },
    {
      ...req.body,
    }
  );

  return formatResponse({ message: 'Product Updated', data: updatedProduct });
};

module.exports = {
  createProduct,
  getAllProducts,
  getHomeSections,
  deleteProduct,
  updateProduct,
};
