import axios from 'axios';
const accountsApi = import.meta.env.VITE_ADMIN_API_ACCOUNTS;

export const getAllAccountInfo = async ()=>{

    try {
        const response = await axios.get(`${accountsApi}/getAllCenterAccount`);
        return response.data;
    } catch (error) {
        console.log(error)
    }
}