const express = require('express');
const {getOneQuestion, getAllQuestions, askNewQuestion} = require('../controllers/questionController');
const {getAccessToRoute} = require('../middlewares/authorization/auth');
const {catchErrors} = require('../helpers/catchError');
const { checkQuestionExist } = require('../middlewares/database/databaseErrorHelpers');

const router = express.Router();


router.get('/', catchErrors(getAllQuestions));
router.get('/:id', catchErrors(checkQuestionExist), catchErrors(getOneQuestion));
router.post('/ask', getAccessToRoute, catchErrors(askNewQuestion));


module.exports = router;