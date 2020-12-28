module.exports = {

    async getAllQuestions(request, response, next) {
        response.json({
            success: true
        });
    },
}