// const Users=require('../models/users');
// const mailer=require('../mailers/comment');

module.exports.login=(req,res)=>{
        //renderlogin page
        // if(req.isAuthenticated()){
        //     return res.redirect('/books/booklist');
        // }
        return res.render('students/login');
        
}
module.exports.loggedin=(req,res)=>{
    return res.send(req.body);
}
// module.exports.register=(req,res)=>{
//     //render registeration page
    
//     if(req.isAuthenticated()){
//         return res.redirect('/books/booklist');
//     }
//     return res.render('register');
// }
// //verification of user by email
// module.exports.verify=function(req,res){
//     var email=req.params.email;
//     console.log(email,"-------------------->");

//     Users.updateOne({email:email}, {$set: { verified:true }}, 
//         function(err){
//             if(err){
//                 console.log("Did not verified.");
//                 return res.send("errot in email varification")
//             }
//             else{                
//             console.log("Successfully verified!!");
//             return res.redirect('/users/login');
//             }
//         })
// }

// module.exports.createUser=function(req,res){

//     //add user to database
//     if(req.body.password!=req.body.re_password){
//         return res.redirect('back');
//     }
//         console.log(req.body.email);
//         Users.find({email:req.body.email},(err,result)=>{
//             console.log(result);
//             if(result.length==0)
//             {
//                 Users.create(req.body,(err,result)=>{
//                     if(err)
//                     {
//                         return res.send("Error!!");
//                     }
//                     mailer.newComment(result);
//                     console.log(result);
//                 })
//             }
//            return res.redirect('./login');    
//         });
// }

// module.exports.createSession=(req,res)=>{
//     if(!req.user.verified){
//         req.logout();
//         return res.send("Email is not verified");
//     }
//     //create session using passport
//     console.log(req.user);
//     return res.redirect('../books/booklist');
// }

// module.exports.destroySession=(req,res)=>{
//     //
//     req.logout();
//     return res.redirect('/home');
// }
