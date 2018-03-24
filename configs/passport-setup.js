const passport =require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const FacebookStrategy=require('passport-facebook').Strategy;
const keys =require('./keys');
const User =require('../models/user-model');

passport.serializeUser((user,done)=>{
  done(null,user.id);
});

passport.deserializeUser((id,done)=>{
  User.findById(id).then((user)=>{
    done(null,user);
  });

});

passport.use(
  new GoogleStrategy({
  //options for the strategy
  callbackURL:'/auth/google/redirect',
  clientID:keys.google.clientID,
  clientSecret:keys.google.clientSecret
},(accessToken,refreshToken,profile,done)=>{
  //passport callback function
  console.log('passport callback function fired');
  console.log(profile);
  console.log("Access: "+accessToken);
  console.log("Refresh: "+refreshToken);
  // User.findOne({googleId:profile.id}).then((err,currentUser)=>{
  //   console.log('looking for user')
  //   if(currentUser){
  //     console.log('Already exists');
  //     done(err,currentUser);
  //   }
  //   else{
  //     new User({
  //       username:profile.displayName,
  //       googleId:profile.id,
  //       email:profile.emails[0]
  //     }).save().then((newUser)=>{
  //       console.log(newUser);
  //       done(err,newUser);
  //     });
  //   }
  // });
//  done(null,profile);
User.findOne({googleId:profile.id}).then((currentUser)=>{
  if(currentUser){
    console.log('Already exists');
    done(null,currentUser);
  }
  else{
    new User({
      username:profile.displayName,
      googleId:profile.id,
      email:profile.emails[0]
    }).save().then((newUser)=>{
      console.log(newUser);
      done(null,newUser);
    });
  }
});
})
);

passport.use(
  new FacebookStrategy({
  clientID: keys.facebook.AppID,
   clientSecret: keys.facebook.AppSecret,
   callbackURL: '/auth/facebook/callback',
   profileFields: ['id', 'email', 'gender', 'link', 'locale', 'name', 'timezone', 'updated_time', 'verified']
 },(accessToken,refreshToken,profile,done)=>{
   console.log('passport callback function fired');
   console.log(profile);
   done(null,profile);
   User.findOne({facebookId:profile.id}).then((currentUser)=>{
     if(currentUser){
       console.log('Already exists');
       done(null,currentUser);
     }
     else{
       new User({
         username:profile.displayName,
         facebookId:profile.id,
         email:profile.emails[0]
       }).save().then((newUser)=>{
         console.log(newUser);
         done(null,newUser);
       });
     }
   });
 })
);
