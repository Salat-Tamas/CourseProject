const express = require('express');
const { isAuthenticated, isNotAuthenticated } = require('../middleware/auth');
const UserModel = require('../models/user');
const router = express.Router();

// login
router.get('/login', isNotAuthenticated, (req, res) =>
  res.render('login', { error: null, values: {} })
);

router.post('/login', isNotAuthenticated, (req, res) => {
  const { username, password } = req.body;
  const user = UserModel.find(username, password);
  if (!user) {
    return res.render('login', {
      error: 'Invalid credentials',
      values: { username }
    });
  }
  req.session.user = user;
  const dest = req.session.returnTo || '/profile';
  delete req.session.returnTo;
  res.redirect(dest);
});

// register
router.get('/register', isNotAuthenticated, (req, res) =>
  res.render('register', { error: null, values: {} })
);

router.post('/register', isNotAuthenticated, (req, res) => {
  const { username, password, confirmPassword } = req.body;
  const err = UserModel.validateAndCreate(username, password, confirmPassword);
  if (err) {
    return res.render('register', { error: err, values: { username } });
  }
  req.session.user = { username };
  res.redirect('/profile');
});

// profile & logout
router.get('/profile', isAuthenticated, (req, res) =>
  res.render('profile', { user: req.session.user })
);

router.post('/logout', isAuthenticated, (req, res) => {
  req.session.destroy(() => res.redirect('/login'));
});

module.exports = router;