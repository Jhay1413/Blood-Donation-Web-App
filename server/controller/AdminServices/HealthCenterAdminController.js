const router = require('express').Router();
const HealthCenter = require('../../Model/HealthCenter');
const { createCenterAccount } = require('../../helper/centerAccountHelper');
const healthCenterAccount = require('../../Model/HealthCenterAccount')

router.post('/addNewCenter',async(req,res)=>{
    try {
        const newCenter = await HealthCenter.create(req.body);
        if(newCenter){
            res.status(201).json(newCenter)
        }
    } catch (error) {
        console.log(error);
    }

})
router.get('/getAllCenter',async(req,res)=>{
    try {
        const getCenters = await HealthCenter.find({});
        if(getCenters){
            res.status(200).json(getCenters);
        }
    } catch (error) {
        console.log(error)
    }
})

router.post('/registerUser',async(req,res)=>{
    try {
        const {email,password,userRoles,userId} = req.body;

        const newAccount = await createCenterAccount(email,password,userRoles,userId);

        if(newAccount){
            res.status(201).json(newAccount)
        }

    } catch (error) {
        console.log(error);
    }
})
router.get('/getAllCenterAccount',async (req,res)=>{
    try {
        const accounts = await healthCenterAccount.find({}).populate('userId')
        res.status(201).json(accounts)
    } catch (error) {
        console.log(error);
    }
})
module.exports = router