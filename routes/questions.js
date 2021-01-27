const express=require('express');
const router=express.Router();

const questionController=require('../controller/questions')

//add question page render
router.get('/addQuestions/:code',questionController.addQuestions);
router.post('/addQuestions/:s_code/:t_code',questionController.createQuestions);

module.exports=router;