const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const questionSchema=new Schema({
    email:{
        type:String,
        required:true
    },
    orgCode:{
        type:String,
        requires:true,
    },
    s_code:{
        type:String,
        required:true
    },
    t_code:{
        type:String,
        required:true
    },
    question:{
        type:String,
        required:true
    },
    option1:{
        type:String,
        required:true
    },
    option2:{
        type:String,
        required:true
    },
    option3:{
        type:String,
        required:true
    },
    option4:{
        type:String,
        required:true
    },
    answer:{
        type:String,
        required:true
    },
    explation:{
        type:String,
        default:""
    }
});

const Questions=mongoose.model("questions",questionSchema);

module.exports=Question;