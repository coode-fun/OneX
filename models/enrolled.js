const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const enrolledSchema=new Schema({
    
    orgCode:{
        type:String,
        required:true
    },
    student:{
        type: Schema.Types.ObjectId,
        ref: 'students' 
    },
    subject:{
        type: Schema.Types.ObjectId,
        ref: 'subjects' 
    },
    test:{
        type: Schema.Types.ObjectId,
        ref: 'createdtests' 
    },
    admin:{
        type: Schema.Types.ObjectId,
        ref: 'admins' 
    },
    marks:{
        type:Number,
        default:0
    }
});


// enrolledSchema.index({orgCode:1,student:1,subject:1,test:1,admin:1},{ unique: true});
const EnrolledStudents=mongoose.model("enrolledStudents",enrolledSchema);

module.exports=EnrolledStudents;