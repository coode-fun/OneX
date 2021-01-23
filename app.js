var express=require('express');
var path=require('path');


var app=express();


//static files
app.use(express.static('asserts'));
//body-parser
app.use(express.urlencoded({ extended: true }));
//setting up ejs
app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'./views'));

app.get('/',(req,res)=>{
    res.render("home/home.ejs");
})
app.use('/students',require('./routes/students'));


var port=process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;

app.listen(port,()=>{
    console.log(`Serving is running at ${port}`);
});