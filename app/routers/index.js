const express = require('express');
const router = express.Router();
const question = require('./question');
const auth = require('./auth');
const user = require('./user');
const admin = require('./admin');
const { errorHandler } = require('../middlewares/customErrorHandler');

router.use('/api/questions', question );
router.use('/api/auth', auth);
router.use('/api/users', user);
router.use('/api/admin', admin);


router.use(errorHandler);

module.exports = router;