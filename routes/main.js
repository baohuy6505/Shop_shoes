const express = require('express');
const router = express.Router();

const usersRouter = require('./users');
    // app.user('/users', usersRouter);
    router.use('/users', usersRouter);

module.exports = router;