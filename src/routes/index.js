const express = require('express');
const IndexController = require('../controllers/index');

function setRoutes(app) {
    const router = express.Router();
    const indexController = new IndexController();

    router.get('/', indexController.getHome);
    router.get('/about', indexController.getAbout);
    // Add more routes as needed

    app.use('/', router);
}

module.exports = setRoutes;