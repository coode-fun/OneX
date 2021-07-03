const Students=require('../models/students');
const Admins=require('../models/admins');
const subject=require('../models/subject');
const CreatedTest=require('../models/createdtest');
const Enrolled=require('../models/enrolled');
const testSchema=require('../Schema/tests');
const mailer=require('../mailers/verificationMail');
const mongoose=require('mongoose');
const { obj } = require('../Schema/tests');

module.exports.generateResult=async (request, response)=>{

    var enrolledTestId = request.params.enrolledTestId;
    Enrolled.find({_id:enrolledTestId})
    .populate([{
        path: 'test',
        model: 'createdtests',
        select: 'questions'
    }])
    .exec(async (err,result)=>{
        if(err){
           console.log(err);
        }

        var questionArray = result[0].test.questions;
        var answers = result[0].answer.questionOption;
        var correctQuestion = 0;
        var totalQuestions = questionArray.length;

        await questionArray.forEach((question)=>{
            
            var id = String(question._id);
            // id = question._id;
            var ans  = answers.get(id);

            if(ans>=0){
                if(ans == question.answer){
                    correctQuestion++;
                }
            }
        })

        result[0].result.totalQuestion = totalQuestions;
        result[0].result.correct = correctQuestion;
        result[0].marks = correctQuestion;
        result[0].result.remark = "Good, you can do much bettr!";
       
        result[0].save();
        
        return response.redirect('../thankYou/'+enrolledTestId);
    })
    // return response.send("Yes");
}

module.exports.showResult=async (request, response)=>{

    var enrolledTestId = request.params.enrolledTestId;

    console.log(enrolledTestId);

    Enrolled.find({_id:enrolledTestId})
    .populate([
    {
        path: 'test',
        model: 'createdtests',
        select: 't_code'
    },
    {
        path: 'subject',
        model: 'subjects',
        select: 's_name s_code'
    }
    ])
    .exec((err,result)=>{
        if(err){
           console.log(err);
        }
        var percentage = 0;
        var isAttempted = true;
        var total = result[0].result.totalQuestion;
        if(total > 0){
            percentage =  ((result[0].result.correct * 100) / total);
        }else{
            isAttempted =false;
        }
        return response.render("students/result.ejs",{data:result[0], percentage : percentage, isAttempted});
    })
    // return response.render('students/result.ejs');
}
module.exports.thankYou=async (request, response)=>{

    var enrolledTestId = request.params.enrolledTestId;
    Enrolled.find({_id : enrolledTestId},(err, result)=>{
        result[0].isAttempted = true;
        result[0].save();
        
        return response.render('students/thankYou.ejs');
    })
}
module.exports.examsEnrolled=(req,response)=>{

    // var collection=req.user.email;
    // var display_data=[];
    
    // var collection=mongoose.model(collection,testSchema);
    // var mp=req.user.testEnrolled;
    // mp.forEach((value,key)=>{
    //     var code=key.split('$');
    //     var s_code=code[1];
    //     var t_code=code[2];

    //     if(s_code!=="0000"){
                
    //             CreatedTest.find({orgCode:req.user.orgCode,s_code:s_code,t_code:t_code},(err,res)=>{
    //             // console.log("S_code :",s_code);
    //             subject.find({orgCode:req.user.orgCode,s_code:s_code},(err,ress)=>{
                
    //                 Admins.find({email:ress[0].email},(err,result2)=>{
                        
    //                     var display={};
    //                     display.s_name=ress[0].s_name;
    //                     display.a_name=result2[0].name;        
    //                     display.s_code=s_code;
    //                     display.t_code=t_code;
    //                     display.date=res[0].date;
    //                     display.start=res[0].start;
    //                     display.end=res[0].end;
    //                     display.marks=value[0];

    //                     // console.log(display);
    //                     display_data.push(display);
    //                     // console.log(display_data);
    //                 })
    //             });
    //         })
    //     }
    // })
    //Method 3
    Enrolled.find({student:req.user._id})
        .populate([{
            path: 'admin',
            model: 'admins',
            select: 'name'
        },
        {
            path: 'test',
            model: 'createdtests',
            select: 't_code start end date timeout'
        },
        {
            path: 'subject',
            model: 'subjects',
            select: 's_name'
        }
    ])
    .exec((err,result)=>{
        if(err){
           console.log(err);
        }

        return response.render("students/examsEnrolled",{data:result});
    })
    

    // Enrolled.find({orgCode:req.user.orgCode,s_email:req.user.email},(err,result)=>{
    //     if(err){
    //         console.log("Error in exams Enrolled!");
    //     }else{
    //         console.log(result);
    //         if(result.length>0){
    //             result.forEach((obj)=>{
            
    //                 CreatedTest.find({orgCode:req.user.orgCode,s_code:obj.s_code,t_code:obj.t_code},(err,res)=>{
                        
    //                     subject.find({orgCode:req.user.orgCode,s_code:obj.s_code},(err,ress)=>{
                           
    //                         Admins.find({email:ress[0].email},(err,result2)=>{
                                
    //                             var display={};
    //                             display.s_name=ress[0].s_name;
    //                             display.a_name=result2[0].name;        
    //                             display.s_code=obj.s_code;
    //                             display.t_code=obj.t_code;
    //                             display.date=res[0].date;
    //                             display.start=res[0].start;
    //                             display.end=res[0].end;
    //                             display.marks=obj.marks;
    //                             // console.log(display);
    //                             display_data.push(display);
    //                             // console.log(display_data);
    //                         })
    //                     });
    //                 })
    //             })
    //         }
            
    //     }
    // })
    
    // setTimeout(()=>{
    //     console.log(display_data,"----->");
    //     return response.render("students/examsEnrolled",{data:result});
    //     },3000);
}

