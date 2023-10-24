const router = require('express').Router();
const HealthCenter = require('../../Model/HealthCenter')


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
module.exports = router