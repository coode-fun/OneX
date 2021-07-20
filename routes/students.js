const express=require('express');
const router=express.Router();
const passport=require('passport');

const pdfController = require('../controller/pdf');
const studentController=require('../controller/students');


var studentMiddleware = (request, response, next)=>{
    if(request.isAuthenticated()){
        if(request.user.identity[0] == 's'){
           return  next();
        }
    }
    return response.redirect('/');
}

router.get('/login',studentController.login);
// router.post('/login',studentController.loggedin);
router.get('/log-in', studentController.loginfailed);
router.get('/register', studentController.register);
router.post('/register', studentController.createStudent);
router.get('/verification', studentController.verification);
router.get('/sprofile', passport.checkAuthentication, studentController.profile);

router.get('/details',studentMiddleware, studentController.details);
router.post('/updateProfile', studentMiddleware, studentController.updateProfile);

router.get('/upcomingExams', studentMiddleware, studentController.upcomingExams);
router.get('/examsEnrolled',studentMiddleware, studentController.examsEnrolled);
// use passport as a middle to authenticate
router.post('/slogin',passport.authenticate(
                                        'student',
                                        {failureRedirect:'/students/log-in'}),
                                        studentController.createSession);
router.get('/logout', studentController.destroySession);                                        
router.get('/verify/:email', studentController.verify);
router.get('/testEnroll/:code', studentMiddleware, studentController.testEnroll);

// thankyou page after giving test
router.get('/thankYou/:enrolledTestId', studentMiddleware, studentController.thankYou);

// Test result
router.get('/showResult/:enrolledTestId',studentMiddleware, studentController.showResult);
router.get('/generateResult/:enrolledTestId', studentMiddleware, studentController.generateResult);

// Forgot Password
router.get('/resetPassword', studentController.renderResetPassword);
router.post('/resetPassword', studentController.resetPasswordRequest);
router.get('/setNewPassword', studentController.renderNewPasswordRequest);
router.post('/setNewPassword', studentController.setNewPasswordRequest);

//Generate PDF
router.get('/generatePDF/:subjectTestCode',studentMiddleware,  pdfController.generatePDF);

module.exports=router;