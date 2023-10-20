import axios from 'axios'

const AuthApi = import.meta.env.VITE_API_AUTHROUTES

interface UserInfo {

    email:string,
    password:string
}

export const registerUser = async (data:UserInfo)=>{
    try {
        const response = await axios.post(`${AuthApi}/register`,data);
        return response
    } catch (error) {
        console.log("Error on Registration API")
    }
}
export const loginUser = async(data:any)=>{
    try {
        const response = await axios.post(`${AuthApi}/login`,data);
        return response
    } catch (error) {
        console.log('Error on Login Api !')
    }
}