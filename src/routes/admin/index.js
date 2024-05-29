const express = require('express');
const categoryRoute = require('./category.route');
const productRoute = require('./product.route');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/category',
    route: categoryRoute,
  },
  {
    path: '/product',
    route: productRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
