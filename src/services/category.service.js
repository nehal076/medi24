/* eslint-disable no-console */
const httpStatus = require('http-status');
const { Category } = require('../models');
const ApiError = require('../utils/ApiError');
const { formatResponse } = require('../utils/formatResponse');

const createCategory = async (req) => {
  if (req.files.length === 0) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Please upload image');
  }
  const category = {
    name: req.body.name,
    image: req.files[0].location,
  };
  const response = await Category.create(category);
  return formatResponse(response);
};

const getAllCategories = async () => {
  const categories = await Category.find({});
  return formatResponse(categories);
};

module.exports = {
  createCategory,
  getAllCategories,
};
