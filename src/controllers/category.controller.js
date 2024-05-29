const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { categoryService } = require('../services');

const createCategory = catchAsync(async (req, res) => {
  const category = await categoryService.createCategory(req);
  res.status(httpStatus.OK).send(category);
});

const getAllCategories = catchAsync(async (req, res) => {
  const categories = await categoryService.getAllCategories(req);
  res.status(httpStatus.OK).send(categories);
});

module.exports = {
  createCategory,
  getAllCategories,
};
