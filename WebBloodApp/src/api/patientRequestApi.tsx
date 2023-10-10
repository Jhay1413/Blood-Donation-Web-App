import axios from 'axios'
const RequestApi = import.meta.env.VITE_API_REQUESTROUTES
export const addNewRequest = async (data:FormData)=>{
    try {
        const response = await axios.post(`${RequestApi}/addNewRequest`, data,{
            headers:{
                'Content-Type':'multipart/form-data'
                }
            });
        return response;
    } catch (error) {
        console.log(error)
    }

}
export const getRequestByPhysicianId = async (id:string)=>{
    try {
        const response = await axios.get(`${RequestApi}/getAllRequest/${id}`);
        return response
    } catch (error) {
        
    }
}