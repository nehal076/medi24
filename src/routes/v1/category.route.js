const express = require('express');
const { categoryController } = require('../../controllers');

const router = express.Router();
router.get('/getAllCategories', categoryController.getAllCategories);

module.exports = router;
