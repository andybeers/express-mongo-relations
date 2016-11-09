const express = require('express');
const app = express();
const errorHandler = require('./error-handler');
const ships = require('./routes/ships');
const characters = require('./routes/characters');
const capitals = require('./routes/capitals');
const auth = require('./routes/auth');
const ensureAuth = require('./auth/ensure-auth')();

app.use('/api/auth', auth);
app.use('/api/ships', ensureAuth, ships);
app.use('/api/characters', ensureAuth, characters);
app.use('/api/capitals', capitals);
app.use(errorHandler);

module.exports = app;