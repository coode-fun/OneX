const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const userSchema=new Schema({
    email:{
        type:String,
        unique:true,
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

const Users=mongoose.model("users",userSchema);

module.exports=Users;