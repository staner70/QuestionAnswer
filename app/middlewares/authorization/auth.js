const CustomError = require('../../helpers/CustomError');
const jwt = require('jsonwebtoken');
const { isTokenIncluded, getAccessTokenFrom } = require('../../helpers/authorization/tokenHelpers');



module.exports = {

    getAccessToRoute: async(request ,response, next) => {
        // Token
        const {JWT_SECRET_KEY} = process.env;
        if (!isTokenIncluded(request)) {
            
            return next(new CustomError("You are not authorized to access this route", 401));

        }
        const accessToken = getAccessTokenFrom(request);
       
        jwt.verify(accessToken, JWT_SECRET_KEY, (err, decoded) => {
            if (err) {
                console.log(accessToken, "<--- verify");
                return next(new CustomError("You are not authorized to access this route", 401));
                
            }
            request.user = {
                id: decoded.id,
                name: decoded.name
            }
            console.log(decoded);
            next();
        });
        

        //CustomError
    }
};