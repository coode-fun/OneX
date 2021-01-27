const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const marksSchema=new Schema({
    test:{
        type:String,
        required:true
    },
    marks:{
        type:Number,
        required:true
    },
    remark:{
        type:String
    }
});

const Marks=mongoose.model("students",marksSchema);

module.exports=Marks;