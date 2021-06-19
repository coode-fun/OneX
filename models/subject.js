const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const subjectSchema=new Schema({
    orgCode:{
        type:String,
        required:true
    },
    admin:{
        type: Schema.Types.ObjectId,
        ref: 'admins' 
    },
    s_code:{
        type:String,
        required:true
    }, 
    s_name:{
        type:String,
        required:true
    }
});

// subjectSchema.index({orgCode : 1, s_code :1},{unique: true})
const Subject=mongoose.model("subjects",subjectSchema);

module.exports=Subject;