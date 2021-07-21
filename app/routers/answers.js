const express = require("express");
const { getAccessToRoute } = require("../middlewares/authorization/auth");
const { addNewAnswerToQuestion, getAllAnswersByQuestion, getSingleAnswer } = require("../controllers/answerController");
const {catchErrors} = require('../helpers/catchError');
const { checkQuestionAndAnswerExist } = require('../middlewares/database/databaseErrorHelpers');

const router = express.Router({mergeParams:true});

router.post('/', getAccessToRoute,  catchErrors(addNewAnswerToQuestion));
router.get('/', catchErrors(getAllAnswersByQuestion));
router.get('/:answer_id', checkQuestionAndAnswerExist, catchErrors(getSingleAnswer));

module.exports = router;