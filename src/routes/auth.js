const express = require('express');
const User    = require('../models/user');
const { isAuthenticated, isNotAuthenticated } = require('../middleware/auth');
const router  = express.Router();

// show login form
router.get('/login', isNotAuthenticated, (req, res) => {
  res.render('login', { error: null, values: {} });
});

// show register form
router.get('/register', isNotAuthenticated, (req, res) => {
  res.render('register', { error: null, values: {} });
});

router.post('/register', isNotAuthenticated, async (req, res) => {
  const { username, password, confirmPassword } = req.body;
  if (!username || !password) {
    return res.render('register', { error: 'Username and password are required', values: { username } });
  }
  if (password !== confirmPassword) {
    return res.render('register', { error: 'Passwords do not match', values: { username } });
  }
  if (await User.findOne({ username })) {
    return res.render('register', { error: 'Username exists', values: { username } });
  }
  const user = await User.create({ username, password });
  req.session.user = { id: user._id, username: user.username };
  res.redirect('/profile');
});

router.post('/login', isNotAuthenticated, async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username, password });
  if (!user) {
    return res.render('login', { error: 'Invalid credentials', values: { username } });
  }
  req.session.user = { id: user._id, username: user.username };
  const dest = req.session.returnTo || '/profile';
  delete req.session.returnTo;
  res.redirect(dest);
});

router.get('/profile', isAuthenticated, (req, res) => {
  res.render('profile', { user: req.session.user });
});

router.post('/logout', isAuthenticated, (req, res) => {
  req.session.destroy(() => res.redirect('/login'));
});

module.exports = router;