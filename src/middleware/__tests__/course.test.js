const { validateCourseBody } = require('../course');

describe('validateCourseBody middleware', () => {
  let req, res, next;

  beforeEach(() => {
    next = jest.fn();
    res = {
      status: jest.fn().mockReturnThis(),
      render: jest.fn()
    };
  });

  test('calls next() when title and description present', () => {
    req = { body: { title: 'T1', description: 'D1' }, originalUrl: '/courses/create' };
    validateCourseBody(req, res, next);
    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
    expect(res.render).not.toHaveBeenCalled();
  });

  test('renders create-course on missing fields for create', () => {
    req = { body: { title: '', description: '' }, originalUrl: '/courses/create' };
    validateCourseBody(req, res, next);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.render).toHaveBeenCalledWith('create-course', {
      error: 'Title and description are required',
      values: { title: '', description: '' }
    });
    expect(next).not.toHaveBeenCalled();
  });

  test('renders edit-course on missing fields for edit', () => {
    req = { body: { title: '', description: '' }, originalUrl: '/courses/123/edit' };
    validateCourseBody(req, res, next);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.render).toHaveBeenCalledWith('edit-course', {
      error: 'Title and description are required',
      values: { title: '', description: '' }
    });
    expect(next).not.toHaveBeenCalled();
  });
});