const User = require('../../models/User');
const CustomError = require('../../helpers/CustomError');
const Question = require('../../models/Question');


module.exports = {

    checkUserExist: async(req,res,next) => {
        const {id} = req.params;

        const user = await User.findById(id);
        console.log(user, id);
        if (!user) {
            return next(new CustomError("There is no such user with that id", 400));

        }
        next();
    },

    checkQuestionExist: async(req,res,next) => {
        const question_id = req.params.id || req.params.question_id;

        const question = await Question.findById(question_id);
        console.log(question, question_id, "<-- question et id");
        if (!question) {
            return next(new CustomError("There is no such question with that id", 400));

        }
        next();
    }
}