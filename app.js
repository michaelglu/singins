const express = require('express');
const authRoutes =require('./routes/auth-routes');
const passport = require('passport');
const passportSetup=require('./configs/passport-setup');
const mongoose=require('mongoose');
const keys=require('./configs/keys');
const port=process.env.PORT||3000;
const app=express();


app.set('view engine','ejs');

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(keys.mongodb.dbURI,()=>{
  console.log('connected to mongodb');
});

app.use('/auth',authRoutes);

app.get('/',(req,res)=>{
  res.render('home');
})

app.listen(port,()=>{
  console.log(`Listening on ${port}`);
});
