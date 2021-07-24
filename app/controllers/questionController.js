const CustomError = require("../helpers/CustomError");
const Question = require("../models/Question");

module.exports = {

    async getAllQuestions(request, response, next) {
        let query = Question.find();
        const populate = true;
        const populateObject = {
            path: "user",
            select: "name profile_image"
        };
        if (request.query.search) {
            const searchObject = {};

            const regex = new RegExp(request.query.search, "i");
            searchObject["title"] = regex;

            query = query.where(searchObject);
        }

        if (populate) {
            query = query.populate(populateObject);
        }
        
        const questions = await query;
        
        // const questions = await Question.find();
        
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

    async editQuestion(request, response, next) {
        const {id} = request.params;

        const {title, content} = request.body;

        let question = await Question.findById(id);

        question.title = title;
        question.content = content;
       
        question = await question.save();

        response.status(200).json({
            success: true,
            data: question
        });
    },

    async deleteQuestion(request, response, next) {
        const {id} = request.params;

        await Question.findByIdAndDelete(id);

        response.status(200).json({
            success: true,
            message: "Question delete operation successful"
        });
    },
    async likeQuestion(request, response, next) {
        const {id} = request.params;

        const question = await Question.findById(id);
        
        console.log(question.likes);
        if (question.likes.includes(request.user.id)) {
            return next(new CustomError("You already liked this question", 400));
        };

        question.likes.push(request.user.id);
        await question.save();

        response.status(200).json({
            success: true,
            data: question
        });
    },
    async undoLikeQuestion(request, response, next) {
        const { id } = request.params;

        const question = await Question.findById(id);
        
        if (!question.likes.includes(request.user.id)) {
            return next(new CustomError("You can not undo like operation for this question", 400));
        }
        const index = question.likes.indexOf(request.user.id);
        question.likes.splice(index, 1);
        await question.save();

        response.status(200).json({
            success: true,
            data: question
        });
    }
}