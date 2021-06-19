const mongoose=require('mongoose');
const Schema=mongoose.Schema;
// const quesSchema=require('../Schema/question');


const questionSchema=new Schema({
    question:{
        type:String,
        // required:true
    },
    options:{
        type:Array
    },
    answer:{
        type:String
    }
});

const createdtestSchema=new Schema({
    orgCode:{
        type:String,
        required:true
    },
    admin:{
        type: Schema.Types.ObjectId,
        ref: 'admins' 
    },
    subject:{
        type: Schema.Types.ObjectId,
        ref: 'subjects' 
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
        default:"2"
    }
    ,
    questions:{
        type:[questionSchema]
    }
});

const Createdtest=mongoose.model("createdtests",createdtestSchema);

module.exports=Createdtest;