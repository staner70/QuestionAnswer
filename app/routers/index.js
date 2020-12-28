const express = require('express');
const router = express.Router();
const question = require('./question');
const auth = require('./auth');
const { errorHandler } = require('../middlewares/customErrorHandler');

router.use('/api/questions', question );
router.use('/api/auth', auth);


router.use(errorHandler);

module.exports = router;