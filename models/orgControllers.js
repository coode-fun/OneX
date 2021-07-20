const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orgControllersSchema = new Schema({
    orgCode:{
        type:String,
        required:true
    },
    collage_name:{
        type:String
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    name:{
        type:String,
        default:""
    },
    phone:{
        type:String,
        default:""
    },
    address:{
        type:String,
    },
    password:{
        type:String,
        required:true
    },
    identity:{
        type:String,
        unique:true,
    },
    token : {
        type : String,
        default : ""
    },
    expired : {
        type : String,
        default : ""
    }
});

const orgControllers = mongoose.model("orgcontrollers", orgControllersSchema);

module.exports = orgControllers;