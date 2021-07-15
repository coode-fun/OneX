
const Subject=require('../models/subject');
const CreatedTest=require('../models/createdtest');
const Enrolled=require('../models/enrolled');
const Student=require('../models/students');

module.exports.updateMarks=async (request,response)=>{
    
    console.log(request.params.code);
    var codes=request.params.code.split('$');
    const query = {s_email:request.user.email,s_code:codes[0],t_code:codes[1]};
    const updateDocument = {
      $set: { "marks": codes[2] }
    };
    console.log(updateDocument);
    const result = await Enrolled.updateOne(query,updateDocument);
    //  console.log(result);
    var key=request.user.orgCode+'$'+codes[0]+'$'+codes[1];
    console.log(key);
    var arr=[codes[2]];
    request.user.testEnrolled.set(key,arr);
    request.user.save();
    // var qry={email:request.user.email}
    // Student.updateOne()
     return response.sendStatus(200);
}

module.exports.addSubject=function(req,res){
    //render
    Subject.find({admin:req.user._id},(err,result)=>{
        if(err){        
            return res.render('home/error',{message:"Error from addSubject "});
        }else{
            return res.render('admin/add-subject',{data:result});
        }
    })   
}

module.exports.createSubject=function(req,res){
    //add subject to models
    console.log(req.body,"from addsubjet");
    Subject.findOne({admin:req.user._id,s_code:req.body.s_code},(err,result)=>{
        if(err){
            return res.send("Subject cannot be added.");
        }
        console.log(result);
        if(!result){
            Subject.create({orgCode:req.user.orgCode,admin:req.user._id,s_name:req.body.s_name,s_code:req.body.s_code},(err,result)=>{
                if(err){
                    
                   return res.status(400).render('home/error',{message:"Error in adding subject"});
                }
                console.log("Successfully added!");
                return res.redirect('/tests/addSubject');
            })
        }else{
            return res.send("Subject code already exist,cannot be added.");
        }
    })
}

module.exports.addTest=(req,res)=>{
    //render
    CreatedTest.find({admin:req.user._id,subject:req.params.s_code},(err,result)=>{
        if(err){        
            return res.render('home/error',{message:"Error from addSubject "});
        }else{
            // return res.render('admin/add-subject',{data:result});
            return res.render('admin/create-test',{subject_id:req.params.s_code,data:result});
        }
    })  
}

module.exports.createTest=(req,res)=>{
    //add test in database
    // console.log(req.params.s_code,req.params.t_code);
    // res.json(req.body);
    var obj={
        orgCode:req.user.orgCode,
        admin:req.user._id,
        subject:req.params.s_code,
        t_code:req.body.t_code,
        department:req.body.department,
        year:req.body.year,
        start:req.body.start,
        end:req.body.end,
        date:req.body.date
    }
    // console.log(obj);
    CreatedTest.findOne({admin:req.user._id,subject:req.params.s_code, t_code:req.body.t_code},(err,result)=>{
        if(err){
            return  res.render('home/error',{message:err});
        }
        if(result){
            return res.render('home/error',{message:"Test with this id already exist"});
        }
        CreatedTest.create(obj,(err,result)=>{
            if(err){
                return res.send(err);
                // return res.render('home/error',{message:"Error from creating test"});
            }
            //This is wrong redirection
            return res.redirect(`/tests/createTest/${req.params.s_code}`);
            // return res.redirect(`/tests/addTest/${req.params.s_code}`);
        })
    })
    // return res.send("create test doesnt exits");
}
module.exports.deleteTest=(req,res)=>{

    CreatedTest.deleteOne({_id:req.params.t_code},(err)=>{
        if(err){
            return res.render('home/error',{message:"Error in deletion"});
        }else{
            // return res.redirect(`/tests/createTest/${req.params.s_code}`);
            return res.redirect('back');
        }
    });
}

module.exports.deleteSubject=(req,res)=>{
    //delete subject by id
    let s_code=req.params;
    console.log(s_code);
    Subject.deleteOne({admin:req.user._id,s_code:s_code.s_code},(err)=>{
        if(err){
            return res.render('home/error',{message:"Error in deletion"});
        }else{
            return res.redirect('/tests/addSubject');
        }
    });
}

//add questions

//render test instructions
module.exports.startTest=(req,res)=>{
    // console.log(req.params,"------------ ");
    var code=req.params.param;
    Enrolled.find({_id:code})
    .populate([{
        path: 'admin',
        model: 'admins',
        select: 'name'
    }])
    .exec((err,result)=>{
        return res.render('students/startTest.ejs',{data:result[0]});
    })
}
module.exports.quiz=(req,res)=>{
    // console.log(req.params);

    Enrolled.find({_id:req.params.param})
    .populate([{
        path: 'test',
        model: 'createdtests',
        select: 'questions end date'
    }])
    .exec((err,result)=>{
        // console.log(result[0].test.questions,"88888");
        // console.log(result[0].test.end,"88888");
        // console.log(result[0].test.date,"88888");
        console.log(result[0]);
        var timer = result[0].test.date + 'T' + result[0].test.end +':00.000Z';
        console.log(timer);
        return res.render('students/mcq.ejs',{data:result[0],time : timer });
    })

    // var code=req.params.param.split('$');
    // console.log(code[0],code[1]);
    // var quiz;
    // CreatedTest.find({orgCode:req.user.orgCode,s_code:code[0],t_code:code[1]},(err,result)=>{
    //     if(err){
    //         console.log("Error in finding questions");
    //     }else{
    //         // console.log(result[0]);
    //         quiz=result[0].questions;
    //         // console.log(quiz);
    //         return res.render('students/mcq.ejs',{data:quiz,s_code:code[0],t_code:code[1]});
    //     }
    // })
    
}

module.exports.saveAnswer=(request, response)=>{
    // console.log(request.body);
    
    Enrolled.find({_id:request.body.enrolledTestId},(err,result)=>{
        
        // console.log(result);
        console.log(typeof(request.body.questionId));
        result[0].counter = request.body.counter;
        result[0].answer.questionOption.set(request.body.questionId, request.body.optionSelected);
        result[0].answer.isAttempted.set(request.body.questionId, true);
        result[0].answer.explanation.set(request.body.questionId, "Currently No explanation");

        // console.log(result);
        // console.log(result[0].answer);
        result[0].save();
    
    })
    .then((result)=>{
        response.json({message :"success"});
    })

}

module.exports.feedback=(request, response)=>{
    return response.render('home/feedback.ejs',{message:" You have successfully completed the test!"});
}