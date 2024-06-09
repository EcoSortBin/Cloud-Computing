const express = require('express');
const userController = require('../controllers/profileController');

const router = express.Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/user/:email', userController.getProfile);
router.put('/user/:email', userController.editProfile);
router.delete('/user/:email', userController.deleteAccount);

module.exports = router;