const router = require('express').Router();
const Physician = require('../../Model/Physician');
const physicianAccountModel = require('../../Model/PhysicianAccount');
router.get('/getAllPhysician',async (req,res)=>{
    try {
        const response = await Physician.find({});

        if(response){
            res.status(200).json(response)
        }
    } catch (error) {
        console.log(error);
    }
})

router.post('/addNewPhysician',async (req,res)=>{
    try {
        const {   
            firstName,
            lastName,
            contactNumber,
            sex,
            assignedAt
        } = req.body

        const response = await Physician.create({
            firstName,
            lastName,
            contactNumber,
            sex,
            assignedAt
        })
        if(response){
            res.status(200).json(response)
        }
    } catch (error) {
        console.log(error)
    }   
})
router.put('/editPhysicianInfo/:id',async(req,res)=>{
    try {
        const id = req.params.id ;
        const {   
            firstName,
            lastName,
            contactNumber,
            sex,
            assignedAt
        } = req.body

            const updateResult = await Patient.findByIdAndUpdate({_id:id},{
                firstName,
                lastName,
                contactNumber,
                sex,
                assignedAt
            },{new:true});
            if(updateResult){
                res.status(201).json({message:"Update success ! "})
            }
    } catch (error) {
        console.log(error)
    }
})
router.delete('/deletePhysicianInfo/:id',async(req,res)=>{
    try {
        const id = req.params.id;
      
        const deletePhysician = await Physician.findByIdAndDelete(id)
        if(deletePhysician){
            res.status(201).json(deletePhysician)
        }
    } catch (error) {
        console.log(error);
    }
})
router.get('/getAllPhysicianAccount', async (req,res)=>{
    try {
        const accounts = await physicianAccountModel.find({});
        res.status(201).json(accounts);
    } catch (error) {
        console.log(error);
    }
})
module.exports = router
