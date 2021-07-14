const express = require('express');
const answers = require('./answers');
const {
    getOneQuestion,
    getAllQuestions,
    askNewQuestion,
    editQuestion,
    deleteQuestion,
    likeQuestion,
    undoLikeQuestion } = require('../controllers/questionController');
const {getAccessToRoute, getQuestionOwnerAccess} = require('../middlewares/authorization/auth');
const {catchErrors} = require('../helpers/catchError');
const { checkQuestionExist } = require('../middlewares/database/databaseErrorHelpers');

const router = express.Router();

router.get('/:id/like', [getAccessToRoute, checkQuestionExist], catchErrors(likeQuestion));
router.get('/:id/undo_like', [getAccessToRoute, checkQuestionExist], catchErrors(undoLikeQuestion));
router.get('/', catchErrors(getAllQuestions));
router.get('/:id', catchErrors(checkQuestionExist), catchErrors(getOneQuestion));
router.post('/ask', getAccessToRoute, catchErrors(askNewQuestion));
router.put('/:id/edit', [getAccessToRoute, checkQuestionExist, getQuestionOwnerAccess], catchErrors(editQuestion));
router.delete('/:id/delete', [getAccessToRoute, checkQuestionExist, getQuestionOwnerAccess], catchErrors(deleteQuestion));

router.use("/:question_id/answer", checkQuestionExist, answers);

module.exports = router;