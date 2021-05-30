const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const subjectSchema=new Schema({
    orgCode:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    s_code:{
        type:String,
        required:true
    }, 
    s_name:{
        type:String,
        required:true
    }
});

const Subject=mongoose.model("subjects",subjectSchema);

module.exports=Subject;