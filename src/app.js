const path = require('path');
const morgan = require('morgan');
const express = require('express');
const passport = require('passport');
const routes = require('./routes');
const {
  handler: errorHandler,
  converter,
  notFound,
} = require('./middleware/error');
const passportConfig = require('./config/passport');

// initialize the express app
const app = express();

// initialize passportjs
passportConfig(passport);
app.use(passport.initialize());

// performance & security utils
app.use(require('compression')());
app.use(require('helmet')());
app.use(require('cors')());

app.use(express.json({ limit: '3mb' }));
app.use(express.urlencoded({ extended: true, limit: '3mb' }));

// logging
app.use(morgan('common'));

app.use('/media', express.static(path.join(__dirname, '../media')));
app.use('/api', routes);

// format error then handle it
app.use(converter);
app.use(notFound);
app.use(errorHandler);

module.exports = app;
