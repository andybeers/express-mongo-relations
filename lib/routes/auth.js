const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser').json();
const token = require('../auth/token');
const ensureAuth = require('../auth/ensure-auth')();
const User = require('../models/user');

router
  .post