const router = require('express').Router();
const HealthCenter = require('../../Model/HealthCenter');
const { createCenterAccount } = require('../../helper/centerAccountHelper');
const healthCenterAccount = require('../../Model/HealthCenterAccount');
const DonorModel = require('../../Model/DonorModel');
const { createDonorAccount } = require('../../helper/donorAccountHelper');
const BloodLettingActivityModel = require('../../Model/ActivityModel');

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
//endpoint for activities

router.post('/addNewActivity',async(req,res)=>{

    const {
        activity,
        location,
        time,
        date,
        status,
    } = req.body
    try {
        const newActivity = await BloodLettingActivityModel.create({
            activity,
            location,
            time,
            date,
            status,
        })

        if(newActivity){
           res.status(201).json(newActivity)
        }
    } catch (error) {
        console.log(error);
    }
})
router.get('/getActivities',async(req,res)=>{
    try {
        const activities = await BloodLettingActivityModel.find({});
        if(activities){
            res.status(200).json(activities);
        }
    } catch (error) {
        console.log(error)
    }
})

//endpoint for donors 

router.get('/getDonors',async(req,res)=>{
    try {
        const getDonors = await DonorModel.find({});
        if(getDonors){
            res.status(200).json(getDonors);
        }
    } catch (error) {
        console.log(error)
    }
})
router.post('/addNewDonor',async(req,res)=>{
    const {
        firstName,
        lastName,
        sex,
        age,
        contactNumber,
        address,
        bloodType,
        DOB,
        email,
        password,
    } = req.body
    try {
        const newDonor = await DonorModel.create({
            firstName,
            lastName,
            sex,
            age,
            contactNumber,
            address,
            bloodType,
            DOB
        })

        if(newDonor){
            const accountResponse = await createDonorAccount(email,password,newDonor._id)
            if(accountResponse){
                res.status(201).json(newDonor);
            }
            else{
                res.json("burnoks")
            }
        }
    } catch (error) {
        console.log(error);
    }
})

module.exports = router