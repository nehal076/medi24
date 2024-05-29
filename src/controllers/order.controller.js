const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { orderService } = require('../services');

const createOrder = catchAsync(async (req, res) => {
  const category = await orderService.createOrder(req, res);
  res.status(httpStatus.OK).send(category);
});

const getAllOrders = catchAsync(async (req, res) => {
  const categories = await orderService.getAllOrders(req);
  res.status(httpStatus.OK).send(categories);
});

module.exports = {
  createOrder,
  getAllOrders,
};
