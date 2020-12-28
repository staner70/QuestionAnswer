const User = require('../models/User');

module.exports = {

    async register(request, response, next) {
       
       // POST DATA 
       const name = "Sadullah Taner";
       const email = "sadullah@gmail.com";
       const password = "123456"
       
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

    },
}