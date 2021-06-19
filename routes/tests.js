const express=require('express');
const router=express.Router();
const passport=require('passport');

const testController=require('../controller/tests');
//update marks
router.get('/updateMarks/:code',testController.updateMarks);

//adding subject
router.get('/addSubject',testController.addSubject);
router.post('/addSubject',testController.createSubject);
router.get('/deleteSubject/:s_code',testController.deleteSubject);

//adding test
router.get('/createTest/:s_code',testController.addTest);
router.post('/createTest/:s_code',testController.createTest);
router.get('/deleteTest/:t_code',testController.deleteTest);

//take test
router.get('/startTest/:param',testController.startTest);
router.get('/quiz/:param',testController.quiz);


//add question page render
// router.get('/addQuestions',testController.addQuestions);
// router.post('/addQuestions',testController.createQuestions);
// router.get('/deleteQuestion/:s_code',testController.deleteQuestion);

// router.get('/deleteTest/:t_code',testController.deleteSubject);

// router.post('/login',studentController.loggedin);
// router.get('/log-in',studentController.loginfailed);
// router.get('/register',studentController.register);
// router.post('/register',studentController.createStudent);
// router.get('/verification',studentController.verification);
// router.get('/profile',passport.checkAuthentication,adminController.profile);
// //use passport as a middle to authenticate
// router.post('/login',passport.authenticate(
//                                         'admin',
//                                         {failureRedirect:'/admins/login'}),
//                                         adminController.createSession);
// router.get('/logout',adminController.destroySession);                                        
// router.get('/verify/:email',studentController.verify);

// router.get('/updateProfile',adminController.updateProfile);
// router.post('/updateAdmin',adminController.updateAdmin);

module.exports=router;