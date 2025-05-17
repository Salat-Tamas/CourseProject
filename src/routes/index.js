const express = require('express');
const Course = require('../models/course');
const { isAuthenticated } = require('../middleware/auth');
const router = express.Router();

router.get('/', async (req, res) => {
  const courses = await Course.find();
  res.render('home', { courses });
});

router.get('/courses/create', isAuthenticated, (req, res) =>
  res.render('create-course', { error: null, values: {} })
);

router.post('/courses/create', isAuthenticated, async (req, res) => {
  const { title, description } = req.body;
  if (!title || !description) {
    return res.render('create-course', {
      error: 'Title and description are required',
      values: { title, description }
    });
  }
  const course = await Course.create({ title, description });
  res.redirect(`/courses/${course._id}`);
});

router.get('/courses/:id', async (req, res) => {
  const course = await Course.findById(req.params.id);
  if (!course) return res.status(404).send('Course not found');
  res.render('course', { course });
});

router.get('/courses/:id/edit', isAuthenticated, async (req, res) => {
  const course = await Course.findById(req.params.id);
  if (!course) return res.status(404).send('Course not found');
  res.render('edit-course', { error: null, values: course });
});

router.post('/courses/:id/edit', isAuthenticated, async (req, res) => {
  const { title, description } = req.body;
  if (!title || !description) {
    return res.render('edit-course', {
      error: 'Title and description are required',
      values: { _id: req.params.id, title, description }
    });
  }
  await Course.findByIdAndUpdate(req.params.id, { title, description });
  res.redirect(`/courses/${req.params.id}`);
});

module.exports = router;