

// Import necessary modules
const express = require('express');
const bodyParser = require('body-parser');

require('dotenv').config()
const PORT=process.env.PORT || 3000;
const passport=require('./auth')
// Import database connection and Person model
const db = require('./db');
// Create Express app
const app = express();



const logRequest = (req,res,next)=>{
  console.log(`${new Date().toLocaleString()} Requset Made to: ${req.originalURL}`);
  next();
}



// Middleware for parsing JSON bodies
 app.use(bodyParser.json());
// Define routes

app.use(logRequest);
app.use(passport.initialize());

const passportLocalAuthenticate = passport.authenticate('local',{session:false})
app.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(PORT,()=>{
    console.log('Server is live..')
})


const personRoutes=require('./routes/personRoutes');
app.use('/person',passportLocalAuthenticate,personRoutes)
const MenuItemRoutes=require('./routes/MenuItemRoutes');
app.use('/Menu',MenuItemRoutes)

