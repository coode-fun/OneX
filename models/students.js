const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const studentSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    orgCode:{
        type:String,
        default:"Self"
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    course:{
        type:String,
        default:"IT"
    },
    enrollment:{
        type:String,
        required:true
    },
    department:{
        type:String,
        required:true
    },
    year:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    verified:{
        type:Boolean,
        default:true
    },
    identity:{
        type:String,
        unique:true,
        required:true
    }
});

const Students=mongoose.model("students",studentSchema);

module.exports=Students;