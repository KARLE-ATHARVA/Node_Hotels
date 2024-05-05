const passport=require('passport')
const person=require('./models/person')
const LocalStrategy=require('passport-local').Strategy

passport.use(new LocalStrategy(async(USERNAME,password,done)=>{
    try {
      console.log("Received Credentials:", USERNAME, password);
      
      // Assuming 'person' is your Mongoose model for users
      const user = await person.findOne({ username: USERNAME });
  
      if (!user) {
          return done(null, false, { message: 'Incorrect Username.' });
      }
  
      const isPasswordMatch = await user.password === password;
  
      if (isPasswordMatch) {
          return done(null, user);
      } else {
          return done(null, false, { message: 'Incorrect Password' });
      }
  } catch (error) {
      // Handle any errors that occur during the authentication process
      console.error('Authentication error:', error);
      return done(error); // Pass the error to the next middleware or route handler
  }
  
  }))

  module.exports= passport