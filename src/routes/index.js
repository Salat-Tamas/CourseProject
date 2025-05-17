const express = require('express');
const { isAuthenticated } = require('../middleware/auth');
const router = express.Router();

// in-memory courses array
const courses = Array.from({ length: 16 }, (_, i) => ({
  id: i + 1,
  title: `Course ${i + 1}`,
  description: `Description for Course ${i + 1}`
}));

// Home
router.get('/', (req, res) => {
  res.render('home', { courses });
});

// Add Course
router.get('/courses/create', isAuthenticated, (req, res) => {
  res.render('create-course', { error: null, values: {} });
});
router.post('/courses/create', isAuthenticated, (req, res) => {
  const { title, description } = req.body;
  if (!title || !description) {
    return res.render('create-course', {
      error: 'Title and description are required',
      values: { title, description }
    });
  }
  // in real app: persist to DB; here just push and redirect
  const newId = courses.length + 1;
  courses.push({ id: newId, title, description });
  res.redirect(`/courses/${newId}`);
});

// View single course
router.get('/courses/:id', (req, res) => {
  const course = courses.find(c => c.id === +req.params.id);
  if (!course) return res.status(404).send('Course not found');
  res.render('course', { course });
});

// Edit Course
router.get('/courses/:id/edit', isAuthenticated, (req, res) => {
  const course = courses.find(c => c.id === +req.params.id);
  if (!course) return res.status(404).send('Course not found');
  res.render('edit-course', { error: null, values: course });
});
router.post('/courses/:id/edit', isAuthenticated, (req, res) => {
  const { title, description } = req.body;
  const course = courses.find(c => c.id === +req.params.id);
  if (!course) return res.status(404).send('Course not found');
  if (!title || !description) {
    return res.render('edit-course', {
      error: 'Title and description are required',
      values: { id: course.id, title, description }
    });
  }
  course.title = title;
  course.description = description;
  res.redirect(`/courses/${course.id}`);
});

module.exports = router;