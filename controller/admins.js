const Admin=require('../models/admins');
// const mailer=require('../mailers/verificationMail');

module.exports.login=(req,res)=>{
        //renderlogin page
        if(req.isAuthenticated()){
            return res.redirect('/admins/profile');
        }
        return res.render('admin/login');
}

//when login failed due to wrong email or passport
// module.exports.loginfailed=(req,res)=>{
//     //renderlogin page
//     if(req.isAuthenticated()){
//         return res.redirect('/students/profile');
//     }
//     return res.render('students/login',{message:"email and password don't match!"});
// }

// module.exports.loggedin=(req,res)=>{
//     return res.send(req.body);
// }
// module.exports.register=(req,res)=>{
//     //render registeration page
    
//     if(req.isAuthenticated()){
//         return res.redirect('/students/profile');
//     }
//     return res.render('students/register',{message:""});
// }

module.exports.profile=(req,res)=>{
    return res.render('admin/profile.ejs');
}

// module.exports.verification=(req,res)=>{
//     //render the successfully registerd page
//     return res.render('students/verificationMessage');
// }

//verification of user by email
// module.exports.verify=function(req,res){
//     var email=req.params.email;
//     console.log(email,"-------------------->");

//     Students.updateOne({email:email}, {$set: { verified:true }}, 
//         function(err){
//             if(err){
//                 console.log("Did not verified.");
//                 return res.send("error in email varification")
//             }
//             else{                
//                 console.log("Successfully verified!!");
//                 return res.redirect('/students/login');
//             }
//         })
// }

// module.exports.createStudent=function(req,res){
//     // return res.send(req.body);
//     // add user to database
//     if(req.body.password!=req.body.re_password){
//         return res.render('students/register',{message:"password don't match!"});
//     }
//         console.log(req.body.email);
//         Students.find({email:req.body.email},(err,result)=>{
//             console.log(result,"<-----------<");
//             if(result.length==0)
//             {
//                 var object={
//                     name:req.body.name,
//                     email:req.body.email,
//                     enrollment:req.body.enrollment,
//                     department:req.body.department,
//                     password:req.body.password,
//                     identity:'s'+req.body.email
//                 }
//                 Students.create(object,(err,result)=>{
//                     if(err)
//                     {
//                         return res.send(err);
//                     }
//                     mailer.newVerification(result);
//                     console.log(result);
//                     return res.redirect('/students/verification');
//             })
//         }
//             else
//             return res.render('students/register',{message:"email is already taken!"});    
//     });
// }

module.exports.createSession=(req,res)=>{
    if(!req.user.verified){
        req.logout();
        return res.send("Email is not verified");
    }
    //create session using passport
    console.log("success-------->",req.user);
    return res.redirect('/admins/profile');
}

module.exports.destroySession=(req,res)=>{
    //
    req.logout();
    return res.redirect('/');
}