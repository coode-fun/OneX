
const Subject=require('../models/subject');
const CreatedTest=require('../models/createdtest');

module.exports.addSubject=function(req,res){
    //render
    Subject.find({email:req.user.email},(err,result)=>{
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
    Subject.findOne({email:req.user.email,s_code:req.body.s_code},(err,result)=>{
        if(err){
            return res.send("Subject cannot be added.");
        }
        console.log(result);
        if(!result){
            Subject.create({email:req.user.email,s_name:req.body.s_name,s_code:req.body.s_code},(err,result)=>{
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
    CreatedTest.find({email:req.user.email,s_code:req.params.s_code},(err,result)=>{
        if(err){        
            return res.render('home/error',{message:"Error from addSubject "});
        }else{
            // return res.render('admin/add-subject',{data:result});
            return res.render('admin/create-test',{s_code:req.params.s_code,data:result});
        }
    })  
}

module.exports.createTest=(req,res)=>{
    //add test in database
    // console.log(req.params.s_code,req.params.t_code);
    var obj={
        email:req.user.email,
        s_code:req.params.s_code,
        t_code:req.body.t_code,
        department:req.body.department,
        year:req.body.year,
        start:req.body.start,
        end:req.body.end,
        date:req.body.date
    }
    console.log(obj);
    CreatedTest.findOne({email:req.user.email,s_code:req.params.s_code, t_code:req.body.t_code},(err,result)=>{
        if(err){
            return  res.render('home/error',{message:"something went wrong"});
        }
        if(result){
            return res.render('home/error',{message:"Test with this id already exist"});
        }
        CreatedTest.create(obj,(err,result)=>{
            if(err){
                return res.send(err);
                // return res.render('home/error',{message:"Error from creating test"});
            }
            return res.redirect(`/tests/createTest/${req.params.s_code}`);
        })
    })
    // return res.send("create test doesnt exits");
}
module.exports.deleteTest=(req,res)=>{

    CreatedTest.deleteOne({email:req.user.email,s_code:req.params.s_code,t_code:req.params.t_code},(err)=>{
        if(err){
            return res.render('home/error',{message:"Error in deletion"});
        }else{
            return res.redirect(`/tests/createTest/${req.params.s_code}`);
        }
    });
}

module.exports.deleteSubject=(req,res)=>{
    //delete subject by id
    let s_code=req.params;
    console.log(s_code);
    Subject.deleteOne({email:req.user.email,s_code},(err)=>{
        if(err){
            return res.render('home/error',{message:"Error in deletion"});
        }else{
            return res.redirect('/tests/addSubject');
        }
    });
}