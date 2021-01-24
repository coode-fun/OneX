const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const adminSchema=new Schema({
    name:{
        type:String,
        default:""
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    phone:{
        type:String,
        default:""
    },
    department:{
        type:String,
        default:""
    },
    address:{
        type:String,
    },
    verified:{
        type:Boolean,
        default:true
    },
    password:{
        type:String,
        required:true
    },
    identity:{
        type:String,
        unique:true,
        
    }
});

const Admins=mongoose.model("admins",adminSchema);

module.exports=Admins;