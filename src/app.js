const express = require('express');
const path = require('path');
const session = require('express-session');
const indexRoutes = require('./routes/index');
const authRoutes = require('./routes/auth');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use('/css', express.static(path.join(__dirname, 'css')));

app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
}));

// make user available in all views
app.use((req, res, next) => {
  res.locals.user = req.session.user;
  next();
});

app.use('/', indexRoutes);
app.use('/', authRoutes);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});