
const questionController=require('../controller/questions')

//add question page render
router.get('/addQuestions',questionController.addQuestions);
router.post('/addQuestions',questionController.createQuestions);