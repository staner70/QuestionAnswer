const express = require('express');
const router = express.Router();
const question = require('./question');
const auth = require('./auth');

router.use('/api/questions', question );
router.use('/api/auth', auth);




module.exports = router;