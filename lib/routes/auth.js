const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser').json();
const token = require('../auth/token');
const ensureAuth = require('../auth/ensure-auth')();
const User = require('../models/user');

router
  .post('/validate', ensureAuth, (req, res, next) => {
    res.send({valid: true});
  });

router
  .post('/signup', bodyParser, (req, res, next) => {
    const {username, password} = req.body;
    delete req.body.password;

    if(!username || !password) {
      return next({
        code: 400,
        error: 'Username and Password required.'
      });
    }

    User.find({username})
      .count()
      .then(count => {
        if (count > 0) throw {
          code: 400,
          error: `Username ${username} already exists.`
        };
        const user = new User(req.body);
        user.generateHash(password);
        return user.save();
      })
      .then(user => token.sign(user))
      .then(token => res.send({token}))
      .catch(next);

  });