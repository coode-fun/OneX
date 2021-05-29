const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const enrolledSchema=new Schema({
    orgCode:{
        type:String,
        required:true
    },
    s_email:{
        type:String,
        required:true
    },
    s_code:{
        type:String,
        required:true
    },
    t_code:{
        type:String,
        required:true
    },
    a_email:{
        type:String,
        required:true
    },
    marks:{
        type:Number,
        default:0
    }
});

const EnrolledStudents=mongoose.model("enrolledStudents",enrolledSchema);

module.exports=EnrolledStudents;