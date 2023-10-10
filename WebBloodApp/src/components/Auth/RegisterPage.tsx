import { useState } from "react";
import { registerUser } from "../../api/AuthApi";

interface UserInfo {

    email:string,
    password:string
}

const RegistrationPage = () => {
    const [userInfo,setUserInfo] = useState<UserInfo>({
        email:'',
        password:''
    })

    const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        const { name, value } = e.target;

        setUserInfo(prev=>({
            ...prev,
            [name]:value
        }))
    }
    const submitForm = async () =>{
        console.log(userInfo)
        const response = await registerUser(userInfo);
        console.log(response);
    }
    return ( 
        <>
            <div className="h-screen w-full items-center justify-center flex bg-gray-100 ">
                <div className="w-2/4 mx-auto grid grid-rows-2 flex bg-white w-full p-10 rounded-lg">
                    <div className="flex items-center justify-center w-full">
                        <h1 className="text-4xl">Registration Page</h1>
                    </div>
                    <div className="w-2/4 mx-auto flex flex-col items-center justify-center space-y-4">
                        <input className="w-full p-2 border-2 rounded-lg" name="email" type="text" placeholder="Username" onChange={handleOnchange} />
                        <input className="w-full p-2 border-2 rounded-lg" name="password" type="password" placeholder="Password"  onChange={handleOnchange}/>
                        <button className="w-full p-2 border-2 rounded-lg bg-green-500 text-white" onClick={submitForm} >Register</button>
                    </div>
                </div>
            </div>
        </>
     );
}
 
export default RegistrationPage;