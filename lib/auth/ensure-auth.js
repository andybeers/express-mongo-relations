const tokenScv = require('./token');

module.exports = function getEnsureAuth() {

  return function ensureAuth(req, res, next) {
    const token = req.headers.authorization;
    if(!token) return next({
      code: 400,
      error: 'Unauthorized; no token provided.'
    });
    tokenScv.verify(token)
      .then(payload => {
        req.user = payload;
        next();
      })
      .catch(err => {
        return next({
          code: 403,
          error: 'Unauthorized; bad token.'
        });
      });
  };
};