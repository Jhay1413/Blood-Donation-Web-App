require('dotenv').config()
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
const fileRoutes = require('./routes/fileRoutes')
const authRoutes = require('./controller/Auth')
const patientRoutes = require('./controller/patientController')
const patientRequestRoutes = require('./controller/patientRequestController')
const physicianRoutes = require('./controller/physician')
const patientAdminRoutes = require('./controller/AdminServices/PatientAdminController')
const patientRequestAdminRoutes = require('./controller/AdminServices/PatientRequestController')
const physicianAdminRoutes = require('./controller/AdminServices/PhysicianAdminController')
const app = express();


app.use(express.json())
app.use(cors())

const PORT = 3001

const connectDB = async()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`Mongo connectd: ${conn.connection.host}`)
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

app.use('/api/fileRoute',fileRoutes);
app.use('/api/authRoutes',authRoutes);
app.use('/api/patientRoutes',patientRoutes);
app.use('/api/patientRequestRoutes',patientRequestRoutes)
app.use('/api/physicianRoutes',physicianRoutes)

//ADMIN ROUTES
app.use('/admin/api/patientRoutes',patientAdminRoutes);
app.use('/admin/api/patientRequestRoutes',patientRequestAdminRoutes);
app.use('/admin/api/physicianRoutes',physicianAdminRoutes);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("listening for requests");
    })
})