module.exports.testEnroll=(req,response)=>{

    // var collection=req.user.email;
    // console.log(collection);
    // var collection=mongoose.model(collection,testSchema);

    //Method2
    //----------------------------------------------------
    const parameter=req.params.code.split('$');
    // console.log(parameter);
    // const parameter=req.params.code;
    // const params=req.user.orgCode+'$'+req.params.code;
    
    // console.log(params);
    // req.user.testEnrolled.set(params,["-1"]);
    // req.user.save();

    var object={
        orgCode:req.user.orgCode,
        student:req.user._id,
        subject:parameter[1],
        test:parameter[2],
        admin:parameter[0]
    };

        // console.log(object);
            Enrolled.create(object,(err,res)=>{
                if(err){
                    console.log("Error in inserting in enrolled table");
                    return response.json(err);
                }else{
                    // console.log(res);
                }
            })

    // const arr=[{
    //     ques1:"Question1",
    //     opt1:"Option1",
    //     exp1:"Explation1"
    // },
    // {
    //     ques2:"Question2",
    //     opt2:"Option2",
    //     exp2:"Explation2"
    // }
    // ];

    // const book=new collection({
    //     s_code:params[0],
    //     t_code:params[1],
    //     enrolled:true
    // });
    // book.save();
    
    setTimeout(()=>{
        // console.log(display_data);
        return response.redirect('/students/sprofile');
        },600);
    
}

