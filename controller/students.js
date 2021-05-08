const Students=require('../models/students');
const Admins=require('../models/admins');
const subject=require('../models/subject');
const CreatedTest=require('../models/createdtest');
const testSchema=require('../Schema/tests');
const mailer=require('../mailers/verificationMail');
const mongoose=require('mongoose');
const { obj } = require('../Schema/tests');

module.exports.examsEnrolled=(req,response)=>{

    // var collection=req.user.email;
    var display_data=[];
    
    // var collection=mongoose.model(collection,testSchema);
    var mp=req.user.testEnrolled;
    mp.forEach((value,key)=>{
        var code=key.split('$');
        var s_code=code[1];
        var t_code=code[2];
        if(s_code!=="0000"){
                
                CreatedTest.find({orgCode:req.user.orgCode,s_code:s_code,t_code:t_code},(err,res)=>{
                            // console.log("S_code :",s_code);
                subject.find({orgCode:req.user.orgCode,s_code:s_code},(err,ress)=>{
                
                    Admins.find({email:ress[0].email},(err,result2)=>{
                        
                        var display={};
                        display.s_name=ress[0].s_name;
                        display.a_name=result2[0].name;        
                        display.s_code=s_code;
                        display.t_code=t_code;
                        display.date=res[0].date;
                        display.start=res[0].start;
                        display.end=res[0].end;

                        // console.log(display);
                        display_data.push(display);
                        // console.log(display_data);
                    })
                });
            })
        }
        
    })
    
    setTimeout(()=>{
        // console.log(display_data);
        return response.render("students/examsEnrolled",{data:display_data});
        },1000);
    // collection.find({},(err,result)=>{
    //     if(err){
    //         console.log("Error in exams Enrolled!");
    //     }else{
    //         if(result.length>0){
    //             result.forEach((obj)=>{
            
                    // CreatedTest.find({orgCode:req.user.orgCode,s_code:obj.s_code,t_code:obj.t_code},(err,res)=>{
                        
                    //     subject.find({orgCode:req.user.orgCode,s_code:obj.s_code},(err,ress)=>{
                           
                    //         Admins.find({email:ress[0].email},(err,result2)=>{
                                
                    //             var display={};
                    //             display.s_name=ress[0].s_name;
                    //             display.a_name=result2[0].name;        
                    //             display.s_code=obj.s_code;
                    //             display.t_code=obj.t_code;
                    //             display.date=res[0].date;
                    //             display.start=res[0].start;
                    //             display.end=res[0].end;

                    //             // console.log(display);
                    //             display_data.push(display);
                    //             // console.log(display_data);
                    //         })
                    //     });
                    // })
            //     })
            // }
            
    //     }
    // })
}

module.exports.testEnroll=(req,res)=>{

    // var collection=req.user.email;
    // console.log(collection);
    // var collection=mongoose.model(collection,testSchema);
    const params=req.user.orgCode+'$'+req.params.code;
    
    console.log(params);
    req.user.testEnrolled.set(params,[]);
    req.user.save();
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
    return res.redirect('/students/sprofile');
}

module.exports.upcomingExams=async (req,res)=>{
    //render
    await CreatedTest.find({orgCode:req.user.orgCode,$or: [{ department:req.user.department }, {department:'Open'},{department:'General'}]},async (err,result)=>{
       if(err){console.log(err);}
        var enrolled=[];
        
        //checking weather candidate is enrolled or not 
        
        await result.forEach(async (obj)=>{
           var code=req.user.orgCode+"$"+obj.s_code+"$"+obj.t_code;
        //    console.log(req.user.testEnrolled);
            if(req.user.testEnrolled.get(code)){
                enrolled.push(true)
            }else{
                enrolled.push(false);
            }

            // var collection=req.user.email;
            
            // var collection=mongoose.model(collection,testSchema);
            //    collection.find({s_code:obj.s_code,t_code:obj.t_code},(err,result)=>{
                
            //     console.log("res.length ",result.length);
            //     if(result.length===0){
            //         enrolled.push(false);
            //     }else{
            //         enrolled.push(true);
            //     }
            // })
        })
        setTimeout(()=>{
        console.log("enrolled: ",enrolled);
        return res.render('students/upcomingExams',{data:result,enroll:enrolled});
        },1000);
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
                    // mailer.newVerification(result);
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