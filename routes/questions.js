const express=require('express');
const router=express.Router();

const questionController=require('../controller/questions')

//add question page render
router.get('/addQuestions/:code',questionController.addQuestions);
router.post('/addQuestions/:t_code',questionController.createQuestions);
router.get('/deleteQuestions/:code',questionController.deleteQuestions);


//getQuestion by testid and questionNumber
router.get('/getQuestion/:testId', questionController.getQuestion);
// Edit question
router.post('/editQuestion/:testId',questionController.editQuestion);

module.exports=router;