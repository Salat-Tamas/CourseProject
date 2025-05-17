require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const session = require('express-session');
const indexRoutes = require('./routes/index');
const authRoutes  = require('./routes/auth');

const app = express();

// --- MongoDB connection ---
const uri = process.env.MONGO_URI 
          || 'mongodb://localhost:27017/course-project';
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use('/css', express.static(path.join(__dirname, 'css')));

app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
}));

app.use((req, res, next) => {
  res.locals.user = req.session.user;
  next();
});

app.use('/', indexRoutes);
app.use('/', authRoutes);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});