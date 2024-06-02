// src/routes/index.js
const express = require('express');
const articleRoutes = require('./articles');
const userRoutes = require('./users');
const userController = require('../controllers/userController')

const router = express.Router();

router.use('/articles', articleRoutes);
router.use('/users', userRoutes);

module.exports = router;
