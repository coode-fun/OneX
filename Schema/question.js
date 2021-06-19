const mongoose=require('mongoose');
const Schema=mongoose.Schema;

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

// const Question=mongoose.model("questions",questionSchema);

module.exports=questionSchema;