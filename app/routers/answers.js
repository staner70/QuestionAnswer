const express = require("express");
const { getAccessToRoute } = require("../middlewares/authorization/auth");
const { addNewAnswerToQuestion, getAllAnswersByQuestion } = require("../controllers/answerController");
const {catchErrors} = require('../helpers/catchError');

const router = express.Router({mergeParams:true});

router.post('/', getAccessToRoute,  catchErrors(addNewAnswerToQuestion));
router.get('/', catchErrors(getAllAnswersByQuestion));

module.exports = router;