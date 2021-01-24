const express=require('express');
const router=express.Router();
const passport=require('passport');

const studentController=require('../controller/students');

router.get('/login',studentController.login);
// router.post('/login',studentController.loggedin);
router.get('/log-in',studentController.loginfailed);
router.get('/register',studentController.register);
router.post('/register',studentController.createStudent);
router.get('/verification',studentController.verification);
router.get('/profile',passport.checkAuthentication,studentController.profile);

// //use passport as a middle to authenticate
router.post('/login',passport.authenticate(
                                        'local',
                                        {failureRedirect:'/students/log-in'}),
                                        studentController.createSession);
router.get('/logout',studentController.destroySession);                                        
router.get('/verify/:email',studentController.verify);

module.exports=router;