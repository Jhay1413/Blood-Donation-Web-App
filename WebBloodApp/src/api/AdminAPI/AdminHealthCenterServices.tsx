import axios from 'axios'
import { HealthCenterInfo, PreHealthCenterInfo,preHealthCenterAccount } from '../../components/Interface/Interface';
const centersApi = import.meta.env.VITE_ADMIN_API_HEALTHCENTERROUTES



export const getAllCenterInfo = async()=>{
    try {
        const response = await axios.get(`${centersApi}/getAllCenter`);
        return response.data
    } catch (error) {
        return error
    }
}
export const addNewCenterInfo = async(data:PreHealthCenterInfo)=>{
    try {
        const response = await axios.post(`${centersApi}/addNewCenter`,data)
        return response.data
    } catch (error) {
        return error
    }
}

export const addNewAccount = async(data:preHealthCenterAccount)=>{
    try {
        const response = await axios.post(`${centersApi}/registerUser`,data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}
export const getAllCenterAccount = async() =>{
    try {
        const response = await axios.get(`${centersApi}/getAllCenterAccount`);
        return response.data;
    } catch (error) {
        
    }
}