const express=require('express');
const router=express.Router();

const dynamicTestController=require('../controller/dynamicStudentTestModel')

//add question page render

router.get('/studentModel',dynamicTestController.studentModel);
// router.post('/addQuestions/:s_code/:t_code',questionController.createQuestions);

module.exports=router;