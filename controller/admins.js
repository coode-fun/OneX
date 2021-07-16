const Admin=require('../models/admins');
const CreatedTest=require('../models/createdtest');
const mailer=require('../mailers/verificationMail');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');

module.exports.login=(req,res)=>{
        //renderlogin page
        if(req.isAuthenticated()){
            return res.redirect('/admins/profile');
        }
        return res.render('admin/login.ejs');
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

//rebdering admin profile page
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

//updating admin profile
module.exports.updateAdmin=function(req,res){
    // return res.send(req.body);
    // add user to database
        console.log(req.user.email);

      var object={
                    name:req.body.name,
                    phone:req.body.mobile,
                    department:req.body.department,
                    address:req.body.address,
                    collage_name:req.body.collagename,
                    designation:req.body.designation,
                    qualification:req.body.qualification
                }
                Admin.updateOne({email:req.user.email},{$set: object},
                    (err)=>{ if(err){
                            console.log("Error while updation!!");
                          }
                })
        return res.redirect('/admins/profile');
}

module.exports.createSession=(req,res)=>{
    if(!req.user.verified){
        req.logout();
        return res.send("Email is not verified");
    }
    //create session using passport
    console.log("success-------->",req.user);
    return res.redirect('/admins/profile');
}

module.exports.updateProfile=(req,res)=>{
    return res.render('admin/update-profile.ejs');
}

module.exports.destroySession=(req,res)=>{
    //
    req.logout();
    return res.redirect('/');
}

module.exports.createdTest=(req,res)=>{

    CreatedTest.find({email:req.user.email},(err,result)=>{
        if(err){
            return res.render('home/error',{message:"something went wrong"})
        }else{
            console.log(result);
            return res.render('admin/created-test',{data:result});
        }
    })

}


// render reset Password
module.exports.renderResetPassword=(request, response)=>{

    return response.render('admin/resetPassword');
}

module.exports.resetPasswordRequest = async (req, res) => {

let email = req.body.email;
console.log(email)

Admin.find({email : email}, async (err, verified) => {
    if(verified.length == 0){
        // throw new Error('No user with provided email found');  //---------------------------------------------------------------render
        return res.json("No user of of this email "+ email+" exists !");
    }
    
    let token = crypto.randomBytes(31).toString('hex');
    let expired = Date.now() + 3600000 ; //valid for one day

    console.log(token);
    try{
        mailer.resetAdminPasswordMail(email, token);
        await Admin.updateOne( {email:email}, {$set: { token : token, expired : expired}} );
        return res.json("Check your inbox and reset your password!!") //---------------------------------------render
    }catch(err){
        console.log("error in resetting password!");
        throw err; //---------------------------------------------------------------render
    }
})
}

module.exports.renderNewPasswordRequest = async (request, response) => {

let token = request.query.token;
console.log(token);
return response.render('admin/newPassword',{token:token}); //---------------------------------------render
}

module.exports.setNewPasswordRequest = async (req, res) => {

let body = req.body;
let token = body.token;
let password = body.password;
let confirmPassword = body.confirmPassword;

console.log(token, password, confirmPassword);

if(password !== confirmPassword){
    console.log('During reset, Password dont match');
    return res.redirect('back');
}

Admin.find({token : token}, async (err, onMatch) => {
    if(err){
        throw err
        //---------------------------------------render
    }

    if(onMatch.length == 0){
        throw new Error('verification error, incorrect token');//---------------------------------------render
    }

    console.log(onMatch);

    // TODO
    // let hashedPassword = await bcrypt.hash(password, 13);

    if(onMatch[0].expired >= Date.now()){
        try{
            await Admin.updateOne( {token : token}, {$set : {password : password}} );
            return res.redirect('./login'); //return { result : 'success'}; //---------------------------------------render
        }catch(err){
            throw err ;//---------------------------------------render
        }
    }else{
        throw new Error('token expired');//---------------------------------------render
    }
})
}