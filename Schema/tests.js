const mongoose=require('mongoose');
const Schema=mongoose.Schema;

var testSchema=new Schema({
    s_code:{
        type:String,
        required:true
    },
    t_code:{
        type:String,
        required:true
    },
    enrolled:{
        type:Boolean,
        default:false
    },
    marks:{
        type:Number,
        default:0
    },
    answers:{
        type:Array
    },
    date:{
        type:Date,
        default:Date.now
    }
});

module.exports=testSchema;