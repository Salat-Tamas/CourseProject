const { isAuthenticated, isNotAuthenticated } = require('../auth');

describe('auth middleware', () => {
  let req, res, next;

  beforeEach(() => {
    req = { session: {}, originalUrl: '/protected' };
    res = { redirect: jest.fn() };
    next = jest.fn();
  });

  describe('isAuthenticated', () => {
    test('calls next() when session.user exists', () => {
      req.session.user = { id: 'u1' };
      isAuthenticated(req, res, next);
      expect(next).toHaveBeenCalled();
      expect(res.redirect).not.toHaveBeenCalled();
    });

    test('redirects to /login and saves returnTo when no user', () => {
      isAuthenticated(req, res, next);
      expect(req.session.returnTo).toBe('/protected');
      expect(res.redirect).toHaveBeenCalledWith('/login');
      expect(next).not.toHaveBeenCalled();
    });
  });

  describe('isNotAuthenticated', () => {
    test('redirects to / when session.user exists', () => {
      req.session.user = { id: 'u1' };
      isNotAuthenticated(req, res, next);
      expect(res.redirect).toHaveBeenCalledWith('/');
      expect(next).not.toHaveBeenCalled();
    });

    test('calls next() when no user', () => {
      isNotAuthenticated(req, res, next);
      expect(next).toHaveBeenCalled();
      expect(res.redirect).not.toHaveBeenCalled();
    });
  });
});