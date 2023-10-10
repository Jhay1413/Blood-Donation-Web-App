const router = require('express').Router();
const Patient = require('../Model/Patient');
const { createPatientAccount } = require('../helper/patientAccountHelper');


router.post('/insertPatientInfo',async(req,res)=>{
    const {
        firstName,
        lastName,
        sex,
        age,
        contactNumber,
        address,
        email,
        password,
        userRoles
    } = req.body.values
    try {  
       
        const newPatient = await Patient.create({
            firstName,
            lastName,
            sex,
            age,
            contactNumber,
            address
        })
        if(newPatient){
            const accountResponse = await createPatientAccount(email,password ,userRoles,newPatient._id)
            if(accountResponse){
                res.status(201).json({message:'User Created Successfully'});
            }
            else{
                res.json("burnoks")
            }
        }
       
    } catch (error) {
        console.log(error)
    }

})
router.get('/getAllPatient',async (req,res) =>{
    try {
        const patientData = await Patient.find({})
        res.json(patientData);
    } catch (error) {
        
    }
})
module.exports = router