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
router.get('/sprofile',passport.checkAuthentication,studentController.profile);

router.get('/details',studentController.details);
router.post('/updateProfile',studentController.updateProfile);

router.get('/upcomingExams',studentController.upcomingExams);
router.get('/examsEnrolled',studentController.examsEnrolled);
// use passport as a middle to authenticate
router.post('/slogin',passport.authenticate(
                                        'student',
                                        {failureRedirect:'/students/log-in'}),
                                        studentController.createSession);
router.get('/logout',studentController.destroySession);                                        
router.get('/verify/:email',studentController.verify);
router.get('/testEnroll/:code',studentController.testEnroll);
module.exports=router;