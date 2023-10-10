const router = require('express').Router();
const multer = require('multer')
const PatientRequestModel = require('../Model/PatientRequest')
const aws = require('aws-sdk');
const { S3 } = require("@aws-sdk/client-s3");
const storage = multer.memoryStorage();
const upload = multer({storage});
const { PutObjectCommand } = require("@aws-sdk/client-s3");


const s3Client = new S3({
    forcePathStyle: false, // Configures to use subdomain/virtual calling format.
    endpoint: "https://sgp1.digitaloceanspaces.com",
    region: "SGP1",
    credentials: {
      accessKeyId: process.env.BUCKET_ACCESS_KEY,
      secretAccessKey: process.env.BUCKET_PRIVATE_KEY
    }
});


router.post('/addNewRequest',upload.single('file'),async (req,res)=>{
    const file =  req.file
    const {patientId,bloodType,quantity,physicianId} = req.body
    try {
      if(!file){
        return res.status (400).send('No file uploaded.')
      }
      const params = {
        Bucket:'blood-donation-bucket',
        Key:file.originalname,
        Body:file.buffer,
        ACL:'public-read'
      }
      const data = await s3Client.send(new PutObjectCommand(params));
      
      if(data.$metadata.httpStatusCode === 200) {
            const newRequest = await PatientRequestModel.create({

                bloodType:bloodType,
                bloodQuantity:quantity,
                fileKey : file.originalname,
                bucket: 'blood-donation-bucket',
                physician:physicianId,
                patient:patientId
            })
            if (newRequest){
                res.status(201).json({message:'Request Created'});
            }
            else{
                res.status(400).send('Saving the Request Information failed !')
            }
      }
      else{
        res.status(400).send('Saving the file Failed !')
      }
    } catch (error) {
        console.log(error)
    }
})
router.get('/getAllRequest/:id',async (req,res)=>{
  try {
    const allRequestData = await PatientRequestModel.find({physician : req.params.id}).populate('patient').populate('physician')
    res.status(200).json(allRequestData)
  } catch (error) {
    console.log(error)
  }

})
module.exports = router