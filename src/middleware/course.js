const mongoose = require('mongoose');
const Course   = require('../models/course');

// 1) Validate create/edit payload
function validateCourseBody(req, res, next) {
  const { title, description } = req.body;
  if (!title || !description) {
    const view  = req.originalUrl.endsWith('/edit') ? 'edit-course' : 'create-course';
    const error = 'Title and description are required';
    const values = req.body;
    return res.status(400).render(view, { error, values });
  }
  next();
}

// 2) Ensure :id is a valid ObjectId
function validateObjectId(req, res, next) {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).send('Invalid course ID');
  }
  next();
}

// 3) Load course by ID (after validateObjectId)
async function loadCourse(req, res, next) {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).send('Course not found');
    req.course = course;
    next();
  } catch (err) {
    next(err);
  }
}

module.exports = {
  validateCourseBody,
  validateObjectId,
  loadCourse
};