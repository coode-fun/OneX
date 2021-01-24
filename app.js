var express=require('express');
var mongoose=require('mongoose');
var path=require('path');
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategies');
const mongoStore=require('connect-mongo')(session);

var app=express();
var url="mongodb+srv://OneX_2021:OneX_2021@onex.ulmfc.mongodb.net/onex?retryWrites=true&w=majority";

mongoose.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true  },(err)=>{
    if(err){
            console.log("Connection failed!!");
        }
    else
        console.log("Connection Established!!");
})

//static files
app.use(express.static('asserts'));
//body-parser
app.use(express.urlencoded({ extended: true }));
//setting up ejs
app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'./views'));

//mongo store is used to store the session in cookie
app.use(session({
    name:'user_id',
    //TODO cahne the secret before deployment in production mode
    secret:'asdfg',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store:new mongoStore({
        mongooseConnection:mongoose.connection,
        autoRemove:'disabled'
    },
    function(err){console.log(err || 'connect-mongodb setup is ok')}
    )
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.get('/',(req,res)=>{
    res.render("home/home.ejs");
})
app.use('/students',require('./routes/students'));


var port=process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 5000;

app.listen(port,()=>{
    console.log(`Serving is running at ${port}`);
});