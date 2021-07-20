const express=require('express');
const router=express.Router();
const passport=require('passport');

const testController=require('../controller/tests');

var adminMiddleware = (request, response, next)=>{
    if(request.isAuthenticated()){
        if(request.user.identity[0] == 'a'){
            return next();
        }
    }
    return response.redirect('/');
}
var studentMiddleware = (request, response, next)=>{
    if(request.isAuthenticated()){
        if(request.user.identity[0] == 's'){
           return next();
        }
    }
    return response.redirect('/');
}
//update marks
router.get('/updateMarks/:code', testController.updateMarks);

//adding subject
router.get('/addSubject', adminMiddleware,  testController.addSubject);
router.post('/addSubject', adminMiddleware,  testController.createSubject);
router.get('/deleteSubject/:s_code', adminMiddleware,    testController.deleteSubject);
router.get('/getSubject/:subjectId',adminMiddleware,  testController.getSubjectById);
router.post('/editSubject',adminMiddleware,  testController.editSubjectById);

//adding test
router.get('/createTest/:s_code', adminMiddleware, testController.addTest);
router.post('/createTest/:s_code', adminMiddleware, testController.createTest);
router.get('/deleteTest/:t_code',adminMiddleware,  testController.deleteTest);

// getTestById
router.get('/getTest/:testId',adminMiddleware,  testController.getTestById);
router.post('/editTest', adminMiddleware, testController.editTestById);
//take test
router.get('/startTest/:param', studentMiddleware, testController.startTest);
router.get('/quiz/:param', studentMiddleware, testController.quiz);

// Save answer of each question
router.post('/saveAnswer', studentMiddleware, testController.saveAnswer);

// feedback 
router.post('/feedback',testController.feedback);


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