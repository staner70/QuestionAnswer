require('dotenv').config();
const express = require('express');
const router = require('./app/routers');
const clientMongoose = require('./app/database/client');

const app = express();

app.use(express.json());
app.use(router);

// Error handler
app.use((err,request, response, next) => {
    console.log(err);
    response
    .status(400)
    .json({
        success: false
    })
} )

// Connection Mongoose
clientMongoose();

app.listen(process.env.PORT || 3000, () => {
   console.log('Server running on :', process.env.PORT);
});