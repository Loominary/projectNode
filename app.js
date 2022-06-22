var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


const mwAuth = require('./middleware/authentication')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var customersRouter = require('./routes/customers');
var businessRouter = require('./routes/business');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'client')));

app.use('/', indexRouter);
app.use('/users', mwAuth, usersRouter);
app.use('/customers', customersRouter);
app.use('/business', mwAuth, businessRouter);

module.exports = app;
