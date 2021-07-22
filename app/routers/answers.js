const express = require("express");
const { getAccessToRoute, getAnswerOwnerAccess } = require("../middlewares/authorization/auth");
const { addNewAnswerToQuestion, getAllAnswersByQuestion, getSingleAnswer, editAnswer, deleteAnswer } = require("../controllers/answerController");
const {catchErrors} = require('../helpers/catchError');
const { checkQuestionAndAnswerExist } = require('../middlewares/database/databaseErrorHelpers');

const router = express.Router({mergeParams:true});

router.post('/', getAccessToRoute,  catchErrors(addNewAnswerToQuestion));
router.get('/', catchErrors(getAllAnswersByQuestion));
router.get('/:answer_id', checkQuestionAndAnswerExist, catchErrors(getSingleAnswer));
router.put('/:answer_id/edit', [ checkQuestionAndAnswerExist,getAccessToRoute,getAnswerOwnerAccess ], catchErrors(editAnswer));
router.delete('/:answer_id/delete', [ checkQuestionAndAnswerExist,getAccessToRoute,getAnswerOwnerAccess ], catchErrors(deleteAnswer));

module.exports = router;