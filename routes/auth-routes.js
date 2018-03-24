const router = require('express').Router();
const passport=require('passport');
//auth login
router.get('/login',(req,res)=>{
  res.render('login');
});

//auth logout
router.get('/logout',(req,res)=>{
  //passport
  res.send('logging out');
});
//auth google

router.get('/google',passport.authenticate('google',{
  scope:['profile','email']
}));

//callback route google
router.get('/google/redirect',passport.authenticate('google'),(req,res)=>{
  console.log("______________________________________________________________");
  //console.log(req.user);
  res.send("DONE");
});
router.get('/facebook',passport.authenticate('facebook',{
//scope:['email']
}));
router.get('/facebook/callback',passport.authenticate('facebook'),(req,res)=>{
  console.log('callback fired');
  res.send('you reached callback url');
});
module.exports=router;
