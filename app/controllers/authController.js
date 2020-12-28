const CustomError = require('../helpers/CustomError');
const User = require('../models/User');


module.exports = {

    async register(request, response, next) {
       
       // POST DATA 
        const {name,email,password,role} = request.body;
       
        try {
            const user = await User.create({
                name,
                email,
                password,
                role
            });
                response
                .status(200)
                .json({
                    success: true,
                    data: user,
                });
        } catch (error) {
            next(error);
        }



    },

    errorTest: (request, response, next) => {
        next(new SyntaxError('Syntax Error', 400));
    }
}