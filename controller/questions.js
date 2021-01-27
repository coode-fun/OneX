const Question=require('../models/addquestions');

module.exports.addQuestions=(req,res)=>{
    //render
    let codes=req.params.code.split("$");
    console.log(codes[0],codes[1]);
    // return res.render('admin/add-question');
    Question.find({email:req.user.email,s_code:codes[0],t_code:codes[1]},(err,result)=>{
        if(err){
            return res.render("home/error", {message:"something went wrong in get questionCreate"});
        }else{
            return res.render('admin/add-question',{s_code:codes[0],t_code:codes[1],data:result});
        }
    })
}

module.exports.createQuestions=(req,res)=>{
    //add question to database

    // return res.send(req.params.s_code);
   var obj={
       email:req.user.email,
       orgCode:req.user.orgCode,
       s_code:req.params.s_code,
       t_code:req.params.t_code,
       question:req.body.question,
       option1:req.body.option1,
       option2:req.body.option2,
       option3:req.body.option3,
       option4:req.body.option4,
       answer:req.body.answer,
       explation:req.body.explation
   }
    Question.create(obj,(err,result)=>{
        if(err){
            return res.send(err);
            return res.render('home/error',{message:"Error from question creation"});
        }
        else{
            return res.redirect(`/questions/addQuestions/${req.params.s_code}$${req.params.t_code}`);
        }
    })
    // return res.send('currently Question cannot be added!');
}
