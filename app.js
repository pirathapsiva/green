const express = require('express');
const app = express();
const cors = require("cors") ;
const morgan = require('morgan');
const bodyParser = require ('body-parser');
const mongoose = require('mongoose');


const multer = require('multer')
const upload = multer({ dest: 'foodimages/img'});

const orderRoutes = require ('./api/routes/booking.routes');
const parlours = require('./api/routes/parlours.routes');
const package = require('./api/routes/package.routes');
const userRoutes = require('./api/routes/user.routes');

mongoose.connect('mongodb+srv://m001-student:m001-mongodb-basics@beautyone.ex1dd.mongodb.net/sample?retryWrites=true&w=majority'),{
    useMongoClient: true
}

mongoose.Promise = global.Promise;

app.use(morgan('dev'))
app.use(cors())
app.use(bodyParser.urlencoded({extended : false}))
app.use(bodyParser.json());
app.use(express.static('public'));

// app.use((req,res,next) =>{
//     res.header("Access-Control-Allow-Origin","*")
//     res.header("Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Conten-Type, Accept, Authorization");
//     // if(req.method === 'OPTIONS') {
//     //     res.header('Access-Control-Allow-mathods','PUT,POST,PATCH,DELETE,GET')
//     //     return res.status(200).json({});
//     // }
//     next();
// }) 

// routes which should be handle requests

app.use('/user', userRoutes);
app.use('/parlours',parlours);
app.use('/booking',orderRoutes);
app.use('/package',package);

// This is message when above two routes Doesn't work
app.use((req,res,next)=>{
    const error = new Error ('Not Found');
    error.status = 404;
    next(error);
})
//when our custom error doesn't work
app.use((error,req,res,next)=>{
    res.status (error.status||500);
    res.json({
        error:{
            message : error.message
        }
    })
})



    


module.exports = app;