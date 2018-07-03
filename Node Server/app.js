const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const passport2 = require('passport');
const mongoose = require('mongoose');

const config=require('./config/database');

//Connect Database

mongoose.connect(config.database);
//mongoose.connect(config.database, { useMongoClient: true});

mongoose.connection.on('connected',()=>{
    console.log('Connect To DB'+ config.database);
});


mongoose.connection.on('error',(err)=>{
    console.log('Error in connection '+err);


});



const app =express();
const users=require('./routes/users.js');
const reserves=require('./routes/reserves.js');
const admins=require('./routes/admins');


app.use(cors());

//Body parser middleware
app.use(bodyParser.json());

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);







app.use('/users',users);
app.use('/reserves',reserves);
app.use('',admins);

//Set Static Folder 
app.use(express.static(path.join(__dirname,'public')));

const port =3000;

app.get('/',(req,res)=>{

    res.send("Invaild End point");

});

app.listen(port,()=>{
    console.log("Server is running port "+port);
});
