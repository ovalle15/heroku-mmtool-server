const express = require("express");
const UserController = require('../controllers/user-controller');
const router = express.Router();


router.post('/users/register', UserController.findUserRegister);
router.post('/users/login',UserController.findUserLogin)


module.exports = router;