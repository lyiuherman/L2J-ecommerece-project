const passport = require('passport');
const user = require('../../model/user');


const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
require('dotenv').config()
passport.use(new GoogleStrategy({
    clientID:     process.env.GOOGLE_CLIENT_ID,
    clientSecret: "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",
    callbackURL: "http://localhost:5080/auth/google/callback",
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {
   done(null,profile)
  }
));

passport.serializeUser((user,done)=>{
    done(null,user)

})
passport.deserializeUser((user,done)=>{
    done(null,user)

})