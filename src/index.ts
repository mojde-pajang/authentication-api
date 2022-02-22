import express from 'express';

const dotenv = require('dotenv');

//App requirement
const bodyParser = require('body-parser');
const cors = require('cors');
const Controllers = require('./controller');
const mongoose = require('mongoose');
const middleware = require('./middleware');


const app = express();
const port = process.env.PORT || 3000;

dotenv.config();

//Encrypting data
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//Set header for CORS
app.use(cors())

//Connecting To DB
async function connect_db() {
    await mongoose.connect(process.env.DB_CONNECTION)
    console.log('connected to mongoDb');

    //Start a server
    app.listen(port, ()=>{
        console.log(`listening at http://localhost:${port}`)
    })
}


//Routes 
app.get('/users', middleware.auth_check, Controllers.get_all_users)
app.post('/signup', Controllers.signup_route)
app.post('/signin', Controllers.signin_route)

// Create 404 error for not handled routes 
app.use(Controllers.not_found);

// Middleware to handle errors
app.use(middleware.error_handler)


connect_db().catch( (error) => {
    console.log(error)
})