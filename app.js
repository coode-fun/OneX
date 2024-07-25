var express=require('express');
var mongoose=require('mongoose');
var path=require('path');
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategies');
const mongoStore=require('connect-mongo')(session);
const cors =require('cors');

var app=express();
var url="mongodb+srv://Onex001:Onex001@cluster0.omhflae.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(url,
    { 
        useNewUrlParser: true, 
        useUnifiedTopology: true
    },
    
    (err)=>{
 
    if(err){
            console.log("Connection failed!!", err);
        }
    else
        console.log("Connection Established!!");
})

//static files

app.use(cors());
app.use(express.json()); 
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
    cookie: { secure: false },
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
    console.log(req.isAuthenticated(),"inside home");
    if(req.isAuthenticated()){
        let flag=req.user.identity; 
         //if the user is not signed in
        if(flag[0]==='s'){
            return res.redirect('/students/sprofile');
        }
        else  if(flag[0]==='a'){
            return res.redirect('/admins/profile');
        }else{
            return res.redirect('/orgControllers/addAdmin');
        }
    }
    res.render("home/home.ejs");
})

app.use('/students',require('./routes/students'));
app.use('/users',require('./routes/users'));
app.use('/admins', require('./routes/admins'));
app.use('/tests',require('./routes/tests'));
app.use('/questions',require('./routes/questions'));
app.use('/orgControllers',require('./routes/orgController'));

app.get('*',(req,res)=>{
    return res.render('home/error',{message:"Under construction!!"});
})

var port=process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 5000;

app.listen(port,()=>{
    console.log(`Serving is running at ${port}`);
});