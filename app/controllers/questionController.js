const Question = require("../models/Question");

module.exports = {

    async getAllQuestions(request, response, next) {
        const questions = await Question.find();
        
        response.status(200).json({
            success: true,
            data: questions
        });
    },
    async getOneQuestion(request, response, next) {
        const questionId = request.params.id;
        const question = await Question.findById(questionId);

        response.status(200).json({
            success: true,
            data: question
        })
    },

    async askNewQuestion(request, response, next)  {
        const information = request.body;
          
       const question = await Question.create({
            ...information,
            user: request.user.id
        });
        response.status(200).json({
            success: true,
            data: question
        });
    },
}