/* eslint-disable no-console */
// const httpStatus = require('http-status');
const { Order, User } = require('../models');
const Address = require('../models/address.model');
// const ApiError = require('../utils/ApiError');
const { formatResponse } = require('../utils/formatResponse');

const createOrder = async (req, res) => {
  const { userId, products, shippingAddress, billingAddress, cartTotal } = req.body;

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  // Create new addresses
  const newShippingAddress = new Address(shippingAddress);
  const savedShippingAddress = await newShippingAddress.save();

  const newBillingAddress = new Address(billingAddress);
  const savedBillingAddress = await newBillingAddress.save();

  // Create the order
  const newOrder = new Order({
    userId: user._id,
    products,
    cartTotal,
    paymentStatus: 'pending',
    status: 'pending',
    shippingAddress: savedShippingAddress._id,
    billingAddress: savedBillingAddress._id,
  });

  const response = await Order.create(newOrder);
  return formatResponse(response);
};

const getAllOrders = async () => {
  const orders = await Order.find({}).populate(['products.product', 'userId', 'billingAddress', 'shippingAddress']);
  return formatResponse(orders);
};

module.exports = {
  createOrder,
  getAllOrders,
};
