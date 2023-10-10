import axios from 'axios'
const PatientApi = import.meta.env.VITE_API_PATIENTROUTES
export const insertPatientInfo = async(data:any)=>{
    try {
        const response = await axios.post(`${PatientApi}/insertPatientInfo`,data);
        return response
    } catch (error) {
        console.log('Error on insertPatient Api !')
    }
}
export const getAllPatientInfo = async()=>{
    try {
        const response = await axios.get(`${PatientApi}/getAllPatient`);
        return response
    } catch (error) {
        
    }
}