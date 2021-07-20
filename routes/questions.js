const express=require('express');
const router=express.Router();

const questionController=require('../controller/questions')


var adminMiddleware = (request, response, next)=>{
    if(request.isAuthenticated()){
        if(request.user.identity[0] == 'a'){
            return next();
        }
    }
    return response.redirect('/');
}

//add question page render
router.get('/addQuestions/:code',adminMiddleware, questionController.addQuestions);
router.post('/addQuestions/:t_code',adminMiddleware, questionController.createQuestions);
router.get('/deleteQuestions/:code',adminMiddleware, questionController.deleteQuestions);


//getQuestion by testid and questionNumber
router.get('/getQuestion/:testId',adminMiddleware, questionController.getQuestion);
// Edit question
router.post('/editQuestion/:testId',adminMiddleware, questionController.editQuestion);

module.exports=router;