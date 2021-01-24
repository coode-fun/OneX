const passport=require('passport');

const LocalStrategy=require('passport-local').Strategy;
const Admin=require('../models/admins');

passport.use(new LocalStrategy({
    usernameField:'email'
    },
    function(email,password,done){
        //find a student and establish the identity
        Admin.findOne({email:email},(err,admin)=>{
            if(err){
                console.log('Error in finding user ====>passport');
                return done(err);
            }
            if(!admin||admin.password!=password){
                console.log("Invalid Useranme/Password");
                return done(null,false);
            }
            //user successfully authenticated
            console.log('------------------>');
            console.log(admin);
            console.log('------------------->')
            return done(null,admin);
        })
    }
    ));

    //serializing the to decide which key is to be kept in the cookies
passport.serializeUser((admin,done)=>{
    done(null,admin.id);
})


    //deserializing the user from the key in the cookies
passport.deserializeUser((id,done)=>{
    Admin.findById(id,(err,admin)=>{
        if(err){
            console.log('Error in finding user ====>passport');
            return done(err);
        }
        return done(null,admin);
    })
})

// passport.checkAuthentication=function(req,res,next){
//    //if the user is signed in, then pass on the request to the next function controller's action
//     if(req.isAuthenticated()){
//         return next();
//     }

//     //if the user is not signed in
//     return res.redirect('/students/login');
// }

// passport.setAuthenticatedUser=function(req,res,next){
//     console.log(req.isAuthenticated());
//     if(req.isAuthenticated()){
//         //res.user contains the current signed in user from the session cookies andd we are just sending to the locals for the views
//         console.log(req.user);
//         res.locals.user=req.user;
//     }
//     next();
// }

module.exports=passport;