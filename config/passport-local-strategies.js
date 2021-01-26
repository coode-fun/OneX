const passport=require('passport');

const LocalStrategy=require('passport-local').Strategy;
const Student=require('../models/students');
const Admin=require('../models/admins');


passport.use('student',new LocalStrategy({
    usernameField:'email',
    passReqToCallback:true//for adding 'req' arg to function
    },
    function(req,email,password,done){
        //find a user and establish the identity
        if(req.path[1]==='s')
        email='s'+email;

        Student.findOne({identity:email},(err,user)=>{
            
            if(err){
                console.log('Error in finding user ====>passport');
                return done(err);
            }
            
            // console.log('------------------>');
            // console.log(user);
            // console.log('------------------->')
            if(!user||user.password!=password){
                console.log("Invalid Useranme/Password");
                return done(null,false);
            }
            //user successfully authenticated
            return done(null,user);
        })
    }
    ));

    //admin
    passport.use('admin',new LocalStrategy({
        usernameField:'email',
        passReqToCallback:true//for adding 'req' arg to function
        },
        
        function(req,email,password,done){
            email='a'+email;
            //find a user and establish the identity
            Admin.findOne({identity:email},(err,user)=>{
                if(err){
                    console.log('Error in finding user ====>passport');
                    return done(err);
                }
                // console.log('------------------>');
                // console.log(user);
                // console.log('------------------->')
                if(!user||user.password!=password){
                    console.log("Invalid Useranme/Password");
                    return done(null,false);
                }
                //user successfully authenticated
                
                return done(null,user);
            })
        }
));

// serializing the to decide which key is to be kept in the cookies
passport.serializeUser((user,done)=>{
    done(null,user.identity);
})

    //deserializing the user from the key in the cookies
passport.deserializeUser((id,done)=>{

    if(id[0]==='s'){
        Student.findOne({identity:id},(err,student)=>{

            if(err){
                console.log('Error in finding user ====>passport');
                return done(err);
            }
            return done(null,student);
        })
    }else{
        Admin.findOne({identity:id},(err,user)=>{

            if(err){
                console.log('Error in finding user ====>passport');
                return done(err);
            }
            return done(null,user);
        })
    }
})

passport.checkAuthentication=function(req,res,next){
   //if the user is signed in, then pass on the request to the next function controller's action
    if(req.isAuthenticated()){
        return next();
    }
    
    let flag=req.path;
    console.log(flag);
    //if the user is not signed in
    if(flag[1]==='s'){
        return res.redirect('/students/login');
    }else{
        return res.redirect('/admins/login');
    }
}

passport.setAuthenticatedUser=function(req,res,next){
    console.log(req.isAuthenticated());
    if(req.isAuthenticated()){
        //res.user contains the current signed in user from the session cookies andd we are just sending to the locals for the views
        // console.log(req.user);
        res.locals.user=req.user;
    }
    next();
}

module.exports=passport;