module.exports.upcomingExams=async (req,res)=>{
    //render
    CreatedTest.find({orgCode:req.user.orgCode,$or: [{ department:req.user.department }, {department:'Open'},{department:'General'}]})
    .populate([{
            path: 'admin',
            model: 'admins',
            select: 'name'
        },
        {
            path: 'subject',
            model: 'subjects',
            select: 's_name'

        }
    ])
    .exec(async (err,result)=>{

        var enrolled=[];
        
        //checking weather candidate is enrolled or not 
        await result.forEach(async (obj)=>{

            //         // Method3
            //         //--------------------------------------------------
                    
                       Enrolled.find({test:obj._id, student : req.user._id},(err,ress)=>{
                        
                        console.log(" res.length ",ress.length);
                        if(ress.length===0){
                            enrolled.push(false);
                        }else{
                            enrolled.push(true);
                        }
                    })
        })
        setTimeout(()=>{
            console.log("enrolled: ",result);
            return res.render('students/upcomingExams',{data:result,enroll:enrolled});
        },1000);
        
        // return res.json(result);
    })


    // await CreatedTest.find({orgCode:req.user.orgCode,$or: [{ department:req.user.department }, {department:'Open'},{department:'General'}]},async (err,result)=>{
    //    if(err){console.log(err);}
    //     var enrolled=[];
        
    //     //checking weather candidate is enrolled or not 
        
    //     await result.forEach(async (obj)=>{

    //         // Method3
    //         //--------------------------------------------------
            
    //            Enrolled.find({a_email:obj.email,s_code:obj.s_code,t_code:obj.t_code},(err,ress)=>{
                
    //             console.log("res.length ",ress.length);
    //             if(ress.length===0){
    //                 enrolled.push(false);
    //             }else{
    //                 enrolled.push(true);
    //             }
    //         })

    //         //Method 2
    //         //-------------------------------------------------
    //         //  var code=req.user.orgCode+"$"+obj.s_code+"$"+obj.t_code;
    //         //  console.log(req.user.testEnrolled);
    //         // if(req.user.testEnrolled.get(code)){
    //         //     enrolled.push(true)
    //         // }else{
    //         //     enrolled.push(false);
    //         // }

    //         // Method1
    //         //-----------------------------------
    //         // var collection=req.user.email;
            
    //         // var collection=mongoose.model(collection,testSchema);
    //         //    collection.find({s_code:obj.s_code,t_code:obj.t_code},(err,result)=>{
                
    //         //     console.log("res.length ",result.length);
    //         //     if(result.length===0){
    //         //         enrolled.push(false);
    //         //     }else{
    //         //         enrolled.push(true);
    //         //     }
    //         // })

    //     })
    //     setTimeout(()=>{
    //     console.log("enrolled: ",enrolled);
    //     return res.render('students/upcomingExams',{data:result,enroll:enrolled});
    //     },1000);
    // })
}
module.exports.updateProfile=(request, response)=>{
    console.log(request.body);

    
    // var object={
    //     name:req.body.name,
    //     phone:req.body.mobile,
    //     department:req.body.department,
    //     address:req.body.address,
    //     collage_name:req.body.collagename,
    //     designation:req.body.designation,
    //     qualification:req.body.qualification
    // }
    Students.updateOne({email:request.user.email},{$set: request.body},(err,result)=>{
               if(err){
                console.log("Error while updation!!");
              }else{
                //   console.log(result);
                  return response.redirect('/students/sprofile');

              }
    })

}
module.exports.details=(req,res)=>{
    //render
        
    return res.render('students/details');
}
module.exports.login=(req,res)=>{
        //renderlogin page
        if(req.isAuthenticated()){
            return res.redirect('/students/sprofile');
        }
        return res.render('students/login',{message:""});
}

//when login failed due to wrong email or passport
module.exports.loginfailed=(req,res)=>{
    //renderlogin page
    if(req.isAuthenticated()){
        return res.redirect('/students/sprofile');
    }
    return res.render('students/login',{message:"email and password don't match!"});
}

module.exports.loggedin=(req,res)=>{
    return res.send(req.body);
}
module.exports.register=(req,res)=>{
    //render registeration page
    
    if(req.isAuthenticated()){
        return res.redirect('/students/sprofile');
    }
    return res.render('students/register',{message:""});
}

module.exports.profile=(req,res)=>{
    return res.render('students/profile.ejs');
}

module.exports.verification=(req,res)=>{
    //render the successfully registerd page
    return res.render('students/verificationMessage');
}

//verification of user by email
module.exports.verify=function(req,res){
    var email=req.params.email;
    console.log(email,"-------------------->");

    Students.updateOne({email:email}, {$set: { verified:true }}, 
        function(err){
            if(err){
                console.log("Did not verified.");
                return res.send("error in email varification")
            }
            else{                
                //create email model for test
                //
                console.log("Successfully verified!!");
                return res.redirect('/students/login');
            }
        })
}

module.exports.createStudent=function(req,res){
    // return res.send(req.body);
    // add user to database
    if(req.body.password!=req.body.re_password){
        return res.render('students/register',{message:"password don't match!"});
    }
        console.log(req.body.email);
        Students.find({email:req.body.email},(err,result)=>{
            console.log(result,"<-----------<");
            if(result.length==0)
            {
                var object={
                    name:req.body.name,
                    orgCode:req.body.orgCode,
                    email:req.body.email,
                    enrollment:req.body.enrollment,
                    department:req.body.department,
                    password:req.body.password,
                    identity:'s'+req.body.email,
                    year:req.body.year
                }
                
                Students.create(object,(err,result)=>{
                    if(err)
                    {
                        return res.send(err);
                    }
                    mailer.newVerification(result);
                    console.log(result);
                    return res.redirect('/students/verification');
            })
        }
            else
            return res.render('students/register',{message:"email is already taken!"});    
    });
}

module.exports.createSession=(req,res)=>{
    if(!req.user.verified){
        req.logout();
        return res.send("Email is not verified");
    }
    //create session using passport
    console.log("success-------->",req.user);
    return res.redirect('/students/sprofile');
}

module.exports.destroySession=(req,res)=>{
    //
    req.logout();
    return res.redirect('/');

}