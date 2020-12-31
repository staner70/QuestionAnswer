const CustomError = require('../helpers/CustomError');
const User = require('../models/User');
const  {sendJwtToClient} = require('../helpers/authorization/tokenHelpers');
const {validateUserInput,comparePassword} = require('../helpers/input/inputHelpers');


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
            sendJwtToClient(user,response);

        } catch (error) {
            next(error);
        }



    },
    login: async(req, res, next) => {
        const {email, password} = req.body;
        if (!validateUserInput(email,password)) {
            return next(new CustomError("Please check your inputs",400));
        }

        const user  = await User.findOne({email}).select("+password");

        if (!comparePassword(password, user.password)) {
            return next(new CustomError("Please check your credentials",400));
        }

        sendJwtToClient(user,res);
    },

    logout: async(req, res, next) => {

        const { NODE_ENV } = process.env;

        return res.status(200).cookie({
            httpOnly: true,
            expires: new Date(Date.now()),
            secure: NODE_ENV === "development" ? false : true
        }).json({
            success: true,
            message: "Logout Successfull"
        });
    },

    getUser: (request, response, next) => {
        response.json({
            success: true,
            data: {
                id: request.user.id,
                name: request.user.name
            }
        })
    },


}