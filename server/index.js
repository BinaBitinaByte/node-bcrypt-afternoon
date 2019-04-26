require("dotenv").config(); //When you require dotenv, immediately invoke the config method from this module.
const express = require("express"); //Define a const variable called app equal to express invoked.
const app = express(); //Install and require the following packages and store them as const variables
const massive = require("massive");  //Install and require the following packages and store them as const variables
const session = require ("express-session"); //Install and require the following packages and store them as const variables
const PORT = 4000; //Define a const variable called PORT equal to 4000
const { SESSION_SECRET, CONNECTION_STRING } = process.env; //In index.js, destructure CONNECTION_STRING and SESSION_SECRET from process.env, storing it on a const variable.
const ac = require('./controllers/authController');//Open server/index.js and require the authController.js file storing it on a const variable called ac.
const authCtrl = require('./controllers/authController');
const treasureCtrl = require('./controllers/treasureController')
const auth = require('./middleware/authMiddleware');

app.use(express.json());

//Create the database connection by invoking massive and passing in
//the CONNECTION_STRING
massive(CONNECTION_STRING)
//Add a .then on the massive invocation passing in a function, and 
//store the resulting database connection using app.set.
    .then(db => {
        app.set("db", db);
        console.log("Database connected")
    })

//Set up session as top-level middleware by invoking app.use and passing 
//in session invoked with a configuration object.The session configuration 
//object should have properties resave set to true, saveUninitialized set to 
//false, and secret set to SESSION_SECRET.
app.use(
    session({ 
        secret: SESSION_SECRET, 
        resave: false, 
        saveUninitialized: true,
     }))


     //In server/index.js we will create the register endpoint.
     //Create a POST endpoint with '/auth/register' as the URL and ac.register as the controller function.
     //Next, create a register method with parameters req and 
     //res. We will use async and await, so make sure to use the async keyword before the function.
app.post("/auth/register", async ( req, res ) => {
    //Destructure username, password and isAdmin from req.body.
    const { username, password, isAdmin } = req.body;
    //Get the database instance and run the sql file get_user, passing in username. This query will 
    //check the database to see if the username is already taken. Since this query is asynchronous, 
    //make sure to use the await keyword to ensure that the promise resolves before the rest of the 
    //code executes.
    const dbResult = await req.app 
})

app.post('/auth/register', authCtrl.register);
app.post('/auth/login', authCtrl.login);
app.get('/auth/logout', authCtrl.logout);

app.get('/api/treasure/dragon', treasureCtrl.dragonTreasure);
app.get('/api/treasure/user', treasureCtrl.getUserTreasure);
app.post('/api/treasure/user', auth.usersOnly, treasureCtrl.addUserTreasure);
app.get('/api/treasure/all', auth.usersOnly, treasureCtrl.getAllTreasure);



app.listen(PORT, ()=> console.log(`Listening on port ${ PORT }`))