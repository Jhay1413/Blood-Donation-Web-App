import { useEffect, useState } from 'react';
import { useAuth } from '../AuthContenxt/AuthContext';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../api/AuthApi';
import jwtDecode from 'jwt-decode';

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
    const {authContext,loadingContext} = useAuth() 
    const navigate = useNavigate();
    
    useEffect(()=>{
        if(authContext?.userRoles == 'Doctor'){
            navigate('/doc')
        }
    },[authContext])

    const submitLogin = async(e:any) => {
        e.preventDefault()
        try {
            const response = await loginUser(credential);
            if(response){
                localStorage.setItem('token',response.data.token);

                loadingContext?.setIsLoading(!loadingContext.isLoading)
                const tokenDecoded:JWTPayload = await jwtDecode(response?.data.token)
                if(tokenDecoded.userRoles == "Doctor"){
                    navigate('/doc')
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
    return (

        <>
            <div className="h-screen w-full items-center justify-center flex bg-gray-100 ">
                <div className="w-2/4 mx-auto grid grid-rows-2 flex bg-white w-full p-10 rounded-lg">
                    <div className="flex items-center justify-center w-full">
                        <h1 className="text-4xl">Login Page</h1>
                    </div>
                    <div className="w-2/4 mx-auto flex flex-col items-center justify-center space-y-4">
                        <input className="w-full p-2 border-2 rounded-lg" name="email" type="text" placeholder="Username" onChange={handleOnchange} />
                        <input className="w-full p-2 border-2 rounded-lg" name="password" type="password" placeholder="Password" onChange={handleOnchange} />
                        <button className="w-full p-2 border-2 rounded-lg bg-green-500 text-white" onClick={submitLogin}>Login</button>
                    </div>
                </div>
            </div>
        </>
    );
};
export default LoginPage