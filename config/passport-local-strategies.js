const passport=require('passport');

const LocalStrategy=require('passport-local').Strategy;
const Student=require('../models/students');

passport.use(new LocalStrategy({
    usernameField:'email'
    },
    function(email,password,done){
        //find a student and establish the identity
        Student.findOne({email:email},(err,student)=>{
            if(err){
                console.log('Error in finding user ====>passport');
                return done(err);
            }
            if(!student||student.password!=password){
                console.log("Invalid Useranme/Password");
                return done(null,false);
            }

            //user successfully authenticated
            console.log('------------------>');
            console.log(student);
            console.log('------------------->')
            return done(null,student);
        })
    }
    ));

//serializing the to decide which key is to be kept in the cookies
passport.serializeUser((student,done)=>{
    done(null,student.id);
})


    //deserializing the user from the key in the cookies
passport.deserializeUser((id,done)=>{
    Student.findById(id,(err,student)=>{

        if(err){
            console.log('Error in finding user ====>passport');
            return done(err);
        }
        return done(null,student);
    })
})

passport.checkAuthentication=function(req,res,next){
   //if the user is signed in, then pass on the request to the next function controller's action
    if(req.isAuthenticated()){
        return next();
    }

    //if the user is not signed in
    return res.redirect('/students/login');
}

passport.setAuthenticatedUser=function(req,res,next){
    console.log(req.isAuthenticated());
    if(req.isAuthenticated()){
        //res.user contains the current signed in user from the session cookies andd we are just sending to the locals for the views
        console.log(req.user);
        res.locals.user=req.user;
    }
    next();
}

module.exports=passport;