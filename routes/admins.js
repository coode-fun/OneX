const express=require('express');
const router=express.Router();
const passport=require('passport');

const adminController=require('../controller/admins');

router.get('/login',adminController.login);
// router.post('/login',studentController.loggedin);
// router.get('/log-in',studentController.loginfailed);
// router.get('/register',studentController.register);
// router.post('/register',studentController.createStudent);
// router.get('/verification',studentController.verification);
router.get('/profile',passport.checkAuthentication,adminController.profile);

// //use passport as a middle to authenticate
router.post('/login',passport.authenticate(
                                        'admin',
                                        {failureRedirect:'/admins/login'}),
                                        adminController.createSession);
                                        
router.get('/logout',adminController.destroySession);                                        
// router.get('/verify/:email',studentController.verify);

router.get('/updateProfile',adminController.updateProfile);
router.post('/updateAdmin',adminController.updateAdmin);
router.get('/createdTest',adminController.createdTest);
module.exports=router;