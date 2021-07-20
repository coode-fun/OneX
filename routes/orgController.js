const express=require('express');
const router=express.Router();
const passport = require('passport');
const orgControllersController=require('../controller/orgControllers');


var orgControllerMiddleware = (request, response, next)=>{
    if(request.isAuthenticated()){
        if(request.user.identity[0] == 'c'){
            return next();
        }else{
            return response.redirect('/');
        }
    }else{
        return response.redirect('/');
    }
   
}
router.post('/login',passport.authenticate('orgcontroller', {failureRedirect:'/orgControllers/login'}),passport.setAuthenticatedUser, orgControllersController.createSession);
router.get('/login', orgControllersController.login);
router.get('/logout', orgControllersController.logout);
router.post('/addAdmin', orgControllerMiddleware, orgControllersController.createAdmin);
router.get('/addAdmin', orgControllerMiddleware, orgControllersController.renderAddAdmin);

module.exports=router;