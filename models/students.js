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
    college:{
        type:String,
        default:""
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    course:{
        type:String,
        default:"B.tech"
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
        default:false
    },
    mobile:{
        type:String,
        default:"+919876543210"
    },
    linkedin:{
        type:String,
        default:""
    },
    github:{
        type: String,
        default:""
    },
    facebook:{
        type: String,
        default: ""
    },
    identity:{
        type:String,
        unique:true,
        required:true
    }, 
    token : {
        type : String,
        default : ""
    },
    expired : {
        type : String,
        default : ""
    }
});

const Students=mongoose.model("students",studentSchema);

module.exports=Students;