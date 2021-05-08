const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const createdtestSchema=new Schema({
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
    enrolled:{
        type:Boolean,
        default:false
    },
    length:{
        type:String,
        default:""
    },
    questions:{
        type:Array
    }
});

const CreatedTest=mongoose.model("createdtest",createdtestSchema);

module.exports=CreatedTest;