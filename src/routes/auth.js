const express = require('express');
const AuthController = require('../controllers/auth');
const router = express.Router();
const authController = new AuthController();

router.get('/login', (req, res) => authController.getLogin(req, res));
router.post('/login', (req, res) => authController.postLogin(req, res));
router.get('/register', (req, res) => authController.getRegister(req, res));
router.post('/register', (req, res) => authController.postRegister(req, res));
router.get('/profile', (req, res) => authController.getProfile(req, res));
router.post('/logout', (req, res) => authController.postLogout(req, res));

module.exports = router;