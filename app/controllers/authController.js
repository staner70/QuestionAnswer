const CustomError = require('../helpers/CustomError');
const User = require('../models/User');
const asyncErrorWrapper = require('express-async-handler');

module.exports = {

    async register(request, response, next) {
       
       // POST DATA 
       const name = "Selim Taner";
       const email = "sadullah@gmail.com";
       const password = "123456"
       
        try {
            const user = await User.create({
                name,
                email,
                password
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