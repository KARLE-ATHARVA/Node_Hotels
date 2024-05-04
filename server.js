// Import necessary modules
const express = require('express');
const bodyParser = require('body-parser');

// Import database connection and Person model
const db = require('./db');



// Create Express app
const app = express();

// Middleware for parsing JSON bodies
 app.use(bodyParser.json());

// Define routes



app.get('/', function (req, res) {
  res.send('Hello World')
})
 
app.listen(3000,()=>{
    console.log('Server is live..')
})




const personRoutes=require('./routes/personRoutes');
app.use('/person',personRoutes)
const MenuItemRoutes=require('./routes/MenuItemRoutes');
app.use('/Menu',MenuItemRoutes)

