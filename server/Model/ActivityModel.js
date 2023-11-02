const mongoose  = require('mongoose');

const BloodLettingActivitySchema = new mongoose.Schema({
    activity : {type:String,require:true},
    location:{type:String,require:true},
    time:{type:String,require:true},
    date:{type:String,require:true},
    status:{type:String,require:true},
   
});
const BloodLettingActivityModel = mongoose.model('Activity',BloodLettingActivitySchema,'Activity')
module.exports = BloodLettingActivityModel;