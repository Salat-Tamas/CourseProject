const express = require('express');
const AuthController = require('../controllers/auth');
const { isAuthenticated, isNotAuthenticated } = require('../middleware/auth');
const router = express.Router();
const authController = new AuthController();

// Routes for non-authenticated users
router.get('/login', isNotAuthenticated, (req, res) => authController.getLogin(req, res));
router.post('/login', isNotAuthenticated, (req, res) => authController.postLogin(req, res));
router.get('/register', isNotAuthenticated, (req, res) => authController.getRegister(req, res));
router.post('/register', isNotAuthenticated, (req, res) => authController.postRegister(req, res));

// Routes for authenticated users
router.get('/profile', isAuthenticated, (req, res) => authController.getProfile(req, res));
router.post('/logout', isAuthenticated, (req, res) => authController.postLogout(req, res));

module.exports = router;