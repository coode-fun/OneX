const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const answerSchema=new Schema({
    questionOption:{
        type:Map,
        of: Number,
        default: () => ({})
    },
    isAttempted:{
        type:Map,
        of:Boolean,
        default: () => ({})
    },
    explanation:{
        type :Map,
        of :String,
        default: () => ({})
    }
});

const enrolledSchema=new Schema({
    
    orgCode:{
        type:String,
        required:true
    },
    student:{
        type: Schema.Types.ObjectId,
        ref: 'students',
        required:true
    },
    subject:{
        type: Schema.Types.ObjectId,
        ref: 'subjects' ,
        required:true
    },
    test:{
        type: Schema.Types.ObjectId,
        ref: 'createdtests' ,
        required:true
    },
    admin:{
        type: Schema.Types.ObjectId,
        ref: 'admins' ,
        required:true
    },
    result:{
        marks:{
            type :Number,
            default :0
        },
        totalQuestion :{
            type : Number,
            default : 0
        },
        correct:{
            type : Number,
            default : 0
        },
        remark:{
            type : String,
            default : "All the best for your future!!"
        }
    },
    answer:{
        type:answerSchema,
        default: () => ({})
    },
    counter:{
        type:Number,
        default:0
    },
    isAttempted : {
        type :Boolean,
        default :false
    }
});
enrolledSchema.plugin(uniqueValidator, {
    type: 'mongoose-unique-validator',
    message: 'Error, expected {PATH} to be unique.'
});

// enrolledSchema.index({orgCode:1,student:1,subject:1,test:1,admin:1},{ unique: true});
const EnrolledStudents=mongoose.model("enrolledStudents",enrolledSchema);

module.exports=EnrolledStudents;