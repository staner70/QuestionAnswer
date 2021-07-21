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
    
}
