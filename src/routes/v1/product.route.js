const express = require('express');
const { productController } = require('../../controllers');

const router = express.Router();
router.get('/getAllProducts', productController.getAllProducts);
router.get('/getHomeSections', productController.getHomeSections);

module.exports = router;
