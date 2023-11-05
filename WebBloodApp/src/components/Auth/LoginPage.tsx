import { useEffect, useState } from 'react';
import { useAuth } from '../AuthContenxt/AuthContext';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../api/AuthApi';
import jwtDecode from 'jwt-decode';
import loginSideImg from '../../assets/side-image.jpg'

interface LoginFormProps{
}
export interface Credentials {
    email:string,
    password:string
}
interface JWTPayload {
    userId: string,
    userRoles: string,
    iat: string
    exp:number
}

 const LoginPage = () => {
    const [credential, setCredential] = useState<Credentials>({
        email: '',
        password: ''
    });
    const [roles,setRoles] = useState<string>("");
    const {authContext,loadingContext} = useAuth() 
    const navigate = useNavigate();
    
    useEffect(()=>{
        if(authContext?.userRoles == 'Doctor'){
            navigate('/doc')
        }
        else if(authContext?.userRoles == 'Admin'){
            navigate('/admin')
        }
        else if(authContext?.userRoles == 'BloodCenter'){
            navigate('/center')
        }
    },[authContext])

    const submitLogin = async(e:any) => {
        e.preventDefault()
        try {
            if(roles === "Doctor"){
                const response = await loginUser({...credential,roles});
                if(response){
                    localStorage.setItem('token',response.data.token);
                    loadingContext?.setIsLoading(!loadingContext.isLoading)
                    navigate('/doc')
                }
            }
            else if(roles === "HealthCenter"){
                const response = await loginUser({...credential,roles});
                if(response){
                    console.log(response.data)
                    localStorage.setItem('token',response.data.token);
                    loadingContext?.setIsLoading(!loadingContext.isLoading)
                    navigate('/center')
                }
            }
            else if(roles === "Admin"){
                const response = await loginUser({...credential,roles});
                if(response){
                    console.log(response.data)
                    localStorage.setItem('token',response.data.token);
                    loadingContext?.setIsLoading(!loadingContext.isLoading)
                    navigate('/admin')
                }
            }
    
        } catch (error) {
            console.log(error)
        }
      
    }
    
    const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCredential(prev => ({
            ...prev,
            [name]: value
        }));
    };
    const handleRolesChange = (e:React.ChangeEvent<HTMLSelectElement>)=>{
        setRoles(e.target.value)
    }
    return (

        <>
            <div className='min-h-screen w-full bg-gray-100 flex items-center justify-center'>
                <div className='w-3/4 grid grid-cols-2 shadow-lg'>
                    <div className='rounded-lg '>
                        <img src={loginSideImg} />
                    </div>
                    <div className='flex flex-col items-center justify-center space-y-4 bg-white w-full'>
                        <div className="flex flex-col items-center justify-center space-y-2">
                            <h1 className='text-2xl text-red-600 font-bold'>LOGIN ACCOUNT</h1>
                            <p className='text-sm text-gray-500'>Secure Login to Your Account</p>
                        </div>
                        <div className='flex flex-col items-center justify-center space-y-4 w-3/4'>
                            <input type='text' name ="email"className='p-2 w-full rounded-md bg-gray-100' onChange={handleOnchange}  placeholder="Email" disabled = {roles === ""}/>
                            <input type='password' name ="password" className='p-2 w-full rounded-md bg-gray-100' onChange={handleOnchange} placeholder='Password' disabled = {roles === ""}/>

                        </div>
                        <div className='flex justify-start w-3/4'>
                        <select className='text-gray-700 p-1 rounded-md bg-gray-100' name="roles" onChange={handleRolesChange}>
                                <option value="">Select Roles</option>
                                <option value="Admin">Admin</option>
                                <option value="HealthCenter">Blood Center</option>
                                <option value="Doctor">Doctor</option>
                            </select>
                        </div>
                        <div className='w-3/4'>
                            <button className="w-full p-2 border-2 rounded-lg bg-green-500 text-white" onClick={submitLogin}>Login</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default LoginPage