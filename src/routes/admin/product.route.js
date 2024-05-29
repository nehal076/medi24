const express = require('express');
const { uploadImage } = require('../../utils/uploadImage');
const { productController } = require('../../controllers');

const router = express.Router();

router.post('/createProduct', uploadImage.any('images'), productController.createProduct);
router.delete('/deleteProduct', productController.deleteProduct);

module.exports = router;
