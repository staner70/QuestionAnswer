const Question = require("../models/Question");
const Answer = require("../models/Answer");
const CustomError = require("../helpers/CustomError");

module.exports = {
    async addNewAnswerToQuestion (request, response, next) {
        const { question_id } = request.params;

        const user_id = request.user.id;

        const information = request.body;

        const answer = await Answer.create({
                ...information,
                question: question_id,
                user: user_id
            });
        console.log("avant l'envoi de réponse");
        response.status(200).json({
            success: true,
            data: answer
        });
    },   
    async getAllAnswersByQuestion (request, response, next) {
        const { question_id } = request.params;

        const question = await Question.findById(question_id).populate("answers");

        const answers = question.answers;

        console.log("avant l'envoi de réponse");
        response.status(200).json({
            success: true,
            count: answers.length,
            data: answers
        });
    },    
    async getSingleAnswer (request, response, next) {
        const { answer_id } = request.params;

        const answer = await Answer
        .findById(answer_id)
        .populate(
            {
                path: "question",
                select: "title"
            }
        )
        .populate(
            {
                path: "user",
                select: "name profile_image"
            }
        );

        response.status(200).json({
            success: true,
            data: answer
        });
    },    
    async editAnswer (request, response, next) {

        const {answer_id} = request.params;

        const { content } = request.body;

        let answer = await Answer.findById(answer_id);

        answer.content = content;

        await answer.save();

        response.status(200).json({
            success: true,
            data: answer
        });
    },  
    async deleteAnswer (request, response, next) {

        const {answer_id} = request.params;

        const {question_id} = request.params;

        await Answer.findByIdAndRemove(answer_id);

        const question = await Question.findById(question_id);

        question.answers.splice(question.answers.indexOf(answer_id),1);
        question.answerCount = question.answers.length;

        await question.save();

        response.status(200).json({
            success: true,
            message: "Asnwer deleted successfull"
        });
    },
    async likeAnswer(request, response, next) {
        const { answer_id } = request.params;

        const answer = await Answer.findById(answer_id);
        
        console.log(answer.likes);
        if (answer.likes.includes(request.user.id)) {
            return next(new CustomError("You already liked this answer", 400));
        };

        answer.likes.push(request.user.id);
        await answer.save();

        response.status(200).json({
            success: true,
            data: answer
        });
    },
    async undoLikeAnswer(request, response, next) {
        const { answer_id } = request.params;

        const answer = await Answer.findById(id);
        
        if (!answer.likes.includes(request.user.id)) {
            return next(new CustomError("You can not undo like operation for this answer", 400));
        }
        const index = answer.likes.indexOf(request.user.id);
        answer.likes.splice(index, 1);
        await answer.save();

        response.status(200).json({
            success: true,
            data: answer
        });
    }
    
}
