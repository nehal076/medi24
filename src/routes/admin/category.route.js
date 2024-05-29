const express = require('express');
const { uploadImage } = require('../../utils/uploadImage');
const { categoryController } = require('../../controllers');

const router = express.Router();

router.post('/createCategory', uploadImage.any('image'), categoryController.createCategory);

module.exports = router;
