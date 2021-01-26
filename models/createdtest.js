const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const createdtestSchema=new Schema({
    email:{
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
    department:{
        type:String,
        required:true
    },
    year:{
        type:String,
        required:true
    },
    start:{
        type:String,
        required:true
    },
    end:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    length:{
        type:String,
        default:""
    }
});

const CreatedTest=mongoose.model("createdtest",createdtestSchema);

module.exports=CreatedTest;