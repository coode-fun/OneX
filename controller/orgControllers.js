
const Admins=require('../models/admins');

module.exports.login = (request, response) =>{
    
    if(request.isAuthenticated()){
        return response.redirect('/orgControllers/addAdmin');
    }
    return response.render('orgController/login.ejs');
}
module.exports.createSession = (request, response) =>{
    
    console.log(request.isAuthenticated());
    return response.redirect('/orgControllers/addAdmin');
}

module.exports.renderAddAdmin = (request, response) =>{
    
    return response.render('orgController/addAdmin');
}

module.exports.logout=async (req,res)=>{

    req.logout();
    return res.redirect('/');

}

module.exports.createAdmin=function(req,res){
    // return res.send(req.body);
    // add user to database
    if(req.body.password!=req.body.re_password){
        return res.render('home/controllerMessage',{message:"password don't match!"});
    }
        console.log(req.body.email);
        Admins.find({email:req.body.email},(err,result)=>{
            if(err){
                console.log("Error in Adding admin");
            }
            console.log(result,"<-----------<");
            if(result.length==0)
            {
                var object={
                    email:req.body.email,
                    password:req.body.password,
                    orgCode:req.body.orgCode,
                    verified:true,
                    identity:'a'+req.body.email
                }
                Admins.create(object,(err,result)=>{
                    if(err)
                    {
                        return res.send(err);
                    }
                    // mailer.newVerification(result);
                    console.log(result);
                    return res.render('home/controllerMessage',{message:"Successfully Added"});
            })
          }
            else
            return res.render('home/controllerMessage',{message:"email is already taken!"});    
    });
}