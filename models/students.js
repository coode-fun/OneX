const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const studentSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    enrollment:{
        type:String,
        required:true
    },
    department:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    verified:{
        type:Boolean,
        default:false
    },
    date:{
        type:Date,
        default:Date.now
    }
});

const Students=mongoose.model("students",studentSchema);

module.exports=Students;