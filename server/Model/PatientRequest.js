const mongoose = require('mongoose')


const PatientRequestSchema = new mongoose.Schema({
    bloodType:{type:String,required:true},
    bloodQuantity:{type:String,require:true},
    fileKey : {type:String,required:true},
    bucket : {type:String,required:true},
    physician:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'Physician'
    },
    patient:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'Patients'
    }
})
const PatientRequestModel = mongoose.model('PatientRequest',PatientRequestSchema,'PatientRequest')
module.exports = PatientRequestModel