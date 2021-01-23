const express=require('express');
const router=express.Router();
// const passport=require('passport');

const studentController=require('../controller/students');

router.get('/login',studentController.login);
router.post('/login',studentController.loggedin);

// router.get('/register',usercontroller.register);
// router.post('/register',usercontroller.createUser);

// //use passport as a middle to authenticate
// router.post('/createSession',passport.authenticate(
//                                         'local',
//                                         {failureRedirect:'/users/login'}),
//                                         usercontroller.createSession);
// router.get('/logout',usercontroller.destroySession);                                        
// router.get('/verify/:email',usercontroller.verify);

module.exports=router;