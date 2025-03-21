const express = require('express');
const path = require('path');
const session = require('express-session');
const IndexController = require('./controllers/index');
const authRoutes = require('./routes/auth');
const { isAuthenticated } = require('./middleware/auth');
const app = express();
const indexController = new IndexController();

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

// Public routes
app.get('/', (req, res) => indexController.getHome(req, res));
app.get('/courses/:id', (req, res) => indexController.getCourse(req, res));

// Protected routes - require authentication
app.get('/courses/create', isAuthenticated, (req, res) => indexController.getCreateCourse(req, res));
app.post('/courses/create', isAuthenticated, (req, res) => indexController.createCourse(req, res));

// Auth routes
app.use(authRoutes);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});