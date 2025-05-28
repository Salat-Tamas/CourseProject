const express = require('express');
const Course  = require('../models/course');
const { isAuthenticated }             = require('../middleware/auth');
const { validateCourseBody, validateObjectId, loadCourse } = require('../middleware/course');
const router = express.Router();

router.get('/', async (req, res) => {
  const courses = await Course.find();
  res.render('home', { courses });
});

// Create
router.get('/courses/create', isAuthenticated, (req, res) =>
  res.render('create-course', { error: null, values: {} })
);
router.post(
  '/courses/create',
  isAuthenticated,
  validateCourseBody,
  async (req, res, next) => {
    const { title, description } = req.body;
    try {
      const c = await Course.create({ title, description });
      res.redirect(`/courses/${c._id}`);
    } catch (err) { next(err); }
  }
);

// View
router.get(
  '/courses/:id',
  validateObjectId,
  loadCourse,
  (req, res) => {
    res.render('course', { course: req.course });
  }
);

// Edit
router.get(
  '/courses/:id/edit',
  isAuthenticated,
  validateObjectId,
  loadCourse,
  (req, res) => {
    res.render('edit-course', { error: null, values: req.course });
  }
);
router.post(
  '/courses/:id/edit',
  isAuthenticated,
  validateObjectId,
  loadCourse,
  validateCourseBody,
  async (req, res, next) => {
    try {
      const { title, description } = req.body;
      await Course.findByIdAndUpdate(req.params.id, { title, description });
      res.redirect(`/courses/${req.params.id}`);
    } catch (err) { next(err); }
  }
);

router.post(
  '/courses/:id/delete',
  isAuthenticated,
  validateObjectId,
  loadCourse,
  async (req, res, next) => {
    try {
      await Course.findByIdAndDelete(req.params.id);
      res.redirect('/');
    } catch (err) {
      next(err);
    }
  }
);


module.exports = router;